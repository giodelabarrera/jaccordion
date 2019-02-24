import {makeIsTagName} from '../utils/dom'

const isDTTagName = makeIsTagName('dt')

export function createItem({id, header, content}) {
  return {id, header, content}
}

export function getItemsByRoot(dlElem) {
  const children = Array.from(dlElem.children)
  const headers = children.filter(isDTTagName)
  return headers.map((header, currentIndex) => {
    const content = header.nextElementSibling
    return createItem({id: currentIndex, header, content})
  })
}

export function getItemsByEntries(entries) {
  return entries.map(entry => {
    const header = document.createElement('dt')
    header.innerHTML = entry.header
    const content = document.createElement('dd')
    content.innerHTML = entry.content
    return createItem({id: entry.id, header, content})
  })
}

export async function getEntriesByAjax({url, processResults}) {
  const response = await fetch(url)
  const data = await response.json()
  return processResults(data)
}
