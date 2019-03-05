import {
  createItem,
  removeItem,
  findItemById,
  addItem,
  appendItem,
  prependItem,
  appendBeforeItem,
  appendAfterItem,
  getItemsByRoot,
  createItemByEntry,
  getItemsByEntries,
  getEntriesByAjax
} from '../../src/core/item'
import fetchMock from 'fetch-mock'

describe('item', () => {
  describe('createItem', () => {
    let header
    let content

    beforeEach(() => {
      header = document.createElement('dt')
      header.textContent = 'Header'
      content = document.createElement('dd')
      content.textContent = 'Description'
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
        const id = '123'
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
        header.textContent = 'Header'
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
        content.textContent = 'Description'
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
        header.textContent = `Header ${id}`
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
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
        header.textContent = `Header ${id}`
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
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
        header.textContent = `Header ${id}`
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
        return {id, header, content}
      })

      const id = ids.length
      const header = document.createElement('dt')
      header.textContent = `Header ${id}`
      const content = document.createElement('dd')
      content.textContent = `Description ${id}`
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
        header.textContent = 'Header'
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
        content.textContent = 'Description'
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

  describe('appendItem', () => {
    let ids
    let items
    let itemToAppend

    beforeEach(() => {
      ids = [0, 1, 2]

      items = ids.map(id => {
        const header = document.createElement('dt')
        header.textContent = `Header ${id}`
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
        return {id, header, content}
      })

      const id = ids.length
      const header = document.createElement('dt')
      header.textContent = `Header ${id}`
      const content = document.createElement('dd')
      content.textContent = `Description ${id}`
      itemToAppend = {id, header, content}
    })

    describe('entries', () => {
      test('should fail on trying to pass a undefined item', () => {
        expect(() => appendItem()).toThrowError('item is required')
      })

      test('should fail on trying to pass a undefined items', () => {
        expect(() => appendItem(itemToAppend)).toThrowError('items is required')
      })

      test('should fail on trying to pass a undefined in property id of item', () => {
        const incorrectItem = {...itemToAppend, id: undefined}
        expect(() => appendItem(incorrectItem, items)).toThrowError(
          'id is required'
        )
      })

      test('should fail on trying to pass a undefined in property header of item', () => {
        const incorrectItem = {...itemToAppend, header: undefined}
        expect(() => appendItem(incorrectItem, items)).toThrowError(
          'header is required'
        )
      })

      test('should fail on trying to pass a undefined in property content of item', () => {
        const incorrectItem = {...itemToAppend, content: undefined}
        expect(() => appendItem(incorrectItem, items)).toThrowError(
          'content is required'
        )
      })

      test('should fail on trying to pass incorrect type in property id of item', () => {
        const incorrectItem = {...itemToAppend, id: '123'}
        expect(() => appendItem(incorrectItem, items)).toThrowError(
          'id must be a number'
        )
      })

      test('should fail on trying to pass incorrect type in property header of item', () => {
        const incorrectItem = {...itemToAppend, header: 'Lorem ipsum'}
        expect(() => appendItem(incorrectItem, items)).toThrowError(
          'header must be a HTMLElement'
        )
      })

      test('should fail on trying to pass incorrect HTMLElement tag name in property header of item', () => {
        const header = document.createElement('li')
        header.textContent = 'Header'
        const incorrectItem = {...itemToAppend, header}
        expect(() => appendItem(incorrectItem, items)).toThrowError(
          'header must have a tag name equal to DT'
        )
      })

      test('should fail on trying to pass incorrect type in property content of item', () => {
        const incorrectItem = {...itemToAppend, content: 'Lorem ipsum'}
        expect(() => appendItem(incorrectItem, items)).toThrowError(
          'content must be a HTMLElement'
        )
      })

      test('should fail on trying to pass incorrect HTMLElement tag name in property content of item', () => {
        const content = document.createElement('li')
        content.textContent = 'Description'
        const incorrectItem = {...itemToAppend, content}
        expect(() => appendItem(incorrectItem, items)).toThrowError(
          'content must have a tag name equal to DD'
        )
      })

      test('should fail on trying to pass incorrect type in items', () => {
        items = 1234
        expect(() => appendItem(itemToAppend, items)).toThrowError(
          'items must be a array'
        )
      })
    })

    describe('functionality', () => {
      test('should append item correctly', () => {
        const newItems = appendItem(itemToAppend, items)

        expect(Array.isArray(newItems)).toBeTruthy()
        expect(newItems).toHaveLength(items.length + 1)
        expect(newItems.slice(-1)[0]).toEqual(itemToAppend)
      })

      test('should not have side effects in items', () => {
        const clonedItems = [...items]
        appendItem(itemToAppend, items)
        expect(clonedItems).toEqual(items)
      })
    })
  })

  describe('prependItem', () => {
    let ids
    let items
    let itemToPrepend

    beforeEach(() => {
      ids = [0, 1, 2]

      items = ids.map(id => {
        const header = document.createElement('dt')
        header.textContent = `Header ${id}`
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
        return {id, header, content}
      })

      const id = ids.length
      const header = document.createElement('dt')
      header.textContent = `Header ${id}`
      const content = document.createElement('dd')
      content.textContent = `Description ${id}`
      itemToPrepend = {id, header, content}
    })

    describe('entries', () => {
      test('should fail on trying to pass a undefined item', () => {
        expect(() => prependItem()).toThrowError('item is required')
      })

      test('should fail on trying to pass a undefined items', () => {
        expect(() => prependItem(itemToPrepend)).toThrowError(
          'items is required'
        )
      })

      test('should fail on trying to pass a undefined in property id of item', () => {
        const incorrectItem = {...itemToPrepend, id: undefined}
        expect(() => prependItem(incorrectItem, items)).toThrowError(
          'id is required'
        )
      })

      test('should fail on trying to pass a undefined in property header of item', () => {
        const incorrectItem = {...itemToPrepend, header: undefined}
        expect(() => prependItem(incorrectItem, items)).toThrowError(
          'header is required'
        )
      })

      test('should fail on trying to pass a undefined in property content of item', () => {
        const incorrectItem = {...itemToPrepend, content: undefined}
        expect(() => prependItem(incorrectItem, items)).toThrowError(
          'content is required'
        )
      })

      test('should fail on trying to pass incorrect type in property id of item', () => {
        const incorrectItem = {...itemToPrepend, id: '123'}
        expect(() => prependItem(incorrectItem, items)).toThrowError(
          'id must be a number'
        )
      })

      test('should fail on trying to pass incorrect type in property header of item', () => {
        const incorrectItem = {...itemToPrepend, header: 'Lorem ipsum'}
        expect(() => prependItem(incorrectItem, items)).toThrowError(
          'header must be a HTMLElement'
        )
      })

      test('should fail on trying to pass incorrect HTMLElement tag name in property header of item', () => {
        const header = document.createElement('li')
        header.textContent = 'Header'
        const incorrectItem = {...itemToPrepend, header}
        expect(() => prependItem(incorrectItem, items)).toThrowError(
          'header must have a tag name equal to DT'
        )
      })

      test('should fail on trying to pass incorrect type in property content of item', () => {
        const incorrectItem = {...itemToPrepend, content: 'Lorem ipsum'}
        expect(() => prependItem(incorrectItem, items)).toThrowError(
          'content must be a HTMLElement'
        )
      })

      test('should fail on trying to pass incorrect HTMLElement tag name in property content of item', () => {
        const content = document.createElement('li')
        content.textContent = 'Description'
        const incorrectItem = {...itemToPrepend, content}
        expect(() => prependItem(incorrectItem, items)).toThrowError(
          'content must have a tag name equal to DD'
        )
      })

      test('should fail on trying to pass incorrect type in items', () => {
        items = 1234
        expect(() => prependItem(itemToPrepend, items)).toThrowError(
          'items must be a array'
        )
      })
    })

    describe('functionality', () => {
      test('should prepend item correctly', () => {
        const newItems = prependItem(itemToPrepend, items)

        expect(Array.isArray(newItems)).toBeTruthy()
        expect(newItems).toHaveLength(items.length + 1)
        expect(newItems.slice(0)[0]).toEqual(itemToPrepend)
      })

      test('should not have side effects in items', () => {
        const clonedItems = [...items]
        prependItem(itemToPrepend, items)
        expect(clonedItems).toEqual(items)
      })
    })
  })

  describe('appendBeforeItem', () => {
    let ids
    let items
    let itemToAppend
    let referenceId

    beforeEach(() => {
      ids = [0, 1, 2]

      items = ids.map(id => {
        const header = document.createElement('dt')
        header.textContent = `Header ${id}`
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
        return {id, header, content}
      })

      const id = ids.length
      const header = document.createElement('dt')
      header.textContent = `Header ${id}`
      const content = document.createElement('dd')
      content.textContent = `Description ${id}`
      itemToAppend = {id, header, content}

      referenceId = 1
    })

    describe('entries', () => {
      test('should fail on trying to pass a undefined item', () => {
        expect(() => appendBeforeItem()).toThrowError('item is required')
      })

      test('should fail on trying to pass a undefined referenceId', () => {
        expect(() => appendBeforeItem(itemToAppend)).toThrowError(
          'referenceId is required'
        )
      })

      test('should fail on trying to pass a undefined items', () => {
        expect(() => appendBeforeItem(itemToAppend, referenceId)).toThrowError(
          'items is required'
        )
      })

      test('should fail on trying to pass a undefined in property id of item', () => {
        const incorrectItem = {...itemToAppend, id: undefined}
        expect(() =>
          appendBeforeItem(incorrectItem, referenceId, items)
        ).toThrowError('id is required')
      })

      test('should fail on trying to pass a undefined in property header of item', () => {
        const incorrectItem = {...itemToAppend, header: undefined}
        expect(() =>
          appendBeforeItem(incorrectItem, referenceId, items)
        ).toThrowError('header is required')
      })

      test('should fail on trying to pass a undefined in property content of item', () => {
        const incorrectItem = {...itemToAppend, content: undefined}
        expect(() =>
          appendBeforeItem(incorrectItem, referenceId, items)
        ).toThrowError('content is required')
      })

      test('should fail on trying to pass incorrect type in property id of item', () => {
        const incorrectItem = {...itemToAppend, id: '123'}
        expect(() =>
          appendBeforeItem(incorrectItem, referenceId, items)
        ).toThrowError('id must be a number')
      })

      test('should fail on trying to pass incorrect type in property header of item', () => {
        const incorrectItem = {...itemToAppend, header: 'Lorem ipsum'}
        expect(() =>
          appendBeforeItem(incorrectItem, referenceId, items)
        ).toThrowError('header must be a HTMLElement')
      })

      test('should fail on trying to pass incorrect HTMLElement tag name in property header of item', () => {
        const header = document.createElement('li')
        header.textContent = 'Header'
        const incorrectItem = {...itemToAppend, header}
        expect(() =>
          appendBeforeItem(incorrectItem, referenceId, items)
        ).toThrowError('header must have a tag name equal to DT')
      })

      test('should fail on trying to pass incorrect type in property content of item', () => {
        const incorrectItem = {...itemToAppend, content: 'Lorem ipsum'}
        expect(() =>
          appendBeforeItem(incorrectItem, referenceId, items)
        ).toThrowError('content must be a HTMLElement')
      })

      test('should fail on trying to pass incorrect HTMLElement tag name in property content of item', () => {
        const content = document.createElement('li')
        content.textContent = 'Description'
        const incorrectItem = {...itemToAppend, content}
        expect(() =>
          appendBeforeItem(incorrectItem, referenceId, items)
        ).toThrowError('content must have a tag name equal to DD')
      })

      test('should fail on trying to pass incorrect type in items', () => {
        items = 1234
        expect(() =>
          appendBeforeItem(itemToAppend, referenceId, items)
        ).toThrowError('items must be a array')
      })

      test('should fail on trying to pass incorrect type in referenceId', () => {
        referenceId = '123'
        expect(() =>
          appendBeforeItem(itemToAppend, referenceId, items)
        ).toThrowError('referenceId must be a number')
      })
    })

    describe('functionality', () => {
      test('should append before item correctly', () => {
        const newItems = appendBeforeItem(itemToAppend, referenceId, items)

        expect(Array.isArray(newItems)).toBeTruthy()
        expect(newItems).toHaveLength(items.length + 1)
        expect(newItems.slice(1)[0]).toEqual(itemToAppend)
      })

      test('should not have side effects in items', () => {
        const clonedItems = [...items]
        appendBeforeItem(itemToAppend, referenceId, items)
        expect(clonedItems).toEqual(items)
      })
    })
  })

  describe('appendAfterItem', () => {
    let ids
    let items
    let itemToAppend
    let referenceId

    beforeEach(() => {
      ids = [0, 1, 2]

      items = ids.map(id => {
        const header = document.createElement('dt')
        header.textContent = `Header ${id}`
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
        return {id, header, content}
      })

      const id = ids.length
      const header = document.createElement('dt')
      header.textContent = `Header ${id}`
      const content = document.createElement('dd')
      content.textContent = `Description ${id}`
      itemToAppend = {id, header, content}

      referenceId = 1
    })

    describe('entries', () => {
      test('should fail on trying to pass a undefined item', () => {
        expect(() => appendAfterItem()).toThrowError('item is required')
      })

      test('should fail on trying to pass a undefined referenceId', () => {
        expect(() => appendAfterItem(itemToAppend)).toThrowError(
          'referenceId is required'
        )
      })

      test('should fail on trying to pass a undefined items', () => {
        expect(() => appendAfterItem(itemToAppend, referenceId)).toThrowError(
          'items is required'
        )
      })

      test('should fail on trying to pass a undefined in property id of item', () => {
        const incorrectItem = {...itemToAppend, id: undefined}
        expect(() =>
          appendAfterItem(incorrectItem, referenceId, items)
        ).toThrowError('id is required')
      })

      test('should fail on trying to pass a undefined in property header of item', () => {
        const incorrectItem = {...itemToAppend, header: undefined}
        expect(() =>
          appendAfterItem(incorrectItem, referenceId, items)
        ).toThrowError('header is required')
      })

      test('should fail on trying to pass a undefined in property content of item', () => {
        const incorrectItem = {...itemToAppend, content: undefined}
        expect(() =>
          appendAfterItem(incorrectItem, referenceId, items)
        ).toThrowError('content is required')
      })

      test('should fail on trying to pass incorrect type in property id of item', () => {
        const incorrectItem = {...itemToAppend, id: '123'}
        expect(() =>
          appendAfterItem(incorrectItem, referenceId, items)
        ).toThrowError('id must be a number')
      })

      test('should fail on trying to pass incorrect type in property header of item', () => {
        const incorrectItem = {...itemToAppend, header: 'Lorem ipsum'}
        expect(() =>
          appendAfterItem(incorrectItem, referenceId, items)
        ).toThrowError('header must be a HTMLElement')
      })

      test('should fail on trying to pass incorrect HTMLElement tag name in property header of item', () => {
        const header = document.createElement('li')
        header.textContent = 'Header'
        const incorrectItem = {...itemToAppend, header}
        expect(() =>
          appendAfterItem(incorrectItem, referenceId, items)
        ).toThrowError('header must have a tag name equal to DT')
      })

      test('should fail on trying to pass incorrect type in property content of item', () => {
        const incorrectItem = {...itemToAppend, content: 'Lorem ipsum'}
        expect(() =>
          appendAfterItem(incorrectItem, referenceId, items)
        ).toThrowError('content must be a HTMLElement')
      })

      test('should fail on trying to pass incorrect HTMLElement tag name in property content of item', () => {
        const content = document.createElement('li')
        content.textContent = 'Description'
        const incorrectItem = {...itemToAppend, content}
        expect(() =>
          appendAfterItem(incorrectItem, referenceId, items)
        ).toThrowError('content must have a tag name equal to DD')
      })

      test('should fail on trying to pass incorrect type in items', () => {
        items = 1234
        expect(() =>
          appendAfterItem(itemToAppend, referenceId, items)
        ).toThrowError('items must be a array')
      })

      test('should fail on trying to pass incorrect type in referenceId', () => {
        referenceId = '123'
        expect(() =>
          appendAfterItem(itemToAppend, referenceId, items)
        ).toThrowError('referenceId must be a number')
      })
    })

    describe('functionality', () => {
      test('should append after item correctly', () => {
        const newItems = appendAfterItem(itemToAppend, referenceId, items)

        expect(Array.isArray(newItems)).toBeTruthy()
        expect(newItems).toHaveLength(items.length + 1)
        expect(newItems.slice(2)[0]).toEqual(itemToAppend)
      })

      test('should not have side effects in items', () => {
        const clonedItems = [...items]
        appendAfterItem(itemToAppend, referenceId, items)
        expect(clonedItems).toEqual(items)
      })
    })
  })

  describe('getItemsByRoot', () => {
    let ids
    let dlElem
    let items

    beforeEach(() => {
      ids = [0, 1, 2]

      dlElem = document.createElement('dl')
      items = ids.map(id => {
        const header = document.createElement('dt')
        header.textContent = `Header ${id}`
        dlElem.appendChild(header)
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
        dlElem.appendChild(content)
        return {id, header, content}
      })
    })

    describe('entries', () => {
      test('should fail on trying to pass a undefined dlElem', () => {
        expect(() => getItemsByRoot()).toThrowError('dlElem is required')
      })

      test('should fail on trying to pass incorrect type in dlElem', () => {
        dlElem = []
        expect(() => getItemsByRoot(dlElem)).toThrowError(
          'dlElem must be a HTMLDListElement'
        )
      })
    })

    describe('functionality', () => {
      test('should get items by dl element correctly', () => {
        const newItems = getItemsByRoot(dlElem)

        expect(Array.isArray(newItems)).toBeTruthy()
        expect(newItems).toHaveLength(items.length)
        newItems.forEach((newItem, index) => {
          expect(newItem).toHaveProperty('id')
          expect(newItem.header).toEqual(items[index].header)
          expect(newItem.content).toEqual(items[index].content)
        })
      })

      test('should not have side effects in the children of dl element', () => {
        const clonedChildren = [...Array.from(dlElem.children)]
        getItemsByRoot(dlElem)
        const children = Array.from(dlElem.children)

        expect(clonedChildren.length).toBe(children.length)
        expect(clonedChildren).toEqual(children)
      })
    })
  })

  describe('createItemByEntry', () => {
    let id
    let header
    let content
    let entry

    beforeEach(() => {
      id = 0
      header = `Header ${id}`
      content = `Description ${id}`
      entry = {id, header, content}
    })

    describe('entries', () => {
      test('should fail on trying to pass a undefined entry', () => {
        expect(() => createItemByEntry()).toThrowError('entry is required')
      })

      test('should fail on trying to pass a undefined in property id of entry', () => {
        expect(() => createItemByEntry({header, content})).toThrowError(
          'id is required'
        )
      })

      test('should fail on trying to pass a undefined in property header of entry', () => {
        expect(() => createItemByEntry({id, content})).toThrowError(
          'header is required'
        )
      })

      test('should fail on trying to pass a undefined in property content of entry', () => {
        expect(() => createItemByEntry({id, header})).toThrowError(
          'content is required'
        )
      })

      test('should fail on trying to pass incorrect type in property id of entry', () => {
        id = '123'
        expect(() => createItemByEntry({id, header, content})).toThrowError(
          'id must be a number'
        )
      })

      test('should fail on trying to pass incorrect type in property header of entry', () => {
        header = 123
        expect(() => createItemByEntry({id, header, content})).toThrowError(
          'header must be a string'
        )
      })

      test('should fail on trying to pass incorrect type in property content of entry', () => {
        content = 123
        expect(() => createItemByEntry({id, header, content})).toThrowError(
          'content must be a string'
        )
      })
    })

    describe('functionality', () => {
      test('should create item by entry correctly', () => {
        const newItem = createItemByEntry(entry)

        expect(newItem).toBeDefined()
        expect(newItem.id).toBe(id)
        expect(newItem.header.textContent).toBe(header)
        expect(newItem.content.textContent).toBe(content)
      })

      test('should not have side effects in entry', () => {
        const clonedEntry = {...entry}
        createItemByEntry(entry)

        expect(clonedEntry).toEqual(entry)
      })
    })
  })

  describe('getItemsByEntries', () => {
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

    describe('entries', () => {
      test('should fail on trying to pass a undefined entries', () => {
        expect(() => getItemsByEntries()).toThrowError('entries is required')
      })

      test('should fail on trying to pass incorrect type in dlElem', () => {
        entries = entries[0]
        expect(() => getItemsByEntries(entries)).toThrowError(
          'entries must be a array'
        )
      })
    })

    describe('functionality', () => {
      test('should get items by entries correctly', () => {
        const newItems = getItemsByEntries(entries)

        expect(Array.isArray(newItems)).toBeTruthy()
        expect(newItems).toHaveLength(items.length)
        expect(newItems).toEqual(items)
      })

      test('should not have side effects in entries', () => {
        const clonedEntries = [...entries]
        getItemsByEntries(entries)

        expect(clonedEntries.length).toBe(entries.length)
        expect(clonedEntries).toEqual(entries)
      })
    })
  })

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
      test('should get items by entries correctly', async () => {
        const newEntries = await getEntriesByAjax({url, processResults})

        expect(Array.isArray(newEntries)).toBeTruthy()
        expect(newEntries).toHaveLength(entries.length)
        expect(newEntries).toEqual(entries)
      })

      test('should not have side effects in entries', async () => {
        const clonedEntries = [...entries]
        await getItemsByEntries(entries)

        expect(clonedEntries).toHaveLength(entries.length)
        expect(clonedEntries).toEqual(entries)
      })
    })
  })
})
