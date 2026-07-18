import { beforeEach } from 'vitest'
import { readFileSync } from 'node:fs'

// Load the real page markup so tests see the same DOM the browser does.
// Note: the <script> tag is not executed — import your modules in the test.
const html = readFileSync('index.html', 'utf8')
const body = html.match(/<body>([\s\S]*)<\/body>/)[1]

beforeEach(() => {
  console.log('Setting up DOM to match our index.html file');
  document.body.innerHTML = body
})
