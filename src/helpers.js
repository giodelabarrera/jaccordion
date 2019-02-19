import {makeIsTagName} from './utils/dom'

const isDTTagName = makeIsTagName('dt')

export function getElementBySelector(selector) {
  // @TODO: validate only one element
  return document.querySelector(selector)
}

export function mergeOptions(defaults, settings) {
  // @TODO: protect and validate options
  const options = {...defaults, ...settings}
  return options
}

export function getItemsByRoot(dlElem, settings) {
  // @TODO: validate only DL element

  // @TODO: validate openAt with value and numeric
  const {openAt} = settings

  const children = Array.from(dlElem.children)
  const headers = children.filter(isDTTagName)

  return headers.map((header, currentIndex) => {
    const content = header.nextElementSibling
    const opened = openAt === currentIndex
    return {header, content, opened}
  })
}

export function getItemsByEntries(entries, settings) {
  // @TODO: validate openAt with value and numeric
  const {openAt} = settings

  return entries.map((entry, currentIndex) => {
    const header = document.createElement('dt')
    header.innerText = entry.header
    const content = document.createElement('dd')
    content.innerText = entry.content
    const opened = openAt === currentIndex
    return {header, content, opened}
  })
}

export function openItem(index, items) {
  return items.map((item, currentIndex) => {
    return currentIndex === index ? {...item, opened: true} : item
  })
}

export function closeItem(index, items) {
  return items.map((item, currentIndex) => {
    return currentIndex === index ? {...item, opened: false} : item
  })
}

export function closeItems(items) {
  return items.map(item => ({...item, opened: false}))
}
