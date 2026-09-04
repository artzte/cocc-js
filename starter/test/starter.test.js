import { describe, it, expect, beforeEach } from 'vitest'
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
})
