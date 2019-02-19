import defaults from './defaults'
import {
  getElementBySelector,
  mergeOptions,
  getItemsByEntries,
  getItemsByRoot
} from './core'
import EventsBinder from './core/events-binder'
import {removeChildren} from './utils/dom'

export default class Jaccordion {
  constructor(selector, options) {
    this.root = getElementBySelector(selector)
    this.settings = mergeOptions(defaults, options)
    this.enabled = false
    this.items = []
    this.event = new EventsBinder()
  }

  mount() {
    const {entries} = this.settings

    let items = []
    if (entries && entries.length > 0) {
      items = getItemsByEntries(entries)
      removeChildren(this.root)
      items.forEach(item => {
        this.root.appendChild(item.header)
        this.root.appendChild(item.content)
      })
    } else {
      items = getItemsByRoot(this.root)
    }
    this.items = items

    this._addClasses()
    this._bind()

    this.enabled = true
  }

  update(options) {
    this._removeClasses()
    this._unbind()

    this.settings = mergeOptions(this.settings, options)
    this.mount()
  }

  destroy() {
    this._removeClasses()
    this._unbind()

    delete this.root
    delete this.settings
    delete this.enabled
    delete this.items
    delete this.event
  }

  disable() {
    this.enabled = false
    return this
  }

  enable() {
    this.enabled = true
    return this
  }

  toggle(index) {
    if (this.enabled) {
      this.isOpen(index) ? this.close(index) : this.open(index)
    }
    return this
  }

  isOpen(index) {
    const {classes} = this.settings
    return this.items[index].header.classList.contains(classes.opened)
  }

  open(index) {
    if (this.enabled) {
      const {classes} = this.settings
      this.items.forEach(({header}) => header.classList.remove(classes.opened))
      this.items[index].header.classList.add(classes.opened)
    }

    return this
  }

  close(index) {
    if (this.enabled) {
      const {classes} = this.settings
      this.items[index].header.classList.remove(classes.opened)
    }

    return this
  }

  on(event, handler) {}

  _bind() {
    this.items.forEach(({header}, currentIndex) => {
      this.event.on('click', header, () => this.toggle(currentIndex))
    })
  }

  _unbind() {
    this.items.forEach(({header}) => this.event.off('click', header))
  }

  _addClasses() {
    const {classes, openAt} = this.settings

    this.root.classList.add(classes.root)
    this.items.forEach(({header, content}, currentIndex) => {
      header.classList.add(classes.header)
      if (openAt === currentIndex) {
        header.classList.add(classes.opened)
      }
      content.classList.add(classes.content)
    })
  }

  _removeClasses() {
    const {classes} = this.settings

    this.root.classList.remove(classes.root)
    this.items.forEach(({header, content}) => {
      header.classList.remove(classes.header, classes.opened)
      content.classList.remove(classes.content)
    })
  }
}
