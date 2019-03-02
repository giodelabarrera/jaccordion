import {
  createItem,
  removeItem,
  findItemById,
  addItem
} from '../../src/core/item'

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
      test('should fail on trying to pass a undefined item', () => {
        expect(() => createItem()).toThrowError('item is required')
      })

      test('should fail on trying to pass a undefined in property header of item', () => {
        expect(() => createItem({content})).toThrowError('header is required')
      })

      test('should fail on trying to pass a undefined in property content of item', () => {
        expect(() => createItem({header})).toThrowError('content is required')
      })

      test('should fail on trying to pass incorrect type in property id of item', () => {
        const id = '1404'
        expect(() => createItem({id, header, content})).toThrowError(
          'id must be a number'
        )
      })

      test('should fail on trying to pass incorrect type in property header of item', () => {
        header = 'Lorem ipsum'
        expect(() => createItem({header, content})).toThrowError(
          'header must be a HTMLElement'
        )
      })

      test('should fail on trying to pass incorrect HTMLElement tag name in property header of item', () => {
        header = document.createElement('li')
        header.innerText = 'Header'
        expect(() => createItem({header, content})).toThrowError(
          'header must have a tag name equal to DT'
        )
      })

      test('should fail on trying to pass incorrect type in property content of item', () => {
        content = 'Lorem ipsum'
        expect(() => createItem({header, content})).toThrowError(
          'content must be a HTMLElement'
        )
      })

      test('should fail on trying to pass incorrect HTMLElement tag name in property content of item', () => {
        content = document.createElement('li')
        content.innerText = 'Description'
        expect(() => createItem({header, content})).toThrowError(
          'content must have a tag name equal to DD'
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

  describe('removeItem', () => {
    let ids
    let items

    beforeEach(() => {
      ids = [0, 1, 2]
      items = ids.map(id => {
        const header = document.createElement('dt')
        header.innerText = `Header ${id}`
        const content = document.createElement('dd')
        content.innerText = `Description ${id}`
        return {id, header, content}
      })
    })

    describe('entries', () => {
      test('should fail on trying to pass a undefined in id', () => {
        expect(() => removeItem()).toThrowError('id is required')
      })

      test('should fail on trying to pass a undefined in items', () => {
        const id = 0
        expect(() => removeItem(id)).toThrowError('items is required')
      })

      test('should fail on trying to pass incorrect type in id', () => {
        const id = '0'
        expect(() => removeItem(id, items)).toThrowError('id must be a number')
      })

      test('should fail on trying to pass incorrect type in items', () => {
        const id = 0
        items = 1234
        expect(() => removeItem(id, items)).toThrowError(
          'items must be a array'
        )
      })
    })

    describe('functionality', () => {
      test('should return new array with same items when item was not found', () => {
        const id = 5
        const newItems = removeItem(id, items)

        expect(Array.isArray(newItems)).toBeTruthy()
        expect(newItems).toHaveLength(items.length)
        expect(newItems).toEqual(items)
      })

      test('should return new array without the item', () => {
        const id = 0
        const newItems = removeItem(id, items)

        expect(newItems).toHaveLength(items.length - 1)
        expect(newItems.find(item => item.id === id)).toBeUndefined()
      })

      test('should not have side effects in items', () => {
        const clonedItems = [...items]
        const id = 0
        removeItem(id, items)
        expect(clonedItems).toEqual(items)
      })
    })
  })

  describe('findItemById', () => {
    let ids
    let items

    beforeEach(() => {
      ids = [0, 1, 2]
      items = ids.map(id => {
        const header = document.createElement('dt')
        header.innerText = `Header ${id}`
        const content = document.createElement('dd')
        content.innerText = `Description ${id}`
        return {id, header, content}
      })
    })

    describe('entries', () => {
      test('should fail on trying to pass a undefined in id', () => {
        expect(() => findItemById()).toThrowError('id is required')
      })

      test('should fail on trying to pass a undefined in items', () => {
        const id = 0
        expect(() => findItemById(id)).toThrowError('items is required')
      })

      test('should fail on trying to pass incorrect type in id', () => {
        const id = '0'
        expect(() => findItemById(id, items)).toThrowError(
          'id must be a number'
        )
      })

      test('should fail on trying to pass incorrect type in items', () => {
        const id = 0
        items = 1234
        expect(() => findItemById(id, items)).toThrowError(
          'items must be a array'
        )
      })
    })

    describe('functionality', () => {
      test('should return undefined when item was not found', () => {
        const id = 9999
        const itemFound = findItemById(id, items)

        expect(itemFound).toBeUndefined()
      })

      test('should find by item correctly', () => {
        const id = 0
        const itemFound = findItemById(id, items)

        expect(itemFound).toBeDefined()
        expect(itemFound).toHaveProperty('id', 0)
      })

      test('should not have side effects in items', () => {
        const clonedItems = [...items]
        const id = 0
        findItemById(id, items)
        expect(clonedItems).toEqual(items)
      })
    })
  })

  describe('addItem', () => {
    let ids
    let items
    let itemToAdd

    beforeEach(() => {
      ids = [0, 1, 2]

      items = ids.map(id => {
        const header = document.createElement('dt')
        header.innerText = `Header ${id}`
        const content = document.createElement('dd')
        content.innerText = `Description ${id}`
        return {id, header, content}
      })

      const id = ids.length
      const header = document.createElement('dt')
      header.innerText = `Header ${id}`
      const content = document.createElement('dd')
      content.innerText = `Description ${id}`
      itemToAdd = {id, header, content}
    })

    describe('entries', () => {
      test('should fail on trying to pass a undefined item', () => {
        expect(() => addItem()).toThrowError('item is required')
      })

      test('should fail on trying to pass a undefined items', () => {
        expect(() => addItem(itemToAdd)).toThrowError('items is required')
      })

      test('should fail on trying to pass a undefined in property id of item', () => {
        const incorrectItem = {...itemToAdd, id: undefined}
        expect(() => addItem(incorrectItem, items)).toThrowError(
          'id is required'
        )
      })

      test('should fail on trying to pass a undefined in property header of item', () => {
        const incorrectItem = {...itemToAdd, header: undefined}
        expect(() => addItem(incorrectItem, items)).toThrowError(
          'header is required'
        )
      })

      test('should fail on trying to pass a undefined in property content of item', () => {
        const incorrectItem = {...itemToAdd, content: undefined}
        expect(() => addItem(incorrectItem, items)).toThrowError(
          'content is required'
        )
      })

      test('should fail on trying to pass incorrect type in property id of item', () => {
        const incorrectItem = {...itemToAdd, id: '123'}
        expect(() => addItem(incorrectItem, items)).toThrowError(
          'id must be a number'
        )
      })

      test('should fail on trying to pass incorrect type in property header of item', () => {
        const incorrectItem = {...itemToAdd, header: 'Lorem ipsum'}
        expect(() => addItem(incorrectItem, items)).toThrowError(
          'header must be a HTMLElement'
        )
      })

      test('should fail on trying to pass incorrect HTMLElement tag name in property header of item', () => {
        const header = document.createElement('li')
        header.innerText = 'Header'
        const incorrectItem = {...itemToAdd, header}
        expect(() => addItem(incorrectItem, items)).toThrowError(
          'header must have a tag name equal to DT'
        )
      })

      test('should fail on trying to pass incorrect type in property content of item', () => {
        const incorrectItem = {...itemToAdd, content: 'Lorem ipsum'}
        expect(() => addItem(incorrectItem, items)).toThrowError(
          'content must be a HTMLElement'
        )
      })

      test('should fail on trying to pass incorrect HTMLElement tag name in property content of item', () => {
        const content = document.createElement('li')
        content.innerText = 'Description'
        const incorrectItem = {...itemToAdd, content}
        expect(() => addItem(incorrectItem, items)).toThrowError(
          'content must have a tag name equal to DD'
        )
      })

      test('should fail on trying to pass incorrect type in items', () => {
        items = 1234
        expect(() => addItem(itemToAdd, items)).toThrowError(
          'items must be a array'
        )
      })
    })

    describe('functionality', () => {
      test('should add item correctly', () => {
        const newItems = addItem(itemToAdd, items)

        expect(Array.isArray(newItems)).toBeTruthy()
        expect(newItems).toHaveLength(items.length + 1)
        expect(newItems.slice(-1)[0]).toEqual(itemToAdd)
      })

      test('should not have side effects in items', () => {
        const clonedItems = [...items]
        addItem(itemToAdd, items)
        expect(clonedItems).toEqual(items)
      })
    })
  })
})
