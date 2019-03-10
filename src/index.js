import defaults from './defaults'
import {
  createItemsByEntries,
  createItemsByRoot,
  findItemById,
  removeItem,
  appendBeforeItem,
  appendAfterItem,
  appendItem,
  prependItem,
  createItemByEntry
} from './core/item'
import {getEntriesByAjax} from './core/entry'
import EventBinder from './event/event-binder'
import EventBus from './event/event-bus'
import {
  validateOptions,
  validateIdInItems,
  validateEntriesIdInItems,
  validateEntriesId,
  validateId,
  validateEntry,
  validateRootElement
} from './core/validator'
import * as view from './core/view'
import {
  throwRequiredError,
  throwTypeError,
  throwNotFoundError
} from './utils/throw-error'
import {isUndefined, isString, isFunction} from './utils/unit'

export default class Jaccordion {
  constructor(element, options = {}) {
    validateRootElement(element)
    validateOptions(options)

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
    view.addClassRoot(this.root, classes)
    this._mountMarkup()
    if (entries && entries.length) this._mountEntries()
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
    validateId(id)

    if (this.enabled) {
      this.isOpen(id) ? this.close(id) : this.open(id)
    }
    return this
  }

  isOpen(id) {
    validateId(id)

    const {classes} = this._settings
    const item = findItemById(id, this.items)
    if (!item) throwNotFoundError('item', id)

    return view.isOpen(item, classes)
  }

  open(id) {
    validateId(id)

    if (this.enabled) {
      const item = findItemById(id, this.items)
      if (!item) throwNotFoundError('item', id)

      this._eventBus.emit('open.before', item)

      const {multiple, classes} = this._settings
      if (multiple === false) view.closeItems(this.items, classes)
      view.openItem(item, classes)

      this._eventBus.emit('open.after', item)
    }

    return this
  }

  close(id) {
    validateId(id)

    if (this.enabled) {
      const item = findItemById(id, this.items)
      if (!item) throwNotFoundError('item', id)

      this._eventBus.emit('close.before', item)

      const {classes} = this._settings
      view.closeItem(item, classes)

      this._eventBus.emit('close.after', item)
    }

    return this
  }

  append(entry) {
    validateEntry(entry)
    validateIdInItems(entry.id, this.items)

    const item = createItemByEntry(entry)
    this.items = appendItem(item, this.items)
    view.appendItem(item, this.root)
    this._mountItem(item)

    this._eventBus.emit('append', item)

    return this
  }

  prepend(entry) {
    validateEntry(entry)
    validateIdInItems(entry.id, this.items)

    const item = createItemByEntry(entry)
    this.items = prependItem(item, this.items)
    view.prependItem(item, this.root)
    this._mountItem(item)

    this._eventBus.emit('prepend', item)

    return this
  }

  appendBefore(entry, referenceId) {
    validateEntry(entry)
    validateIdInItems(entry.id, this.items)
    validateId(referenceId)

    const referenceItem = findItemById(referenceId, this.items)
    if (!referenceItem) throwNotFoundError('item', referenceId)

    const item = createItemByEntry(entry)
    this.items = appendBeforeItem(item, referenceItem.id, this.items)
    view.appendBeforeItem(item, referenceItem, this.root)
    this._mountItem(item)

    this._eventBus.emit('appendBefore', item)

    return this
  }

  appendAfter(entry, referenceId) {
    validateEntry(entry)
    validateIdInItems(entry.id, this.items)
    validateId(referenceId)

    const referenceItem = findItemById(referenceId, this.items)
    if (!referenceItem) throwNotFoundError('item', referenceId)

    const item = createItemByEntry(entry)
    this.items = appendAfterItem(item, referenceItem.id, this.items)
    view.appendAfterItem(item, referenceItem, this.root)
    this._mountItem(item)

    this._eventBus.emit('appendAfter', item)

    return this
  }

  remove(id) {
    validateId(id)

    const item = findItemById(id, this.items)
    if (!item) throwNotFoundError('item', id)

    this._eventBus.emit('remove.before', item)

    this.items = removeItem(id, this.items)
    const {header} = item
    this._eventBinders[id].off('click', header)
    view.removeItem(item)

    this._eventBus.emit('remove.after', id)
  }

  on(event, handler) {
    if (isUndefined(event)) throwRequiredError('event')
    if (isUndefined(handler)) throwRequiredError('handler')

    if (!isString(event)) throwTypeError('event', 'string')
    if (!isFunction(handler)) throwTypeError('handler', 'function')

    this._eventBus.on(event, handler)

    return this
  }

  unmount() {
    const {classes} = this._settings

    view.removeClassRoot(this.root, classes)
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
    view.addClassItem(item, classes)
    this._eventBinders[id] = new EventBinder()
    view.bindClickItem(item, this._eventBinders[id], () => this.toggle(id))
    if (openAt === id) this.open(id)
  }

  _mountMarkup() {
    const items = createItemsByRoot(this.root)
    this.items = [...this.items, ...items]
    items.forEach(this._mountItem.bind(this))
  }

  _mountEntries() {
    const {entries} = this._settings

    validateEntriesIdInItems(entries, this.items)

    const itemsByEntries = createItemsByEntries(entries)
    this.items = [...this.items, ...itemsByEntries]
    view.addItems(itemsByEntries, this.root)
    itemsByEntries.forEach(this._mountItem.bind(this))
  }

  async _mountAjaxEntries() {
    const {ajax} = this._settings

    this._eventBus.emit('ajaxEntries.before')
    const entriesByAjax = await getEntriesByAjax(ajax)
    this._eventBus.emit('ajaxEntries.success')

    if (entriesByAjax && entriesByAjax.length) validateEntriesId(entriesByAjax)
    validateEntriesIdInItems(entriesByAjax, this.items)

    const itemsByEntries = createItemsByEntries(entriesByAjax)
    this.items = [...this.items, ...itemsByEntries]
    view.addItems(itemsByEntries, this.root)
    itemsByEntries.forEach(this._mountItem.bind(this))
  }

  _unmountItem(item) {
    const {classes} = this._settings
    const {id} = item
    view.removeClassItem(item, classes)
    view.unbindClickItem(item, this._eventBinders[id])
  }
}
