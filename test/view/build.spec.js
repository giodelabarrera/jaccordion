import defaults from '../../src/defaults'
import {
  addClassRoot,
  addClassItem,
  addClasses,
  removeClasses
} from '../../src/view/build'

describe('build', () => {
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
    items.forEach(({header, content}) => {
      root.appendChild(header)
      root.appendChild(content)
    })
  })

  test('should add class to root element correctly', () => {
    addClassRoot(root, classes)
    expect(root.classList.contains(classes.root)).toBeTruthy()
  })

  test('should add class to item element correctly', () => {
    const item = items[0]
    addClassItem(item, classes)
    const {header, content} = item
    expect(header.classList.contains(classes.header)).toBeTruthy()
    expect(content.classList.contains(classes.content)).toBeTruthy()
  })

  test('should add classes correctly', () => {
    const {openAt} = defaults
    addClasses({root, items, openAt, classes})

    expect(root.classList.contains(classes.root))
    items.forEach(({header, content}) => {
      expect(header.classList.contains(classes.header)).toBeTruthy()
      expect(content.classList.contains(classes.content)).toBeTruthy()
    })
  })

  test('should remove classes correctly', () => {
    const {openAt} = defaults
    addClasses({root, items, openAt, classes})
    removeClasses({root, items, openAt, classes})

    expect(root.classList.contains(classes.root)).toBeFalsy()
    items.forEach(({header, content}) => {
      expect(header.classList.contains(classes.header)).toBeFalsy()
      expect(content.classList.contains(classes.content)).toBeFalsy()
    })
  })
})
