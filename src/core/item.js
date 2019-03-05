import {isTagName, isHTMLElement} from '../utils/dom'
import {
  isUndefined,
  isNumber,
  isArray,
  isString,
  isFunction
} from '../utils/unit'
import {throwErrorRequired, throwErrorType} from '../utils/throw-error'
import {validateItem} from '../validator/item'

let currentId = 0

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

  if (isUndefined(entry.id)) throwErrorRequired('id')
  if (isUndefined(entry.header)) throwErrorRequired('header')
  if (isUndefined(entry.content)) throwErrorRequired('content')

  if (!isNumber(entry.id)) throwErrorType('id', 'number')
  if (!isString(entry.header)) throwErrorType('header', 'string')
  if (!isString(entry.content)) throwErrorType('content', 'string')

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

  return entries.map(createItemByEntry)
}

export async function getEntriesByAjax(ajax) {
  if (isUndefined(ajax)) throwErrorRequired('ajax')

  const {url, processResults} = ajax

  if (isUndefined(url)) throwErrorRequired('url')
  if (isUndefined(processResults)) throwErrorRequired('processResults')

  if (!isString(url)) throwErrorType('url', 'string')
  if (!isFunction(processResults)) throwErrorType('processResults', 'function')

  const response = await fetch(url)
  const data = await response.json()

  const entries = processResults(data)

  if (isUndefined(entries)) throwErrorRequired('entries')
  if (!isArray(entries)) throwErrorType('entries', 'array')

  entries.forEach(entry => {
    if (isUndefined(entry.id)) throwErrorRequired('id')
    if (isUndefined(entry.header)) throwErrorRequired('header')
    if (isUndefined(entry.content)) throwErrorRequired('content')

    if (!isNumber(entry.id)) throwErrorType('id', 'number')
    if (!isString(entry.header)) throwErrorType('header', 'string')
    if (!isString(entry.content)) throwErrorType('content', 'string')
  })

  return entries
}
