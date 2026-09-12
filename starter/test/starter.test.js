import { describe, it, expect, beforeEach } from 'vitest'
import { readFileSync } from 'node:fs'
import { renderApp } from '../src/app.js'

describe('starter kit sanity check', () => {
  beforeEach(() => {
    console.log('invoking renderApp()')
    renderApp()
  })

  it('can query by selector', () => {
    expect(document.querySelector('#app')).not.toBeNull()
  })

  it('renders starter message with renderApp()', () => {
    const app = document.querySelector('#app')
    expect(app.textContent).toBe('Hello, JavaScript!')
  })

  it('links the minimalist stylesheet in index.html', () => {
    const html = readFileSync('index.html', 'utf8')
    expect(html).toMatch(
      /<link\s+rel=["']stylesheet["']\s+href=["']\/src\/common\/style\.css["']/,
    )
  })
})
