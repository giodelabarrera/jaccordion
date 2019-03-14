import fetchMock from 'fetch-mock'
import {callApi} from '../../src/utils/service'

describe('service', () => {
  describe('callApi', () => {
    let url
    let itemMock

    beforeEach(() => {
      url = 'http://example.com'

      itemMock = {id: 1234, name: 'sui', author: 'Schibsted'}
    })

    afterEach(() => {
      fetchMock.reset()
    })

    test('should call api correctly', async () => {
      fetchMock.get('*', itemMock)
      const item = await callApi(url)
      expect(item).toEqual(itemMock)
    })

    test('should fail when it happens a fetch error', async () => {
      fetchMock.get('*', 500)

      await expect(callApi(url)).rejects.toThrow(
        `invalid json response body at ${url}/ reason: Unexpected end of JSON input`
      )
    })
  })
})
