import {makeIsTagElementName} from './utils/dom'
import Item from './Item'

const isDTElement = makeIsTagElementName('dt')

export default class Accordion {
  constructor(element) {
    this.element = element
    this.items = []

    this.init()
  }

  init() {
    const children = Array.from(this.element.children)

    this.items = children.filter(isDTElement).map(header => {
      const content = header.nextElementSibling
      return new Item({header, content})
    })
  }
}
