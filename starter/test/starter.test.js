import { describe, it, expect } from 'vitest'
import { renderApp } from '../src/app.js'

describe('starter kit sanity check', () => {
  it('can query by selector', () => {
    expect(document.querySelector('#app')).not.toBeNull()
  })

  it('renders starter message with renderApp()', () => {
    renderApp()
    const app = document.querySelector('#app')
    expect(app.textContent).toBe('Hello, JavaScript!')
  })
})
