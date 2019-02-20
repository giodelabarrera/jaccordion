import {makeIsTagName} from '../utils/dom'

const isDTTagName = makeIsTagName('dt')

export function getItemsByRoot(dlElem) {
  const children = Array.from(dlElem.children)
  const headers = children.filter(isDTTagName)
  return headers.map(header => {
    const content = header.nextElementSibling
    return {header, content}
  })
}

export function getItemsByEntries(entries) {
  return entries.map(entry => {
    const header = document.createElement('dt')
    header.innerText = entry.header
    const content = document.createElement('dd')
    content.innerText = entry.content
    return {header, content}
  })
}
