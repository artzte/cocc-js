import { describe, it, expect } from 'vitest'
import { render, escapeHtml } from '../src/render-utils'

describe('render', () => {
  it('replaces each {{tag}} with the matching variable', () => {
    const html = render('<p>{{title}} by {{maker}}</p>', {
      title: 'Teapot',
      maker: 'Wedgwood',
    })

    expect(html).toBe('<p>Teapot by Wedgwood</p>')
  })

  it("inserts 'unknown' for tags with no matching variable", () => {
    expect(render('<p>{{missing}}</p>', {})).toBe('<p>unknown</p>')
  })

  it('keeps falsy-but-present values such as 0 and empty string', () => {
    expect(render('{{count}}', { count: 0 }), 'zero').toBe('0')
    expect(render('[{{text}}]', { text: '' }), 'empty string').toBe('[]')
  })

  it('escapes HTML special characters in values', () => {
    const html = render('<p>{{title}}</p>', { title: '<b>"Tea" & \'pot\'</b>' })

    expect(html).toBe(
      '<p>&lt;b&gt;&quot;Tea&quot; &amp; &#39;pot&#39;&lt;/b&gt;</p>',
    )
  })
})

describe('escapeHtml', () => {
  it('converts non-string values to strings', () => {
    expect(escapeHtml(42)).toBe('42')
  })
})
