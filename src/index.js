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
  validateEntriesWithRepeatedId,
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

/**
 * @export
 * @class Jaccordion
 */
export default class Jaccordion {
  /**
   * Creates an instance of Jaccordion
   * @param {HTMLDListElement} element - The root element
   * @param {Object} [options={}] - Setting options
   * @param {Number} [options.openAt] - Identifier of the item that appears open by default
   * @param {Boolean} [options.multiple] - Determines if there may be more than one item open
   * @param {Object[]} [options.entries] - Entries to create the items
   * @param {Number} options.entries[].id - Identifier to the item
   * @param {String} options.entries[].header - String to the header item
   * @param {String} options.entries[].content - String to the content item
   * @param {Object} [options.ajax] - Object for make items by request
   * @param {String} options.ajax.url - Url to make the request
   * @param {Function} options.ajax.processResults - Function to process the structure of the results of the request
   * @param {Object} [options.classes] - Object for customized classes for styles
   * @param {String} options.classes.root - Root class for styles
   * @param {String} options.classes.header - Header class for styles
   * @param {String} options.classes.opened - Opened class for styles
   * @param {String} options.classes.content - Content class for styles
   * @throws {Error} Invalid root validation
   * @throws {Error} Invalid options validation
   * @memberof Jaccordion
   */
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

  /**
   * Mount the accordion with your items
   * Add styles and bind events
   * @return {Promise<Jaccordion>}
   */
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

  /**
   * Disable
   * @return {Jaccordion}
   */
  disable() {
    this.enabled = false
    return this
  }

  /**
   * Enable
   * @return {Jaccordion}
   */
  enable() {
    this.enabled = true
    return this
  }

  /**
   * Toogle item
   * @param {number} id - Identifier to the item
   * @throws {Error} Invalid id
   * @return {Jaccordion}
   */
  toggle(id) {
    validateId(id)

    if (this.enabled) {
      this.isOpen(id) ? this.close(id) : this.open(id)
    }
    return this
  }

  /**
   * Indicates if item is open
   * @param {number} id - Identifier to the item
   * @throws {Error} Invalid id
   * @throws {Error} Item not found
   * @return {Jaccordion}
   */
  isOpen(id) {
    validateId(id)

    const {classes} = this._settings
    const item = findItemById(id, this.items)
    if (!item) throwNotFoundError('item', id)

    return view.isOpen(item, classes)
  }

  /**
   * Open item
   * @param {number} id - Identifier to the item
   * @throws {Error} Invalid id
   * @throws {Error} Item not found
   * @return {Jaccordion}
   */
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

  /**
   * Close item
   * @param {number} id - Identifier to the item
   * @throws {Error} Invalid id
   * @throws {Error} Item not found
   * @return {Jaccordion}
   */
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

  /**
   * Append a item from entry
   * @param {Object} entry
   * @param {Number} entry.id - Identifier to the item
   * @param {String} entry.header - String to the header item
   * @param {String} entry.content - String to the content item
   * @throws {Error} Invalid entry
   * @throws {Error} Identifier already exists in items
   * @return {Jaccordion}
   */
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

  /**
   * Prepend a item from entry
   * @param {Object} entry
   * @param {Number} entry.id - Identifier to the item
   * @param {String} entry.header - String to the header item
   * @param {String} entry.content - String to the content item
   * @throws {Error} Invalid entry
   * @throws {Error} Identifier already exists in items
   * @return {Jaccordion}
   */
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

  /**
   * Append a item before of an item from entry
   * @param {Object} entry
   * @param {Number} entry.id - Identifier to the item
   * @param {String} entry.header - String to the header item
   * @param {String} entry.content - String to the content item
   * @param {Number} referenceId - Identifier to the reference item
   * @throws {Error} Invalid entry
   * @throws {Error} Identifier already exists in items
   * @throws {Error} Invalid id
   * @throws {Error} Item not found
   * @return {Jaccordion}
   */
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

