import defaults from './defaults'
import {
  htmlElements,
  createItems,
  openItem,
  closeItem
} from './helper'

export default class Jaccordion {
  constructor(selector, options) {
    this.selector = selector
    this.settings = {...defaults, ...options}
  }

  mount() {
    this.html = htmlElements(this.selector)

    this.items = createItems(this.html)

    this.items.forEach(({header}, currentIndex) => {
      header.addEventListener('click', event => {
        this.toggle(currentIndex)
      })
    })
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

  toggle(index) {
    this.items[index].isOpened ? this.close(index) : this.open(index)
    return this
  }

  open(index) {
    this.items = openItem(index, this.items)
    this.items[index].header.classList.add(this.settings.classes.isOpened)
    return this
  }

  close(index) {
    this.items = closeItem(index, this.items)
    this.items[index].header.classList.remove(this.settings.classes.isOpened)
    return this
  }

  on(event, handler) {
    return this
  }
}
