import {isTagName, isHTMLElement} from '../utils/dom'
import {isUndefined, isNumber, isArray} from '../utils/unit'
import {
  throwErrorRequired,
  throwErrorType,
  throwErrorTagName
} from '../utils/throw-error'
import {validateEntry} from './entry'

let currentId = 0

export function validateItem({id, header, content}, toCreate = false) {
  if (isUndefined(header)) throwErrorRequired('header')
  if (isUndefined(content)) throwErrorRequired('content')

  if (toCreate) {
    if (id && !isNumber(id)) throwErrorType('id', 'number')
  } else {
    if (isUndefined(id)) throwErrorRequired('id')
    if (!isNumber(id)) throwErrorType('id', 'number')
  }

  if (!isHTMLElement()(header)) throwErrorType('header', 'HTMLElement')
  else if (!isTagName('dt')(header)) throwErrorTagName('header', 'dt')

  if (!isHTMLElement()(content)) throwErrorType('content', 'HTMLElement')
  else if (!isTagName('dd')(content)) throwErrorTagName('content', 'dd')
}

export function createItem(item) {
  if (isUndefined(item)) throwErrorRequired('item')
  const toCreate = true
  validateItem(item, toCreate)

  const {header, content} = item
  const id = isUndefined(item.id) ? currentId++ : item.id

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
  if (isUndefined(item)) throwErrorRequired('item')
  if (isUndefined(items)) throwErrorRequired('items')

  validateItem(item)
  if (!isArray(items)) throwErrorType('items', 'array')

  return [item, ...items]
}

export function appendBeforeItem(item, referenceId, items) {
  if (isUndefined(item)) throwErrorRequired('item')
  if (isUndefined(referenceId)) throwErrorRequired('referenceId')
  if (isUndefined(items)) throwErrorRequired('items')

  validateItem(item)
  if (!isNumber(referenceId)) throwErrorType('referenceId', 'number')
  if (!isArray(items)) throwErrorType('items', 'array')

  const index = items.findIndex(item => item.id === referenceId)
  return [...items.slice(0, index), item, ...items.slice(index)]
}

export function appendAfterItem(item, referenceId, items) {
  if (isUndefined(item)) throwErrorRequired('item')
  if (isUndefined(referenceId)) throwErrorRequired('referenceId')
  if (isUndefined(items)) throwErrorRequired('items')

  validateItem(item)
  if (!isNumber(referenceId)) throwErrorType('referenceId', 'number')
  if (!isArray(items)) throwErrorType('items', 'array')

  const index = items.findIndex(item => item.id === referenceId)
  return [...items.slice(0, index + 1), item, ...items.slice(index + 1)]
}

export function getItemsByRoot(dlElem) {
  if (isUndefined(dlElem)) throwErrorRequired('dlElem')

  if (!isHTMLElement(HTMLDListElement)(dlElem))
    throwErrorType('dlElem', 'HTMLDListElement')

  const children = Array.from(dlElem.children)
  const headers = children.filter(isTagName('dt'))
  return headers.map(header => {
    const content = header.nextElementSibling
    return createItem({header, content})
  })
}

export function createItemByEntry(entry) {
  if (isUndefined(entry)) throwErrorRequired('entry')
  validateEntry(entry)

  const {id} = entry
  const header = document.createElement('dt')
  header.innerHTML = entry.header
  const content = document.createElement('dd')
  content.innerHTML = entry.content
  return createItem({id, header, content})
}

export function getItemsByEntries(entries) {
  if (isUndefined(entries)) throwErrorRequired('entries')
  if (!isArray(entries)) throwErrorType('entries', 'array')
  entries.forEach(validateEntry)

  return entries.map(createItemByEntry)
}
