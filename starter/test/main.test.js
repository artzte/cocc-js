import { describe, it, expect, beforeEach } from 'vitest'

describe('starter kit sanity check', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
  })

  it('can read and write DOM text', () => {
    const app = document.querySelector('#app')
    app.textContent = 'Hello'
    expect(app.textContent).toBe('Hello')
  })

  it('can query by selector', () => {
    expect(document.querySelector('#app')).not.toBeNull()
  })
})
