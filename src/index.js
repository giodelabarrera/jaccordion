import {makeIsTagName} from './utils/dom'
import Item from './Item'

const isDTTagName = makeIsTagName('dt')

export default class Jaccordion {
  constructor(element) {
    this.element = element

    this.items = []
  }

  mount() {
    const children = Array.from(this.element.children)

    this.items = children.filter(isDTTagName).map(header => {
      const content = header.nextElementSibling
      return new Item({header, content})
    })
  }

  update(settings) {}

  destroy() {}

  disable() {}

  enable() {}

  on(event, handler) {}
}
