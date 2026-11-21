import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  buildUrl,
  buildHeaders,
  fetchJson,
  buildError,
} from '../src/wrapped-fetch'

const api = 'https://fake-api.com/get-something'

describe('wrapped fetch', () => {
  describe('utility functions', () => {
    it('buildUrl', () => {
      expect(buildUrl(api).toString()).toBe(api)
      expect(buildUrl(api, { a: 'aye', b: 'bee' }).toString()).toBe(
        `${api}?a=aye&b=bee`,
      )
    })

    it('buildHeaders', () => {
      expect(buildHeaders()).toEqual(
        new Headers({ Accept: 'application/json' }),
      )
      expect(buildHeaders({ Authorization: 'hi' })).toEqual(
        new Headers({ Accept: 'application/json', Authorization: 'hi' }),
      )
    })

    describe('buildError', () => {
      it('uses response.statusText as the error message', async () => {
        const response = new Response('', { status: 500, statusText: 'Oops' })

        const error = await buildError(response)

        expect(error, 'returns an Error').toBeInstanceOf(Error)
        expect(error.message, 'message is the statusText').toBe('Oops')
        expect(error.status, 'status is copied over').toBe(500)
      })

      it('attaches the parsed JSON body as error.body', async () => {
        const body = { detail: 'no such object' }
        const response = new Response(JSON.stringify(body), { status: 404 })

        const error = await buildError(response)

        expect(error.body, 'JSON body is parsed').toEqual(body)
      })

      it('falls back to the raw text body when the body is not JSON', async () => {
        const response = new Response('<h1>Bad Gateway</h1>', { status: 502 })

        const error = await buildError(response)

        expect(error.body, 'non-JSON body is kept as text').toBe(
          '<h1>Bad Gateway</h1>',
        )
      })
    })
  })

  describe('fetchJson', () => {
    const responseJson = { hi: 'there' }
    let fetchMock
    let response

    beforeEach(() => {
      response = new Response(JSON.stringify(responseJson))
      fetchMock = vi.fn(() => Promise.resolve(response))
      vi.stubGlobal('fetch', fetchMock)
    })

    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('defaults to GET ', () => {
      fetchJson(api)
      expect(fetchMock).toHaveBeenCalledWith(buildUrl(api), {
        method: 'GET',
        headers: buildHeaders(),
      })
    })

    it('passes options.method through when given', () => {
      fetchJson(api, { method: 'POST' })
      expect(fetchMock).toHaveBeenCalledWith(buildUrl(api), {
        method: 'POST',
        headers: buildHeaders(),
      })
    })

    it('returns the parsed JSON body when response.ok is true', async () => {
      await expect(fetchJson(api)).resolves.toMatchObject(responseJson)
    })

    it('throws an Error built by buildError when response.ok is false', async () => {
      fetchMock.mockResolvedValueOnce(
        new Response(JSON.stringify({ detail: 'no such object' }), {
          status: 404,
          statusText: 'Not Found',
        }),
      )

      await expect(fetchJson(api)).rejects.toMatchObject({
        status: 404,
        message: 'Not Found',
        body: { detail: 'no such object' },
      })
    })
  })
})
