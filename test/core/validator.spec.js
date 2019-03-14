import {
  validateEntry,
  validateAjaxOption,
  validateClassesOption,
  validateOptions,
  validateEntriesIdInItems,
  validateIdInItems,
  validateId,
  validateEntryHeader,
  validateEntryContent,
  validateEntriesWithRepeatedId,
  validateEntries,
  validateRootElement
} from '../../src/core/validator'

describe('validator', () => {
  describe('validateId', () => {
    let id

    beforeEach(() => {
      id = 0
    })

    test('should fail on trying to pass a undefined id', () => {
      expect(() => validateId()).toThrowError('id is required')
    })

    test('should fail on trying to pass incorrect type in id', () => {
      id = '123'
      expect(() => validateId(id)).toThrowError('id must be a number')
    })
  })

  describe('validateEntryHeader', () => {
    let header

    beforeEach(() => {
      header = `Header 0`
    })

    test('should fail on trying to pass a undefined header', () => {
      expect(() => validateEntryHeader()).toThrowError('header is required')
    })

    test('should fail on trying to pass incorrect type in header', () => {
      header = 123
      expect(() => validateEntryHeader(header)).toThrowError(
        'header must be a string'
      )
    })
  })

  describe('validateEntryContent', () => {
    let content

    beforeEach(() => {
      content = `Description 0`
    })

    test('should fail on trying to pass a undefined content', () => {
      expect(() => validateEntryContent()).toThrowError('content is required')
    })

    test('should fail on trying to pass incorrect type in content', () => {
      content = 123
      expect(() => validateEntryContent(content)).toThrowError(
        'content must be a string'
      )
    })
  })

  describe('validateEntry', () => {
    let id
    let header
    let content

    beforeEach(() => {
      id = 0
      header = `Header ${id}`
      content = `Description ${id}`
    })

    test('should fail on trying to pass a undefined in property id of entry', () => {
      expect(() => validateEntry({header, content})).toThrowError(
        'id is required'
      )
    })

    test('should fail on trying to pass a undefined in property header of entry', () => {
      expect(() => validateEntry({id, content})).toThrowError(
        'header is required'
      )
    })

    test('should fail on trying to pass a undefined in property content of entry', () => {
      expect(() => validateEntry({id, header})).toThrowError(
        'content is required'
      )
    })

    test('should fail on trying to pass incorrect type in property id of entry', () => {
      id = '123'
      expect(() => validateEntry({id, header, content})).toThrowError(
        'id must be a number'
      )
    })

    test('should fail on trying to pass incorrect type in property header of entry', () => {
      header = 123
      expect(() => validateEntry({id, header, content})).toThrowError(
        'header must be a string'
      )
    })

    test('should fail on trying to pass incorrect type in property content of entry', () => {
      content = 123
      expect(() => validateEntry({id, header, content})).toThrowError(
        'content must be a string'
      )
    })
  })

  describe('validateEntriesWithRepeatedId', () => {
    let ids
    let entries

    beforeEach(() => {
      ids = [0, 1, 2, 2]
      entries = ids.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
    })

    test('should fail on trying to pass entries with repeated ids', () => {
      expect(() => validateEntriesWithRepeatedId(entries)).toThrowError(
        `entries with id [2] already exist in entries`
      )
    })
  })

  describe('validateEntries', () => {
    test('should fail on trying to pass a undefined entries', () => {
      expect(() => validateEntries()).toThrowError('entries is required')
    })

    test('should fail on trying to pass incorrect type in entries', () => {
      const entries = '123'
      expect(() => validateEntries(entries)).toThrowError(
        'entries must be a array'
      )
    })
  })

  describe('validateRootElement', () => {
    test('should fail on trying to pass a undefined element', () => {
      expect(() => validateRootElement()).toThrowError('element is required')
    })

    test('should fail on trying to pass incorrect type in property id of item', () => {
      const element = '.accordion'
      expect(() => validateRootElement(element)).toThrowError(
        'element must be a HTMLDListElement'
      )
    })
  })

  describe('validateAjaxOption', () => {
    let url
    let processResults

    beforeEach(() => {
      url = 'http://example.com'
      processResults = data => data
    })

    test('should fail on trying to pass a undefined ajax', () => {
      expect(() => validateAjaxOption()).toThrowError('ajax is required')
    })

    test('should fail on trying to pass a undefined in property url of ajax', () => {
      expect(() => validateAjaxOption({processResults})).toThrowError(
        'url is required'
      )
    })

    test('should fail on trying to pass a undefined in property processResults of ajax', () => {
      expect(() => validateAjaxOption({url})).toThrowError(
        'processResults is required'
      )
    })

    test('should fail on trying to pass incorrect type in url of ajax', () => {
      url = 123
      expect(() => validateAjaxOption({url, processResults})).toThrowError(
        'url must be a string'
      )
    })

    test('should fail on trying to pass incorrect type in processResults of ajax', () => {
      processResults = 123
      expect(() => validateAjaxOption({url, processResults})).toThrowError(
        'processResults must be a function'
      )
    })
  })

  describe('validateClassesOption', () => {
    let root
    let header
    let opened
    let content

    beforeEach(() => {
      root = 'jaccordion'
      header = 'jaccordion__header'
      opened = 'jaccordion__header--opened'
      content = 'jaccordion__content'
    })

    test('should fail on trying to pass a undefined classes', () => {
      expect(() => validateClassesOption()).toThrowError('classes is required')
    })

    test('should fail on trying to pass a undefined in property root of classes', () => {
      expect(() => validateClassesOption({})).toThrowError('root is required')
    })

    test('should fail on trying to pass a undefined in property header of classes', () => {
      expect(() => validateClassesOption({root})).toThrowError(
        'header is required'
      )
    })

    test('should fail on trying to pass a undefined in property opened of classes', () => {
      expect(() => validateClassesOption({root, header})).toThrowError(
        'opened is required'
      )
    })

    test('should fail on trying to pass a undefined in property content of classes', () => {
      expect(() => validateClassesOption({root, header, opened})).toThrowError(
        'content is required'
      )
    })

    test('should fail on trying to pass incorrect type in root of classes', () => {
      root = 123
      expect(() =>
        validateClassesOption({root, header, opened, content})
      ).toThrowError('root must be a string')
    })

    test('should fail on trying to pass incorrect type in header of classes', () => {
      header = 123
      expect(() =>
        validateClassesOption({root, header, opened, content})
      ).toThrowError('header must be a string')
    })

    test('should fail on trying to pass incorrect type in opened of classes', () => {
      opened = 123
      expect(() =>
        validateClassesOption({root, header, opened, content})
      ).toThrowError('opened must be a string')
    })

    test('should fail on trying to pass incorrect type in content of classes', () => {
      content = 123
      expect(() =>
        validateClassesOption({root, header, opened, content})
      ).toThrowError('content must be a string')
    })
  })

  describe('validateOptions', () => {
    let openAt
    let multiple
    let entries
    let ajax
    let classes

    beforeEach(() => {
      openAt = 0
      multiple = false
      entries = []
      ajax = {
        url: '',
        processResults: data => data
      }
      classes = {
        root: 'jaccordion',
        header: 'jaccordion__header',
        opened: 'jaccordion__header--opened',
        content: 'jaccordion__content'
      }
    })

    test('should fail on trying to pass incorrect type in openAt of options', () => {
      openAt = true
      expect(() => validateOptions({openAt})).toThrowError(
        'openAt must be a number'
      )
    })

    test('should fail on trying to pass incorrect type in multiple of options', () => {
      multiple = 123
      expect(() => validateOptions({multiple})).toThrowError(
        'multiple must be a boolean'
      )
    })

    test('should fail on trying to pass incorrect type in entries of options', () => {
      entries = 123
      expect(() => validateOptions({entries})).toThrowError(
        'entries must be a array'
      )
    })

    test('should fail on trying to pass incorrect type in url of options', () => {
      ajax = {...ajax, url: 123}
      expect(() => validateOptions({ajax})).toThrowError('url must be a string')
    })

    test('should fail on trying to pass incorrect type in processResults of options', () => {
      ajax = {...ajax, processResults: 123}
      expect(() => validateOptions({ajax})).toThrowError(
        'processResults must be a function'
      )
    })

    test('should fail on trying to pass incorrect type in root of options', () => {
      classes = {...classes, root: 123}
      expect(() => validateOptions({classes})).toThrowError(
        'root must be a string'
      )
    })

    test('should fail on trying to pass incorrect type in header of options', () => {
      classes = {...classes, header: 123}
      expect(() => validateOptions({classes})).toThrowError(
        'header must be a string'
      )
    })

    test('should fail on trying to pass incorrect type in opened of options', () => {
      classes = {...classes, opened: 123}
      expect(() => validateOptions({classes})).toThrowError(
        'opened must be a string'
      )
    })

    test('should fail on trying to pass incorrect type in content of options', () => {
      classes = {...classes, content: 123}
      expect(() => validateOptions({classes})).toThrowError(
        'content must be a string'
      )
    })
  })

  describe('validateIdInItems', () => {
    let ids
    let items
    let id

    beforeEach(() => {
      ids = [0, 1, 2]
      const entries = ids.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))
      items = entries.map(entry => {
        const {id} = entry
        const header = document.createElement('dt')
        header.textContent = entry.header
        const content = document.createElement('dd')
        content.textContent = entry.content
        return {id, header, content}
      })
      id = 0
    })

    test('should fail on trying to pass incorrect id in items', () => {
      expect(() => validateIdInItems(id, items)).toThrowError(
        `id ${id} already exist in items`
      )
    })
  })

  describe('validateEntriesIdInItems', () => {
    let ids
    let entries
    let items

    beforeEach(() => {
      ids = [0, 1, 2]

      entries = ids.map(id => ({
        id,
        header: `Header ${id}`,
        content: `Description ${id}`
      }))

      items = entries.map(entry => {
        const {id} = entry
        const header = document.createElement('dt')
        header.textContent = entry.header
        const content = document.createElement('dd')
        content.textContent = entry.content
        return {id, header, content}
      })
    })

    test('should fail on trying to pass incorrect entries id in items', () => {
      expect(() => validateEntriesIdInItems(entries, items)).toThrowError(
        `entries with id [${ids.join(', ')}] already exist in items`
      )
    })
  })
})
