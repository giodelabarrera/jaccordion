import defaults from './defaults'
import {getElementBySelector} from './core/dom'
import {mergeOptions} from './core/object'
import {getItemsByEntries, getItemsByRoot, getEntriesByAjax} from './core/item'
import EventBinder from './event/event-binder'
import EventBus from './event/event-bus'
import * as itemView from './view/item'
import * as buildView from './view/build'

export default class Jaccordion {
  constructor(selector, options = {}) {
    this.root = getElementBySelector(selector)
    this.settings = mergeOptions(defaults, options)
    this.enabled = false
    this.items = []
    this.eventBinders = []
    this.eventBus = new EventBus()
  }

  async mount() {
    this.eventBus.emit('mount.before')

    const {openAt, ajax, classes} = this.settings
    let entries = this.settings.entries

    let currentItems = getItemsByRoot(this.root)
    if (ajax.url) {
      const entriesByAjax = await getEntriesByAjax(ajax)
      entries = [...entries, ...entriesByAjax]
    }
    if (entries && entries.length > 0) {
      const itemsByEntries = getItemsByEntries(entries)
      itemView.addItems(this.root, itemsByEntries)
      currentItems = [...currentItems, ...itemsByEntries]
    }
    this.items = currentItems

    buildView.addClasses({root: this.root, items: this.items, openAt, classes})
    this._bind()

    this.enabled = true

    this.eventBus.emit('mount.after')

    return this
  }

  destroy() {
    const {classes} = this.settings

    buildView.removeClasses({root: this.root, items: this.items, classes})
    this._unbind()

    delete this.root
    delete this.settings
    delete this.enabled
    delete this.items
    delete this.eventBinder

    this.eventBus.emit('destroy')
    delete this.eventBus
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
    return itemView.isOpen(this.items[index], classes)
  }

  open(index) {
    if (this.enabled) {
      const item = this.items[index]

      this.eventBus.emit('open.before', {index, item})

      const {classes} = this.settings
      itemView.closeItems(this.items, classes)
      itemView.openItem(item, classes)

      this.eventBus.emit('open.after', {index, item})
    }

    return this
  }

  close(index) {
    if (this.enabled) {
      const item = this.items[index]

      this.eventBus.emit('close.before', {index, item})

      const {classes} = this.settings
      itemView.closeItem(item, classes)

      this.eventBus.emit('close.after', {index, item})
    }

    return this
  }

  on(event, handler) {
    this.eventBus.on(event, handler)

    return this
  }

  _bind() {
    this.items.forEach(({header}, index) => {
      this.eventBinders[index] = new EventBinder()
      this.eventBinders[index].on('click', header, () => this.toggle(index))
    })
  }

  _unbind() {
    this.items.forEach(({header}, index) =>
      this.eventBinders[index].off('click', header)
    )
    this.eventBinders = []
  }
}
