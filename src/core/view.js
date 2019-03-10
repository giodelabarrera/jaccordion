import {removeChildren} from '../utils/dom'

export function addClassRoot(root, classes) {
  root.classList.add(classes.root)
}

export function removeClassRoot(root, classes) {
  root.classList.remove(classes.root)
}

export function addClassItem(item, classes) {
  const {header, content} = item
  header.classList.add(classes.header)
  content.classList.add(classes.content)
}

export function removeClassItem(item, classes) {
  const {header, content} = item
  header.classList.remove(classes.header, classes.opened)
  content.classList.remove(classes.content)
}

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

export function appendItem(item, root) {
  addItem(item, root)
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

export function appendAfterItem(item, referenceItem, root) {
  const nextHeader = referenceItem.content.nextElementSibling
  if (nextHeader) {
    root.insertBefore(item.header, nextHeader)
    root.insertBefore(item.content, nextHeader)
  } else {
    appendItem(item, root)
  }
}

export function bindClickItem(item, eventBinder, handler) {
  const {header} = item
  eventBinder.on('click', header, handler)
}

export function unbindClickItem(item, eventBinder) {
  const {header} = item
  eventBinder.off('click', header)
}
