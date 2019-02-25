import {removeChildren} from '../utils/dom'

export function addItem(item, root) {
  root.appendChild(item.header)
  root.appendChild(item.content)
}

export function addItems(items, root) {
  items.forEach(item => addItem(item, root))
}

export function removeItems(root) {
  removeChildren(root)
}

export function closeItems(items, classes) {
  const {opened} = classes
  items.forEach(({header}) => header.classList.remove(opened))
}

export function isOpen(item, classes) {
  const {opened} = classes
  return item.header.classList.contains(opened)
}

export function openItem(item, classes) {
  const {opened} = classes
  item.header.classList.add(opened)
}

export function closeItem(item, classes) {
  const {opened} = classes
  item.header.classList.remove(opened)
}

export function prependItem(item, root) {
  const firstHeader = root.children[0]
  if (firstHeader) {
    root.insertBefore(item.header, firstHeader)
    root.insertBefore(item.content, firstHeader)
  } else {
    addItem(item, root)
  }
}

export function removeItem(item) {
  const {header, content} = item
  header.remove()
  content.remove()
}

export function appendBeforeItem(item, referenceItem, root) {
  root.insertBefore(item.header, referenceItem.header)
  root.insertBefore(item.content, referenceItem.header)
}
