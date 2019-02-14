import {makeIsTagName} from './utils/dom'
import Item from './item'
import defaults from './defaults'

const isDTTagName = makeIsTagName('dt')

export default class Jaccordion {
  constructor(element, options) {
    this.element = element
    this.settings = {...defaults, ...options}
    this.items = []
  }

  mount() {
    const children = Array.from(this.element.children)

    this.items = children.filter(isDTTagName).map(header => {
      const content = header.nextElementSibling
      return new Item({header, content})
    })

    return this
  }

  update(settings) {
    return this
  }

  destroy() {
    return this
  }

  disable() {
    return this
  }

  enable() {
    return this
  }

  on(event, handler) {
    return this
  }
}
