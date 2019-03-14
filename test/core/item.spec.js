import {
  createItem,
  removeItem,
  findItemById,
  addItem,
  appendItem,
  prependItem,
  appendBeforeItem,
  appendAfterItem,
  createItemsByRoot,
  createItemByEntry,
  createItemsByEntries,
  existsIdInItems
} from '../../src/core/item'

describe('item', () => {
  describe('createItem', () => {
    let id
    let header
    let content

    beforeEach(() => {
      id = 0
      header = document.createElement('dt')
      header.dataset.id = id
      header.textContent = 'Header'
      content = document.createElement('dd')
      content.textContent = 'Description'
    })

    test('should create a item correctly', () => {
      const item = createItem({id, header, content})
      expect(item).toBeDefined()
      expect(item).toHaveProperty('id', id)
      expect(item).toHaveProperty('header', header)
      expect(item.header.dataset.id).toBeDefined()
      expect(parseInt(item.header.dataset.id)).toBe(id)
      expect(item).toHaveProperty('content', content)
    })
  })

  describe('removeItem', () => {
    let ids
    let items

    beforeEach(() => {
      ids = [0, 1, 2]
      items = ids.map(id => {
        const header = document.createElement('dt')
        header.dataset.id = id
        header.textContent = `Header ${id}`
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
        return {id, header, content}
      })
    })

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

  describe('findItemById', () => {
    let ids
    let items

    beforeEach(() => {
      ids = [0, 1, 2]
      items = ids.map(id => {
        const header = document.createElement('dt')
        header.dataset.id = id
        header.textContent = `Header ${id}`
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
        return {id, header, content}
      })
    })

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

  describe('addItem', () => {
    let ids
    let items
    let itemToAdd

    beforeEach(() => {
      ids = [0, 1, 2]

      items = ids.map(id => {
        const header = document.createElement('dt')
        header.dataset.id = id
        header.textContent = `Header ${id}`
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
        return {id, header, content}
      })

      const id = ids.length
      const header = document.createElement('dt')
      header.dataset.id = id
      header.textContent = `Header ${id}`
      const content = document.createElement('dd')
      content.textContent = `Description ${id}`
      itemToAdd = {id, header, content}
    })

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

  describe('appendItem', () => {
    let ids
    let items
    let itemToAppend

    beforeEach(() => {
      ids = [0, 1, 2]

      items = ids.map(id => {
        const header = document.createElement('dt')
        header.dataset.id = id
        header.textContent = `Header ${id}`
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
        return {id, header, content}
      })

      const id = ids.length
      const header = document.createElement('dt')
      header.dataset.id = id
      header.textContent = `Header ${id}`
      const content = document.createElement('dd')
      content.textContent = `Description ${id}`
      itemToAppend = {id, header, content}
    })

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

  describe('prependItem', () => {
    let ids
    let items
    let itemToPrepend

    beforeEach(() => {
      ids = [0, 1, 2]

      items = ids.map(id => {
        const header = document.createElement('dt')
        header.dataset.id = id
        header.textContent = `Header ${id}`
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
        return {id, header, content}
      })

      const id = ids.length
      const header = document.createElement('dt')
      header.dataset.id = id
      header.textContent = `Header ${id}`
      const content = document.createElement('dd')
      content.textContent = `Description ${id}`
      itemToPrepend = {id, header, content}
    })

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

  describe('appendBeforeItem', () => {
    let ids
    let items
    let itemToAppend
    let referenceId

    beforeEach(() => {
      ids = [0, 1, 2]

      items = ids.map(id => {
        const header = document.createElement('dt')
        header.dataset.id = id
        header.textContent = `Header ${id}`
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
        return {id, header, content}
      })

      const id = ids.length
      const header = document.createElement('dt')
      header.dataset.id = id
      header.textContent = `Header ${id}`
      const content = document.createElement('dd')
      content.textContent = `Description ${id}`
      itemToAppend = {id, header, content}

      referenceId = 1
    })

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

  describe('appendAfterItem', () => {
    let ids
    let items
    let itemToAppend
    let referenceId

    beforeEach(() => {
      ids = [0, 1, 2]

      items = ids.map(id => {
        const header = document.createElement('dt')
        header.dataset.id = id
        header.textContent = `Header ${id}`
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
        return {id, header, content}
      })

      const id = ids.length
      const header = document.createElement('dt')
      header.dataset.id = id
      header.textContent = `Header ${id}`
      const content = document.createElement('dd')
      content.textContent = `Description ${id}`
      itemToAppend = {id, header, content}

      referenceId = 1
    })

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

  describe('createItemsByRoot', () => {
    let ids
    let dlElem
    let items

    beforeEach(() => {
      ids = [0, 1, 2]

      dlElem = document.createElement('dl')
      items = ids.map(id => {
        const header = document.createElement('dt')
        header.dataset.id = id
        header.textContent = `Header ${id}`
        dlElem.appendChild(header)
        const content = document.createElement('dd')
        content.textContent = `Description ${id}`
        dlElem.appendChild(content)
        return {id, header, content}
      })
    })

    test('should create items by root element correctly', () => {
      const newItems = createItemsByRoot(dlElem)

      expect(Array.isArray(newItems)).toBeTruthy()
      expect(newItems).toHaveLength(items.length)
      expect(newItems).toEqual(items)
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

    test('should create item by entry correctly', () => {
      const newItem = createItemByEntry(entry)
      expect(newItem).toBeDefined()
      expect(newItem.id).toBe(id)
      expect(parseInt(newItem.header.dataset.id)).toBe(id)
      expect(newItem.header.textContent).toBe(header)
      expect(newItem.content.textContent).toBe(content)
    })

    test('should not have side effects in entry', () => {
      const clonedEntry = {...entry}
      createItemByEntry(entry)
      expect(clonedEntry).toEqual(entry)
    })
  })

  describe('createItemsByEntries', () => {
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
        header.dataset.id = id
        header.textContent = entry.header
        const content = document.createElement('dd')
        content.textContent = entry.content
        return {id, header, content}
      })
    })

    test('should create items by entries correctly', () => {
      const newItems = createItemsByEntries(entries)

      expect(Array.isArray(newItems)).toBeTruthy()
      expect(newItems).toHaveLength(items.length)
      expect(newItems).toEqual(items)
    })

    test('should not have side effects in entries', () => {
      const clonedEntries = [...entries]
      createItemsByEntries(entries)

      expect(clonedEntries.length).toBe(entries.length)
      expect(clonedEntries).toEqual(entries)
    })
  })

  describe('existsIdInItems', () => {
    let ids
    let entries
    let items
    let id

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
        header.dataset.id = id
        header.textContent = entry.header
        const content = document.createElement('dd')
        content.textContent = entry.content
        return {id, header, content}
      })

      id = 1
    })

    test('should exists id in items correctly', () => {
      const included = existsIdInItems(id, items)
      expect(included).toBeTruthy()
    })

    test('should not exists id in items correctly', () => {
      id = 123
      const included = existsIdInItems(id, items)
      expect(included).toBeFalsy()
    })
  })
})
