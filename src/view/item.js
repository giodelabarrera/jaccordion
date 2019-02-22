import {removeChildren} from '../utils/dom'

export function addItems(root, items) {
  items.forEach(item => {
    root.appendChild(item.header)
    root.appendChild(item.content)
  })
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