  /**
   * Append a item after of an item from entry
   * @param {Object} entry
   * @param {Number} entry.id - Identifier to the item
   * @param {String} entry.header - String to the header item
   * @param {String} entry.content - String to the content item
   * @param {Number} referenceId - Identifier to the reference item
   * @throws {Error} Invalid entry
   * @throws {Error} Identifier already exists in items
   * @throws {Error} Invalid id
   * @throws {Error} Item not found
   * @return {Jaccordion}
   */
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

  /**
   * Remove an item from id
   * @param {Number} id - Identifier to the item
   * @throws {Error} Invalid id
   * @throws {Error} Item not found
   * @return {Jaccordion}
   */
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

    return this
  }

  /**
   * Subscribe a handler to an event
   * @param {String} event - The event name
   * @param {Function} handler - The handler function
   * @throws {Error} Undefined arguments
   * @throws {Error} Incorrect type arguments
   * @return {Jaccordion}
   */
  on(event, handler) {
    if (isUndefined(event)) throwRequiredError('event')
    if (isUndefined(handler)) throwRequiredError('handler')

    if (!isString(event)) throwTypeError('event', 'string')
    if (!isFunction(handler)) throwTypeError('handler', 'function')

    this._eventBus.on(event, handler)

    return this
  }

  /**
   * Unmount the accordion.
   * Remove styles and associated events
   * @return {Jaccordion}
   */
  unmount() {
    const {classes} = this._settings

    view.removeClassRoot(this.root, classes)
    this.items.forEach(this._unmountItem.bind(this))
    this.enabled = false
    this.items = []
    this._eventBinders = []

    this._eventBus.emit('unmount')

    return this
  }

  /**
   * Mount items from accordion markup.
   */
  _mountMarkup() {
    const items = createItemsByRoot(this.root)
    this.items = [...this.items, ...items]
    items.forEach(this._mountItem.bind(this))
  }

  /**
   * Mount items from entries option.
   * @throws {Error} Identifiers of entries already exist in items
   */
  _mountEntries() {
    const {entries} = this._settings

    validateEntriesIdInItems(entries, this.items)

    const itemsByEntries = createItemsByEntries(entries)
    this.items = [...this.items, ...itemsByEntries]
    view.addItems(itemsByEntries, this.root)
    itemsByEntries.forEach(this._mountItem.bind(this))
  }

  /**
   * Mount items from ajax option.
   * @throws {Error} Entries with repeated identifiers
   * @throws {Error} Identifiers of entries already exist in items
   */
  async _mountAjaxEntries() {
    const {ajax} = this._settings

    this._eventBus.emit('ajaxEntries.before')
    const entriesByAjax = await getEntriesByAjax(ajax)
    this._eventBus.emit('ajaxEntries.success')

    if (entriesByAjax && entriesByAjax.length)
      validateEntriesWithRepeatedId(entriesByAjax)
    validateEntriesIdInItems(entriesByAjax, this.items)

    const itemsByEntries = createItemsByEntries(entriesByAjax)
    this.items = [...this.items, ...itemsByEntries]
    view.addItems(itemsByEntries, this.root)
    itemsByEntries.forEach(this._mountItem.bind(this))
  }

  /**
   * Mount item adding styles and bind events
   * @param {Object} item
   * @param {Number} item.id - Identifier of the item
   * @param {HTMLElement} item.header - HTMLElement with the tag name DT
   * @param {HTMLElement} item.content - HTMLElement with the tag name DD
   */
  _mountItem(item) {
    const {openAt, classes} = this._settings
    const {id} = item
    view.addClassItem(item, classes)
    this._eventBinders[id] = new EventBinder()
    view.bindClickItem(item, this._eventBinders[id], () => this.toggle(id))
    if (openAt === id) view.openItem(item, classes)
  }

  /**
   * Unmount item removing styles and unbind events
   * @param {Object} item
   * @param {Number} item.id - Identifier of the item
   * @param {HTMLElement} item.header - HTMLElement with the tag name DT
   * @param {HTMLElement} item.content - HTMLElement with the tag name DD
   */
  _unmountItem(item) {
    const {classes} = this._settings
    const {id} = item
    view.removeClassItem(item, classes)
    view.unbindClickItem(item, this._eventBinders[id])
  }
}
