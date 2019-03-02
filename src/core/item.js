import {isTagName} from '../utils/dom'
import {isUndefined, isNumber, isHTMLElement} from '../utils/unit'
import {
  throwErrorRequired,
  throwErrorType,
  throwErrorTagName
} from '../utils/throw-error'

let currentId = 0

export function createItem(item) {
  const {header, content} = item

  if (isUndefined(header)) throwErrorRequired('header')
  if (isUndefined(content)) throwErrorRequired('content')

  if (item.id && !isNumber(item.id)) throwErrorType('id', 'number')

  if (!isHTMLElement(header)) throwErrorType('header', 'HTMLElement')
  else if (!isTagName('dt')(header)) throwErrorTagName('header', 'dt')

  if (!isHTMLElement(content)) throwErrorType('content', 'HTMLElement')
  else if (!isTagName('dd')(content)) throwErrorTagName('content', 'dd')

  const id = item.id ? item.id : currentId++

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
