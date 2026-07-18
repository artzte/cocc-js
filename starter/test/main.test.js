import { describe, it, expect } from 'vitest'
import { renderApp } from '../src/app.js'

describe('week1 tests', () => {
  it('can see our changed title for the page', () => {
    renderApp()
    const app = document.querySelector('#app')
    expect(app.textContent).toBe('Hello, JavaScript. For week 1!')
  })
})
