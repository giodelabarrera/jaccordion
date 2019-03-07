import defaults from '../../src/defaults'
import EventBinder from '../../src/event/event-binder'
import {
  addItem,
  removeItems,
  addItems,
  closeItems,
  isOpen,
  openItem,
  closeItem,
  appendItem,
  prependItem,
  removeItem,
  appendBeforeItem,
  appendAfterItem,
  bindClickItem,
  unbindClickItem
} from '../../src/view/item'

describe('item', () => {
  let classes
  let root
  let items

  beforeEach(() => {
    classes = defaults.classes
    const ids = [0, 1, 2]
    const entries = ids.map(id => ({
      id,
      header: `Header ${id}`,
      content: `Description ${id}`
    }))
    root = document.createElement('dl')
    items = entries.map(entry => {
      const {id} = entry
      const header = document.createElement('dt')
      header.textContent = entry.header
      const content = document.createElement('dd')
      content.textContent = entry.content
      return {id, header, content}
    })
  })

  describe('without items in root', () => {
    test('should add item to root correctly', () => {
      const item = items[0]
      addItem(item, root)

      const children = Array.from(root.children)

      expect(children[0]).toBeDefined()
      expect(children[0].tagName).toBe('DT')
      expect(children[0].textContent).toBe(item.header.textContent)
      expect(children[1]).toBeDefined()
      expect(children[1].tagName).toBe('DD')
      expect(children[1].textContent).toBe(item.content.textContent)
    })

    test('should add items to root correctly', () => {
      addItems(items, root)
      const headers = Array.from(root.children).filter(
        child => child.tagName === 'DT'
      )

      headers.forEach((header, currentIndex) => {
        expect(header).toBeDefined()
        expect(header.tagName).toBe('DT')
        expect(header.textContent).toBe(items[currentIndex].header.textContent)
        const content = header.nextElementSibling
        expect(content).toBeDefined()
        expect(content.tagName).toBe('DD')
        expect(content.textContent).toBe(
          items[currentIndex].content.textContent
        )
      })
    })

    test('should prepend item with empty root correctly', () => {
      const id = 3
      const header = document.createElement('dt')
      header.textContent = 'Header 3'
      const content = document.createElement('dd')
      content.textContent = 'Description 3'
      const item = {id, header, content}

      prependItem(item, root)
      const children = Array.from(root.children).slice(0, 2)

      expect(children[0]).toBeDefined()
      expect(children[0].tagName).toBe('DT')
      expect(children[0].textContent).toBe(item.header.textContent)
      expect(children[1]).toBeDefined()
      expect(children[1].tagName).toBe('DD')
      expect(children[1].textContent).toBe(item.content.textContent)
    })

    test('should append after item with empty root correctly', () => {
      const id = 3
      const header = document.createElement('dt')
      header.textContent = 'Header 3'
      const content = document.createElement('dd')
      content.textContent = 'Description 3'
      const item = {id, header, content}

      const referenceItem = items[1]
      appendAfterItem(item, referenceItem, root)

      const children = Array.from(root.children).slice(0, 2)

      expect(children[0]).toBeDefined()
      expect(children[0].tagName).toBe('DT')
      expect(children[0].textContent).toBe(item.header.textContent)
      expect(children[1]).toBeDefined()
      expect(children[1].tagName).toBe('DD')
      expect(children[1].textContent).toBe(item.content.textContent)
    })
  })

  describe('with items in root', () => {
    beforeEach(() => {
      items.forEach(({header, content}) => {
        root.appendChild(header)
        root.appendChild(content)
      })
    })

    test('should remove items of root correctly', () => {
      removeItems(root)
      expect(root.children).toHaveLength(0)
    })

    test('should close items correctly', () => {
      const item = items[0]
      item.header.classList.add(classes.opened)
      closeItems(items, classes)

      const someOpened = items.some(({header}) =>
        header.classList.contains(classes.opened)
      )

      expect(someOpened).toBeFalsy()
    })

    test('should returns if is open correctly', () => {
      const item = items[0]
      item.header.classList.add(classes.opened)
      expect(isOpen(item, classes)).toBeTruthy()
    })

    test('should open item correctly', () => {
      const item = items[0]
      openItem(item, classes)
      expect(item.header.classList.contains(classes.opened)).toBeTruthy()
    })

    test('should close item correctly', () => {
      const item = items[0]
      closeItem(item, classes)
      expect(item.header.classList.contains(classes.opened)).toBeFalsy()
    })

    test('should append item correctly', () => {
      const id = 3
      const header = document.createElement('dt')
      header.textContent = 'Header 3'
      const content = document.createElement('dd')
      content.textContent = 'Description 3'
      const item = {id, header, content}

      appendItem(item, root)
      const children = Array.from(root.children).slice(-2)

      expect(children[0]).toBeDefined()
      expect(children[0].tagName).toBe('DT')
      expect(children[0].textContent).toBe(item.header.textContent)
      expect(children[1]).toBeDefined()
      expect(children[1].tagName).toBe('DD')
      expect(children[1].textContent).toBe(item.content.textContent)
    })

    test('should prepend item correctly', () => {
      const id = 3
      const header = document.createElement('dt')
      header.textContent = 'Header 3'
      const content = document.createElement('dd')
      content.textContent = 'Description 3'
      const item = {id, header, content}

      prependItem(item, root)
      const children = Array.from(root.children).slice(0, 2)

      expect(children[0]).toBeDefined()
      expect(children[0].tagName).toBe('DT')
      expect(children[0].textContent).toBe(item.header.textContent)
      expect(children[1]).toBeDefined()
      expect(children[1].tagName).toBe('DD')
      expect(children[1].textContent).toBe(item.content.textContent)
    })

    test('should remove item correctly', () => {
      const item = items[1]
      removeItem(item, root)

      const children = Array.from(root.children)
      expect(children).toHaveLength(4)

      const headers = children.filter(child => child.tagName === 'DT')
      expect(
        headers.some(header => header.textContent === 'Header 1')
      ).toBeFalsy()
      const contents = children.filter(child => child.tagName === 'DD')
      expect(
        contents.some(content => content.textContent === 'Description 1')
      ).toBeFalsy()
    })

    test('should append before item correctly', () => {
      const id = 3
      const header = document.createElement('dt')
      header.textContent = 'Header 3'
      const content = document.createElement('dd')
      content.textContent = 'Description 3'
      const item = {id, header, content}

      const referenceItem = items[1]
      appendBeforeItem(item, referenceItem, root)

      const children = Array.from(root.children).slice(2, 4)

      expect(children[0]).toBeDefined()
      expect(children[0].tagName).toBe('DT')
      expect(children[0].textContent).toBe(item.header.textContent)
      expect(children[1]).toBeDefined()
      expect(children[1].tagName).toBe('DD')
      expect(children[1].textContent).toBe(item.content.textContent)
    })

    test('should append after item correctly', () => {
      const id = 3
      const header = document.createElement('dt')
      header.textContent = 'Header 3'
      const content = document.createElement('dd')
      content.textContent = 'Description 3'
      const item = {id, header, content}

      const referenceItem = items[1]
      appendAfterItem(item, referenceItem, root)

      const children = Array.from(root.children).slice(4, 6)

      expect(children[0]).toBeDefined()
      expect(children[0].tagName).toBe('DT')
      expect(children[0].textContent).toBe(item.header.textContent)
      expect(children[1]).toBeDefined()
      expect(children[1].tagName).toBe('DD')
      expect(children[1].textContent).toBe(item.content.textContent)
    })

    test('should bind click item correctly', () => {
      const item = items[0]
      const addEventListenerMock = jest.fn((event, handler) => undefined)
      item.header.addEventListener = addEventListenerMock

      const eventBinder = new EventBinder()
      const handler = jest.fn(() => {})
      bindClickItem(item, eventBinder, handler)

      expect(addEventListenerMock.mock.calls.length).toBe(1)
      expect(addEventListenerMock.mock.calls[0][0]).toBe('click')
      expect(addEventListenerMock.mock.calls[0][1]).toEqual(handler)
    })

    test('should unbind click item correctly', () => {
      const item = items[0]
      const removeEventListenerMock = jest.fn((event, handler) => undefined)
      item.header.removeEventListener = removeEventListenerMock

      const eventBinder = new EventBinder()
      const handler = jest.fn(() => {})
      bindClickItem(item, eventBinder, handler)
      unbindClickItem(item, eventBinder, handler)

      expect(removeEventListenerMock.mock.calls.length).toBe(1)
      expect(removeEventListenerMock.mock.calls[0][0]).toBe('click')
      expect(removeEventListenerMock.mock.calls[0][1]).toEqual(handler)
    })
  })
})
