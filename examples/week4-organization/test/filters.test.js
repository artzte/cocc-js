import { CourseFilter } from '../src/filter-class.js'
import { getFilteredCourses } from '../src/filter-classic-module.js'
import { filterBuilder } from '../src/filter-functional-closure.js'

import COURSE_DATA from '../src/data.js'
import { describe, it, expect, beforeEach } from 'vitest'

const [introToProgramming, introToJavascript, webAuthoring] = COURSE_DATA

const examples = [
  {
    queries: ['4', 'cis', 'CIS'],
    matches: [introToProgramming, introToJavascript, webAuthoring],
  },
  {
    queries: ['intro', 'intro to'],
    matches: [introToProgramming, introToJavascript],
  },
  { queries: ['web', 'html', 'css'], matches: [webAuthoring] },
  { queries: ['cis122', 'cis 122'], matches: [introToProgramming] },
]

describe('filters', () => {
  describe('filter-class.js', () => {
    it('performs expected filtering', () => {
      const filterClass = new CourseFilter()

      examples.forEach(({ queries, matches }) => {
        queries.forEach((query) => {
          expect(
            filterClass.getFilteredCourses(query),
            `matches for ${query}`,
          ).toEqual(matches)
        })
      })
    })
  })

  describe('filter-classic-module.js', () => {
    it('performs expected filtering', () => {
      examples.forEach(({ queries, matches }) => {
        queries.forEach((query) => {
          expect(getFilteredCourses(query), `matches for ${query}`).toEqual(
            matches,
          )
        })
      })
    })
  })

  describe('filter-functional-closure.js', () => {
    let filterApi

    beforeEach(() => {
      filterApi = filterBuilder()
    })
    it('performs expected filtering', () => {
      examples.forEach(({ queries, matches }) => {
        queries.forEach((query) => {
          expect(
            filterApi.getFilteredCourses(query),
            `matches for ${query}`,
          ).toEqual(matches)
        })
      })
    })
  })
})
