import defaults from './defaults'
import Html from './components/html'

export default class Jaccordion {
  constructor(selector, options) {
    this.selector = selector
    this.settings = {...defaults, ...options}
    this.components = []

    this.items = []
  }

  mount() {
    const componentsToMount = [Html]

    this.components = componentsToMount.map(component => component(this))

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
