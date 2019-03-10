import defaults from '../../src/defaults'
import EventBinder from '../../src/event/event-binder'
import * as view from '../../src/core/view'

describe('view', () => {
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
      view.addItem(item, root)

      const children = Array.from(root.children)

      expect(children[0]).toBeDefined()
      expect(children[0].tagName).toBe('DT')
      expect(children[0].textContent).toBe(item.header.textContent)
      expect(children[1]).toBeDefined()
      expect(children[1].tagName).toBe('DD')
      expect(children[1].textContent).toBe(item.content.textContent)
    })

    test('should add items to root correctly', () => {
      view.addItems(items, root)
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

      view.prependItem(item, root)
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
      view.appendAfterItem(item, referenceItem, root)

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

    test('should add class to root element correctly', () => {
      view.addClassRoot(root, classes)
      expect(root.classList.contains(classes.root)).toBeTruthy()
    })

    test('should remove class of root element correctly', () => {
      view.removeClassRoot(root, classes)
      expect(root.classList.contains(classes.root)).toBeFalsy()
    })

    test('should add class to item element correctly', () => {
      const item = items[0]
      view.addClassItem(item, classes)
      const {header, content} = item
      expect(header.classList.contains(classes.header)).toBeTruthy()
      expect(content.classList.contains(classes.content)).toBeTruthy()
    })

    test('should remove class of item element correctly', () => {
      const item = items[0]
      view.removeClassItem(item, classes)
      const {header, content} = item
      expect(header.classList.contains(classes.header)).toBeFalsy()
      expect(content.classList.contains(classes.content)).toBeFalsy()
    })

    test('should remove items of root correctly', () => {
      view.removeItems(root)
      expect(root.children).toHaveLength(0)
    })

    test('should close items correctly', () => {
      const item = items[0]
      item.header.classList.add(classes.opened)
      view.closeItems(items, classes)

      const someOpened = items.some(({header}) =>
        header.classList.contains(classes.opened)
      )

      expect(someOpened).toBeFalsy()
    })

    test('should returns if is open correctly', () => {
      const item = items[0]
      item.header.classList.add(classes.opened)
      expect(view.isOpen(item, classes)).toBeTruthy()
    })

    test('should open item correctly', () => {
      const item = items[0]
      view.openItem(item, classes)
      expect(item.header.classList.contains(classes.opened)).toBeTruthy()
    })

    test('should close item correctly', () => {
      const item = items[0]
      view.closeItem(item, classes)
      expect(item.header.classList.contains(classes.opened)).toBeFalsy()
    })

    test('should append item correctly', () => {
      const id = 3
      const header = document.createElement('dt')
      header.textContent = 'Header 3'
      const content = document.createElement('dd')
      content.textContent = 'Description 3'
      const item = {id, header, content}

      view.appendItem(item, root)
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

      view.prependItem(item, root)
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
      view.removeItem(item, root)

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
      view.appendBeforeItem(item, referenceItem, root)

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
      view.appendAfterItem(item, referenceItem, root)

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
      view.bindClickItem(item, eventBinder, handler)

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
      view.bindClickItem(item, eventBinder, handler)
      view.unbindClickItem(item, eventBinder, handler)

      expect(removeEventListenerMock.mock.calls.length).toBe(1)
      expect(removeEventListenerMock.mock.calls[0][0]).toBe('click')
      expect(removeEventListenerMock.mock.calls[0][1]).toEqual(handler)
    })
  })
})
