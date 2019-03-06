import {
  validateEntry,
  validateItem,
  validateElement,
  validateAjaxOption,
  validateClassesOption,
  validateOptions,
  validateEntriesIdInItems,
  validateIdInItems
} from '../../src/core/validator'

describe('validator', () => {
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

  describe('validateItem', () => {
    let id
    let header
    let content

    beforeEach(() => {
      id = 0
      header = document.createElement('dt')
      header.textContent = 'Header'
      content = document.createElement('dd')
      content.textContent = 'Description'
    })

    test('should fail on trying to pass a undefined in property header of item', () => {
      expect(() => validateItem({content})).toThrowError('header is required')
    })

    test('should fail on trying to pass a undefined in property content of item', () => {
      expect(() => validateItem({header})).toThrowError('content is required')
    })

    test('should fail on trying to pass incorrect type in property id of item', () => {
      const id = '123'
      expect(() => validateItem({id, header, content})).toThrowError(
        'id must be a number'
      )
    })

    test('should fail on trying to pass incorrect type in property header of item', () => {
      header = 'Lorem ipsum'
      expect(() => validateItem({id, header, content})).toThrowError(
        'header must be a HTMLElement'
      )
    })

    test('should fail on trying to pass incorrect HTMLElement tag name in property header of item', () => {
      header = document.createElement('li')
      header.textContent = 'Header'
      expect(() => validateItem({id, header, content})).toThrowError(
        'header must have a tag name equal to DT'
      )
    })

    test('should fail on trying to pass incorrect type in property content of item', () => {
      content = 'Lorem ipsum'
      expect(() => validateItem({id, header, content})).toThrowError(
        'content must be a HTMLElement'
      )
    })

    test('should fail on trying to pass incorrect HTMLElement tag name in property content of item', () => {
      content = document.createElement('li')
      content.textContent = 'Description'
      expect(() => validateItem({id, header, content})).toThrowError(
        'content must have a tag name equal to DD'
      )
    })
  })

  describe('validateElement', () => {
    test('should fail on trying to pass a undefined element', () => {
      expect(() => validateElement()).toThrowError('element is required')
    })

    test('should fail on trying to pass incorrect type in property id of item', () => {
      const element = '.accordion'
      expect(() => validateElement(element)).toThrowError(
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
        `id ${id}] already exist in items`
      )
    })
  })
})
