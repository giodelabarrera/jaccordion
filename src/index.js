import defaults from './defaults'
import {
  getItemsByEntries,
  getItemsByRoot,
  findItemById,
  removeItem,
  appendBeforeItem,
  appendAfterItem,
  appendItem,
  prependItem
} from './core/item'
import EventBinder from './event/event-binder'
import EventBus from './event/event-bus'
import * as buildView from './view/build'
import * as itemView from './view/item'
import {getEntriesByAjax} from './core/entry'
import {
  validateElement,
  validateOptions,
  validateItem,
  validateIdInItems,
  validateEntriesIdInItems,
  validateEntriesId
} from './core/validator'
import {throwErrorRequired, throwErrorType} from './utils/throw-error'
import {isUndefined, isString, isFunction} from './utils/unit'

export default class Jaccordion {
  constructor(element, options = {}) {
    validateElement(element)
    validateOptions(options)

    const {entries} = options
    if (entries && entries.length > 0) validateEntriesId(entries)

    this._eventBinders = []
    this._eventBus = new EventBus()
    this._settings = {...defaults, ...options}
    this.root = element
    this.items = []
    this.enabled = false
  }

  async mount() {
    this._eventBus.emit('mount.before')

    const {classes, entries, ajax} = this._settings
    buildView.addClassRoot(this.root, classes)
    this._mountMarkup()
    if (entries && entries.length > 0) this._mountEntries()
    if (ajax.url) await this._mountAjaxEntries()
    this.enabled = true

    this._eventBus.emit('mount.after')

    return this
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
    const {classes} = this._settings
    const item = findItemById(id, this.items)
    return itemView.isOpen(item, classes)
  }

  open(id) {
    if (this.enabled) {
      const item = findItemById(id, this.items)

      this._eventBus.emit('open.before', item)

      const {multiple, classes} = this._settings
      if (multiple === false) itemView.closeItems(this.items, classes)
      itemView.openItem(item, classes)

      this._eventBus.emit('open.after', item)
    }

    return this
  }

  close(id) {
    if (this.enabled) {
      const item = findItemById(id, this.items)

      this._eventBus.emit('close.before', item)

      const {classes} = this._settings
      itemView.closeItem(item, classes)

      this._eventBus.emit('close.after', item)
    }

    return this
  }

  append(item) {
    validateItem(item)
    validateIdInItems(item.id, this.items)

    this.items = appendItem(item, this.items)
    itemView.appendItem(item, this.root)
    this._mountItem(item)

    this._eventBus.emit('append', item)

    return this
  }

  prepend(item) {
    validateItem(item)
    validateIdInItems(item.id, this.items)

    this.items = prependItem(item, this.items)
    itemView.prependItem(item, this.root)
    this._mountItem(item)

    this._eventBus.emit('prepend', item)

    return this
  }

  appendBefore(item, referenceId) {
    validateItem(item)
    validateIdInItems(item.id, this.items)

    const referenceItem = findItemById(referenceId, this.items)

    this.items = appendBeforeItem(item, referenceItem.id, this.items)
    itemView.appendBeforeItem(item, referenceItem, this.root)
    this._mountItem(item)

    this._eventBus.emit('appendBefore', item)

    return this
  }

  appendAfter(item, referenceId) {
    validateItem(item)
    validateIdInItems(item.id, this.items)

    const referenceItem = findItemById(referenceId, this.items)

    this.items = appendAfterItem(item, referenceItem.id, this.items)
    itemView.appendAfterItem(item, referenceItem, this.root)
    this._mountItem(item)

    this._eventBus.emit('appendAfter', item)

    return this
  }

  remove(id) {
    const item = findItemById(id, this.items)

    this._eventBus.emit('remove.before', item)

    this.items = removeItem(id, this.items)
    const {header} = item
    this._eventBinders[id].off('click', header)
    itemView.removeItem(item)

    this._eventBus.emit('remove.after', id)
  }

  on(event, handler) {
    if (isUndefined(event)) throwErrorRequired('event')
    if (isUndefined(handler)) throwErrorRequired('handler')

    if (!isString(event)) throwErrorType('event', 'string')
    if (!isFunction(handler)) throwErrorType('handler', 'function')

    this._eventBus.on(event, handler)

    return this
  }

  unmount() {
    const {classes} = this._settings

    buildView.removeClassRoot(this.root, classes)
    this.items.forEach(this._unmountItem.bind(this))
  }

  destroy() {
    this.unmount()

    delete this.root
    delete this._settings
    delete this.enabled
    delete this.items
    delete this._eventBinders

    this._eventBus.emit('destroy')
    delete this._eventBus
  }

  _mountItem(item) {
    const {openAt, classes} = this._settings
    const {id} = item
    buildView.addClassItem(item, classes)
    this._eventBinders[id] = new EventBinder()
    itemView.bindClickItem(item, this._eventBinders[id], () => this.toggle(id))
    if (openAt === id) this.open(id)
  }

  _mountMarkup() {
    const items = getItemsByRoot(this.root)
    this.items = [...items]
    items.forEach(this._mountItem.bind(this))
  }

  _mountEntries() {
    const {entries} = this._settings

    validateEntriesIdInItems(entries, this.items)

    const itemsByEntries = getItemsByEntries(entries)
    this.items = [...this.items, ...itemsByEntries]
    itemView.addItems(itemsByEntries, this.root)
    itemsByEntries.forEach(this._mountItem.bind(this))
  }

  async _mountAjaxEntries() {
    const {ajax} = this._settings

    this._eventBus.emit('ajaxEntries.before')
    const entriesByAjax = await getEntriesByAjax(ajax)
    this._eventBus.emit('ajaxEntries.success')

    if (entriesByAjax && entriesByAjax.length > 0) {
      validateEntriesId(entriesByAjax)
    }
    validateEntriesIdInItems(entriesByAjax, this.items)

    const itemsByEntries = getItemsByEntries(entriesByAjax)
    this.items = [...this.items, ...itemsByEntries]
    itemView.addItems(itemsByEntries, this.root)
    itemsByEntries.forEach(this._mountItem.bind(this))
  }

  _unmountItem(item) {
    const {classes} = this._settings
    const {id} = item
    buildView.removeClassItem(item, classes)
    itemView.unbindClickItem(item, this._eventBinders[id])
  }
}
