import {isTagName} from '../utils/dom'
import {isUndefined, isNumber, isArray} from '../utils/unit'
import {throwErrorRequired, throwErrorType} from '../utils/throw-error'
import {validateItem} from '../validator/item'

let currentId = 0

export function createItem(item) {
  if (isUndefined(item)) throwErrorRequired('item')
  const toCreate = true
  validateItem(item, toCreate)

  const {header, content} = item
  const id = item.id ? item.id : currentId++

  return {id, header, content}
}

export function removeItem(id, items) {
  if (isUndefined(id)) throwErrorRequired('id')
  if (isUndefined(items)) throwErrorRequired('items')

  if (!isNumber(id)) throwErrorType('id', 'number')
  if (!isArray(items)) throwErrorType('items', 'array')

  return items.filter(item => item.id !== id)
}

export function findItemById(id, items) {
  if (isUndefined(id)) throwErrorRequired('id')
  if (isUndefined(items)) throwErrorRequired('items')

  if (!isNumber(id)) throwErrorType('id', 'number')
  if (!isArray(items)) throwErrorType('items', 'array')

  return items.find(item => item.id === id)
}

export function addItem(item, items) {
  if (isUndefined(item)) throwErrorRequired('item')
  if (isUndefined(items)) throwErrorRequired('items')

  validateItem(item)
  if (!isArray(items)) throwErrorType('items', 'array')

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

export function getItemsByRoot(dlElem) {
  const children = Array.from(dlElem.children)
  const headers = children.filter(isTagName('dt'))
  return headers.map(header => {
    const content = header.nextElementSibling
    return createItem({header, content})
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

export function getItemsByEntries(entries) {
  return entries.map(createItemByEntry)
}

export async function getEntriesByAjax({url, processResults}) {
  const response = await fetch(url)
  const data = await response.json()
  return processResults(data)
}
