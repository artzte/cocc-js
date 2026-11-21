export function buildUrl(_url, queryObj = {}) {
  const url = new URL(_url)

  if (queryObj) {
    Object.entries(queryObj).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }

  return url
}

export function buildHeaders(headerOptions = {}) {
  return new Headers({
    Accept: 'application/json',
    ...(headerOptions || {}),
  })
}

export async function fetchJson(_url, options = {}) {
  const url = buildUrl(_url, options.query)

  const headers = buildHeaders(options.headers)

  const response = await fetch(url, {
    headers,
    method: options.method || 'GET',
  })

  if (!response.ok) {
    const error = await buildError(response)
    throw error
  }

  return response.json()
}

export async function buildError(response) {
  const error = new Error(response.statusText)

  error.status = response.status

  try {
    error.body = await response.text()
    error.body = JSON.parse(error.body)
  } catch {
    // this would be if json parsing failed; there will just be the body text in that case
  }

  return error
}
