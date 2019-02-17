import {makeIsTagName} from './utils/dom'

const isDTTagName = makeIsTagName('dt')

const isDDTagName = makeIsTagName('dd')

export function htmlElements(selector) {
  const root = document.querySelector(selector)
  const children = Array.from(root.children)
  const headers = children.filter(isDTTagName)
  const contents = children.filter(isDDTagName)

  return {root, headers, contents}
}

export function openItem(index, items) {
  return items.map((item, currentIndex) => {
    return currentIndex === index ? {...item, isOpened: true} : item
  })
}

export function closeItem(index, items) {
  return items.map((item, currentIndex) => {
    return currentIndex === index ? {...item, isOpened: false} : item
  })
}

export function createItems({root, headers, contents}) {
  const items = headers.map((header, currentIndex) => {
    const content = contents[currentIndex]
    return {header, content, isOpened: false}
  })
  return items
}
