import {createItem} from '../../src/core/item'

describe('item', () => {
  describe('createItem', () => {
    let header
    let content

    beforeEach(() => {
      header = document.createElement('dt')
      header.innerText = 'Header'
      content = document.createElement('dd')
      content.innerText = 'Description'
    })

    describe('entries', () => {
      test('should fail on trying to pass a undefined in property header', () => {
        expect(() => createItem({content})).toThrowError('header is required')
      })

      test('should fail on trying to pass a undefined in property content', () => {
        expect(() => createItem({header})).toThrowError('content is required')
      })

      test('should fail on trying to pass incorrect type in property id', () => {
        const id = '1404'
        expect(() => createItem({id, header, content})).toThrowError(
          'id must be of type number'
        )
      })

      test('should fail on trying to pass incorrect type in property header', () => {
        header = 'Lorem ipsum'
        expect(() => createItem({header, content})).toThrowError(
          'header must be a HTMLElement'
        )
      })

      test('should fail on trying to pass incorrect HTMLElement tag name in property header', () => {
        header = document.createElement('li')
        header.innerText = 'Header'
        expect(() => createItem({header, content})).toThrowError(
          'header must be a HTMLElement with tag name DT'
        )
      })

      test('should fail on trying to pass incorrect type in property content', () => {
        content = 'Lorem ipsum'
        expect(() => createItem({header, content})).toThrowError(
          'content must be a HTMLElement'
        )
      })

      test('should fail on trying to pass incorrect HTMLElement tag name in property content', () => {
        content = document.createElement('li')
        content.innerText = 'Description'
        expect(() => createItem({header, content})).toThrowError(
          'content must be a HTMLElement with tag name DD'
        )
      })
    })

    describe('functionality', () => {
      test('should create correctly a item with id zero', () => {
        const item = createItem({header, content})
        expect(item).toBeDefined()
        expect(item).toHaveProperty('id', 0)
      })

      test('should create correctly a item without id', () => {
        const item = createItem({header, content})
        expect(item).toBeDefined()
        expect(item).toHaveProperty('id')
        expect(item).toHaveProperty('header', header)
        expect(item).toHaveProperty('content', content)
      })

      test('should create correctly a item with all parameters', () => {
        const id = 9999
        const item = createItem({id, header, content})
        expect(item).toBeDefined()
        expect(item).toHaveProperty('id', id)
        expect(item).toHaveProperty('header', header)
        expect(item).toHaveProperty('content', content)
      })
    })
  })
})
