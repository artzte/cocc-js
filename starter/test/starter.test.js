import { describe, it, expect } from 'vitest'
import { renderApp } from '../src/app.js'

describe('starter kit sanity check', () => {
  it('can read and write DOM text', () => {
    const app = document.querySelector('#app')
    app.textContent = 'Hello'
    expect(app.textContent).toBe('Hello')
  })

  it('can query by selector', () => {
    expect(document.querySelector('#app')).not.toBeNull()
  })
})
