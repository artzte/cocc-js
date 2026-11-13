#!/usr/bin/env node
//
// Reads and validates the local student roster (infra/students.local.json by default)
// for the instructor scripts. The roster holds student names and repos, so it is
// git-ignored and never committed to this public repository.
//
// Usage:
//   node roster.mjs <roster.json> validate
//   node roster.mjs <roster.json> slugs
//   node roster.mjs <roster.json> get <slug> <field>
//   node roster.mjs <roster.json> render-index <template.html>
//
// Roster format (see infra/students.example.json):
//   [{ "slug": "jdoe", "repo": "jdoe-gh/jdoe-cocc-js", "title": "Weather Dashboard" }]

import { readFileSync } from 'node:fs'

const SLUG_PATTERN = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/
const REPO_PATTERN = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/
const PROJECTS_MARKER = '<!-- PROJECTS -->'

function fail(message) {
  process.stderr.write(`Error: ${message}\n`)
  process.exit(1)
}

function loadRoster(path) {
  let raw
  try {
    raw = readFileSync(path, 'utf8')
  } catch {
    fail(
      `Roster not found at '${path}'. Copy infra/students.example.json to infra/students.local.json and fill it in.`,
    )
  }

  let roster
  try {
    roster = JSON.parse(raw)
  } catch (error) {
    fail(`Roster '${path}' is not valid JSON: ${error.message}`)
  }

  if (!Array.isArray(roster)) {
    fail(`Roster '${path}' must be a JSON array of student entries.`)
  }

  const seen = new Set()
  // repo-level secrets are per repo, so two slugs sharing a repo would overwrite each other
  const seenRepos = new Map()
  roster.forEach((student, index) => {
    const where = `entry ${index} in '${path}'`
    if (!student || typeof student !== 'object') {
      fail(`${where} must be an object.`)
    }
    if (!SLUG_PATTERN.test(student.slug ?? '')) {
      fail(
        `${where} has an invalid slug '${student.slug}' (lowercase letters, digits, hyphens).`,
      )
    }
    if (student.slug.endsWith('-cocc-js')) {
      fail(
        `${where}: slug '${student.slug}' looks like a repo name; use the site slug only.`,
      )
    }
    if (seen.has(student.slug)) {
      fail(`${where} repeats slug '${student.slug}'.`)
    }
    seen.add(student.slug)
    if (!REPO_PATTERN.test(student.repo ?? '')) {
      fail(
        `${where} has an invalid repo '${student.repo}' (expected <owner>/<repo>).`,
      )
    }
    const repoKey = student.repo.toLowerCase()
    if (seenRepos.has(repoKey)) {
      fail(
        `${where}: repo '${student.repo}' is already used by slug '${seenRepos.get(repoKey)}'.`,
      )
    }
    seenRepos.set(repoKey, student.slug)
    if (typeof student.title !== 'string' || student.title.trim() === '') {
      fail(`${where} needs a non-empty project title.`)
    }
  })

  return [...roster].sort((a, b) => a.slug.localeCompare(b.slug))
}

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function renderIndex(roster, templatePath) {
  const template = readFileSync(templatePath, 'utf8')
  const markerLine = template
    .split('\n')
    .find((line) => line.includes(PROJECTS_MARKER))
  if (!markerLine) {
    fail(`Template '${templatePath}' has no ${PROJECTS_MARKER} marker.`)
  }

  // indent each entry to match the marker line
  const indent = markerLine.slice(0, markerLine.indexOf(PROJECTS_MARKER))
  const items = roster
    .map((student) =>
      [
        '<li>',
        `  <a class="project-link" href="/${student.slug}">`,
        `    <span class="project-title">${escapeHtml(student.title)}</span>`,
        `    <code class="project-slug">/${student.slug}</code>`,
        '  </a>',
        '</li>',
      ]
        .map((line) => indent + line)
        .join('\n'),
    )
    .join('\n')

  return template.replace(markerLine, items)
}

const [rosterPath, command, ...args] = process.argv.slice(2)
if (!rosterPath || !command) {
  fail(
    'Usage: roster.mjs <roster.json> <validate|slugs|get|render-index> [args]',
  )
}

const roster = loadRoster(rosterPath)

switch (command) {
  case 'validate':
    process.stdout.write(`Roster OK: ${roster.length} student(s).\n`)
    break
  case 'slugs':
    process.stdout.write(
      roster.map((student) => student.slug).join('\n') + '\n',
    )
    break
  case 'get': {
    const [slug, field] = args
    const student = roster.find((entry) => entry.slug === slug)
    if (!student) {
      fail(
        `Slug '${slug}' is not in the roster '${rosterPath}'. Add it there first.`,
      )
    }
    if (!(field in student)) {
      fail(`Roster entry '${slug}' has no field '${field}'.`)
    }
    process.stdout.write(String(student[field]))
    break
  }
  case 'render-index':
    if (!args[0]) {
      fail('render-index requires a template path.')
    }
    process.stdout.write(renderIndex(roster, args[0]))
    break
  default:
    fail(`Unknown command '${command}'.`)
}
