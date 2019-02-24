import {makeIsTagName} from '../utils/dom'

const isDTTagName = makeIsTagName('dt')

let currentId = 0

export function createItem(item) {
  const {header, content} = item
  let id = item.id ? item.id : currentId++
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

export function getItemsByRoot(dlElem) {
  const children = Array.from(dlElem.children)
  const headers = children.filter(isDTTagName)
  return headers.map(header => {
    const content = header.nextElementSibling
    return createItem({header, content})
  })
}

export function createItemByEntry(entry) {
  let id
  if (entry.id) id = entry.id
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
