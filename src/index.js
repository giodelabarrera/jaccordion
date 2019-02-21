import defaults from './defaults'
import {getElementBySelector} from './core/dom'
import {mergeOptions} from './core/object'
import {getItemsByEntries, getItemsByRoot} from './core/item'
import EventBinder from './event/binder'
import * as itemView from './view/item'
import * as buildView from './view/build'

export default class Jaccordion {
  constructor(selector, options = {}) {
    this.root = getElementBySelector(selector)
    this.settings = mergeOptions(defaults, options)
    this.enabled = false
    this.items = []
    this.event = new EventBinder()
  }

  mount() {
    const {openAt, entries, classes} = this.settings

    let currentItems = []
    if (entries && entries.length > 0) {
      currentItems = getItemsByEntries(entries)
      itemView.removeItems(this.root)
      itemView.addItems(this.root, currentItems)
    } else {
      currentItems = getItemsByRoot(this.root)
    }
    this.items = currentItems

    buildView.addClasses({root: this.root, items: this.items, openAt, classes})
    this._bind()

    this.enabled = true
  }

  update(options = {}) {
    const {classes} = this.settings

    buildView.removeClasses({root: this.root, items: this.items, classes})
    this._unbind()

    this.settings = mergeOptions(this.settings, options)
    this.mount()
  }

  destroy() {
    const {classes} = this.settings

    buildView.removeClasses({root: this.root, items: this.items, classes})
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
    return itemView.isOpen(index, this.items, classes.opened)
  }

  open(index) {
    if (this.enabled) {
      const {classes} = this.settings
      itemView.openItem(index, this.items, classes.opened)
    }

    return this
  }

  close(index) {
    if (this.enabled) {
      const {classes} = this.settings
      itemView.closeItem(index, this.items, classes.opened)
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
}
