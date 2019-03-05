import fetchMock from 'fetch-mock'
import {getEntriesByAjax} from '../../src/core/entry'

describe('entry', () => {
  describe('getEntriesByAjax', () => {
    let url
    let processResults
    let ids
    let entries

    beforeEach(() => {
      url = 'http://example.com'
      processResults = data => data

      ids = [0, 1, 2]
      entries = ids.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      // Mock the fetch() global to always return the same value for GET requests to all URLs
      fetchMock.get('*', entries)
    })

    afterEach(() => {
      // Unmock
      fetchMock.reset()
    })

    describe('entries', () => {
      test('should fail on trying to pass a undefined ajax', async () => {
        await expect(getEntriesByAjax()).rejects.toThrow('ajax is required')
      })

      test('should fail on trying to pass a undefined in property url of ajax', async () => {
        await expect(getEntriesByAjax({processResults})).rejects.toThrow(
          'url is required'
        )
      })

      test('should fail on trying to pass a undefined in property processResults of ajax', async () => {
        await expect(getEntriesByAjax({url})).rejects.toThrow(
          'processResults is required'
        )
      })

      test('should fail on trying to pass incorrect type in url of ajax', async () => {
        url = 123
        await expect(getEntriesByAjax({url, processResults})).rejects.toThrow(
          'url must be a string'
        )
      })

      test('should fail on trying to pass incorrect type in processResults of ajax', async () => {
        processResults = 123
        await expect(getEntriesByAjax({url, processResults})).rejects.toThrow(
          'processResults must be a function'
        )
      })

      test('should fail on trying to pass processResults that returns undefined entries', async () => {
        processResults = data => {}
        await expect(getEntriesByAjax({url, processResults})).rejects.toThrow(
          'entries is required'
        )
      })

      test('should fail on trying to pass processResults that returns entries with incorrect types', async () => {
        processResults = data => 123
        await expect(getEntriesByAjax({url, processResults})).rejects.toThrow(
          'entries must be a array'
        )
      })

      test('should fail on trying to pass processResults that returns entries with undefined id', async () => {
        processResults = data =>
          data.map(entry => {
            delete entry.id
            return entry
          })
        await expect(getEntriesByAjax({url, processResults})).rejects.toThrow(
          'id is required'
        )
      })

      test('should fail on trying to pass processResults that returns entries with undefined header', async () => {
        processResults = data =>
          data.map(entry => {
            delete entry.header
            return entry
          })
        await expect(getEntriesByAjax({url, processResults})).rejects.toThrow(
          'header is required'
        )
      })

      test('should fail on trying to pass processResults that returns entries with undefined content', async () => {
        processResults = data =>
          data.map(entry => {
            delete entry.content
            return entry
          })
        await expect(getEntriesByAjax({url, processResults})).rejects.toThrow(
          'content is required'
        )
      })

      test('should fail on trying to pass processResults that returns entries with incorrect type in id', async () => {
        processResults = data =>
          data.map(entry => ({...entry, id: entry.id.toString()}))
        await expect(getEntriesByAjax({url, processResults})).rejects.toThrow(
          'id must be a number'
        )
      })

      test('should fail on trying to pass processResults that returns entries with incorrect type in header', async () => {
        processResults = data =>
          data.map(entry => ({...entry, header: Math.random()}))
        await expect(getEntriesByAjax({url, processResults})).rejects.toThrow(
          'header must be a string'
        )
      })

      test('should fail on trying to pass processResults that returns entries with incorrect type in content', async () => {
        processResults = data =>
          data.map(entry => ({...entry, content: Math.random()}))
        await expect(getEntriesByAjax({url, processResults})).rejects.toThrow(
          'content must be a string'
        )
      })
    })

    describe('functionality', () => {
      test('should fail when it happens a fetch error', async () => {
        fetchMock.reset()
        fetchMock.get('*', 500)

        await expect(getEntriesByAjax({url, processResults})).rejects.toThrow(
          `invalid json response body at ${url}/ reason: Unexpected end of JSON input`
        )
      })

      test('should get items by entries correctly', async () => {
        const newEntries = await getEntriesByAjax({url, processResults})

        expect(Array.isArray(newEntries)).toBeTruthy()
        expect(newEntries).toHaveLength(entries.length)
        expect(newEntries).toEqual(entries)
      })

      test('should not have side effects in entries', async () => {
        const ajax = {url, processResults}
        const clonedAjax = {...ajax}
        await getEntriesByAjax(ajax)

        expect(clonedAjax).toEqual(ajax)
      })
    })
  })
})
