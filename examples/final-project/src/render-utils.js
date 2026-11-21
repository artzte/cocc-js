// Template helpers shared by the renderers.

export function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

// replaces each {{tag}} in the template with the escaped variable of the same name
export function render(template, variables) {
  const regex = /{{(\w+)}}/g
  return template.replace(regex, (_, tag) => {
    return escapeHtml(variables[tag] ?? 'unknown')
  })
}
