import {makeIsTagName} from './utils/dom'
import defaults from './defaults'
import Items from './components/items'

const isDTTagName = makeIsTagName('dt')

export default class Jaccordion {
  constructor(selector, options) {
    this.selector = selector
    this.settings = {...defaults, ...options}
    this.components = []

    this.items = []
  }

  mount() {
    const componentsToMount = [Items]

    this.components = componentsToMount.map(componentToMount =>
      componentToMount(this)
    )

    this.components.forEach(component => component.mount())

    // const children = Array.from(this.element.children)

    // this.items = children.filter(isDTTagName).map(header => {
    //   const content = header.nextElementSibling
    //   return new Item({header, content})
    // })

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
