import defaults from './defaults'
import Html from './components/html'
import Build from './components/build'
import Action from './components/action'

export default class Jaccordion {
  constructor(selector, options) {
    this.selector = selector
    this.settings = {...defaults, ...options}
    this.components = {}
  }

  mount() {
    const componentsToMount = {
      Html: Html,
      Build: Build,
      Action: Action
    }

    const components = {}
    for (let name in componentsToMount) {
      components[name] = componentsToMount[name](this, components)
    }

    for (let name in components) {
      components[name].mount()
    }

    this.components = components

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

  open(index) {
    this.components.Action.open(index)
  }

  close(index) {
    this.components.Action.close(index)
  }

  toggle(index) {
    this.components.Action.toggle(index)
  }

  on(event, handler) {
    return this
  }
}
