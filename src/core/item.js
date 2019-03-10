import {isTagName} from '../utils/dom'

export function createItem(item) {
  const {id, header, content} = item
  header.dataset.id = id
  return {id, header, content}
}

export function removeItem(id, items) {
  return items.filter(item => item.id !== id)
}

export function findItemById(id, items) {
  return items.find(item => item.id === id)
}

export function addItem(item, items) {
  return [...items, item]
}

export function appendItem(item, items) {
  return addItem(item, items)
}

export function prependItem(item, items) {
  return [item, ...items]
}

export function appendBeforeItem(item, referenceId, items) {
  const index = items.findIndex(item => item.id === referenceId)
  return [...items.slice(0, index), item, ...items.slice(index)]
}

export function appendAfterItem(item, referenceId, items) {
  const index = items.findIndex(item => item.id === referenceId)
  return [...items.slice(0, index + 1), item, ...items.slice(index + 1)]
}

export function createItemsByRoot(dlElem) {
  const children = Array.from(dlElem.children)
  const headers = children.filter(isTagName('dt'))
  return headers.map((header, index) => {
    const content = header.nextElementSibling
    return createItem({id: index, header, content})
  })
}

export function createItemByEntry(entry) {
  const {id} = entry
  const header = document.createElement('dt')
  header.innerHTML = entry.header
  const content = document.createElement('dd')
  content.innerHTML = entry.content
  return createItem({id, header, content})
}

export function createItemsByEntries(entries) {
  return entries.map(createItemByEntry)
}

export function existsIdInItems(id, items) {
  return items.map(({id}) => id).includes(id)
}
