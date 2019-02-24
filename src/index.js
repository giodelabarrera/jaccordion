import defaults from './defaults'
import {getElementBySelector} from './core/dom'
import {mergeOptions} from './core/object'
import {
  getItemsByEntries,
  getItemsByRoot,
  getEntriesByAjax,
  findItemById,
  removeItem,
  createItem,
  addItem
} from './core/item'
import EventBus from './event/event-bus'
import {bindHandlerClickItem} from './view/event'
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
      itemView.addItems(itemsByEntries, this.root)
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
    delete this.eventBinders

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

  toggle(id) {
    if (this.enabled) {
      this.isOpen(id) ? this.close(id) : this.open(id)
    }
    return this
  }

  isOpen(id) {
    const {classes} = this.settings
    const item = findItemById(id, this.items)
    return itemView.isOpen(item, classes)
  }

  open(id) {
    if (this.enabled) {
      const item = findItemById(id, this.items)

      this.eventBus.emit('open.before', item)

      const {classes} = this.settings
      itemView.closeItems(this.items, classes)
      itemView.openItem(item, classes)

      this.eventBus.emit('open.after', item)
    }

    return this
  }

  close(id) {
    if (this.enabled) {
      const item = findItemById(id, this.items)

      this.eventBus.emit('close.before', item)

      const {classes} = this.settings
      itemView.closeItem(item, classes)

      this.eventBus.emit('close.after', item)
    }

    return this
  }

  append(item) {
    const newItem = createItem(item)
    this.items = addItem(newItem, this.items)

    itemView.addItem(newItem, this.root)
    const {classes} = this.settings
    buildView.addClassItem(newItem, classes)
    const {id} = newItem
    this.eventBinders[id] = bindHandlerClickItem(newItem, () => this.toggle(id))

    this.eventBus.emit('append', newItem)

    return this
  }

  prepend(item) {
    const newItem = createItem(item)
    this.items = addItem(newItem, this.items)

    itemView.prependItem(newItem, this.root)
    const {classes} = this.settings
    buildView.addClassItem(newItem, classes)
    const {id} = newItem
    this.eventBinders[id] = bindHandlerClickItem(newItem, () => this.toggle(id))

    this.eventBus.emit('prepend', newItem)

    return this
  }

  remove(id) {
    const item = findItemById(id, this.items)

    this.eventBus.emit('remove.before', item)

    this.items = removeItem(id, this.items)
    const {header} = item
    this.eventBinders[id].off('click', header)
    itemView.removeItem(item)

    this.eventBus.emit('remove.after', id)
  }

  on(event, handler) {
    this.eventBus.on(event, handler)

    return this
  }

  _bind() {
    this.items.forEach(item => {
      const {id} = item
      this.eventBinders[id] = bindHandlerClickItem(item, () => this.toggle(id))
    })
  }

  _unbind() {
    this.items.forEach(({id, header}) =>
      this.eventBinders[id].off('click', header)
    )
    this.eventBinders = []
  }
}
