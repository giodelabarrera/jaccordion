import defaults from './defaults'
import {
  getItemsByEntries,
  getItemsByRoot,
  findItemById,
  removeItem,
  createItem,
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
  validateEntriesId
} from './core/validator'

export default class Jaccordion {
  constructor(element, options = {}) {
    validateElement(element)
    validateOptions(options)

    this._settings = {...defaults, ...options}
    this._eventBinders = []
    this._eventBus = new EventBus()
    this.root = element
    this.enabled = false
    this.items = []
  }

  mount() {
    this._eventBus.emit('mount.before')

    const {openAt, ajax, classes, entries} = this._settings

    this.items = getItemsByRoot(this.root)

    if (entries && entries.length > 0) {
      validateEntriesId(entries, this.items)
      const itemsByEntries = getItemsByEntries(entries)
      itemView.addItems(itemsByEntries, this.root)
      this.items = [...this.items, ...itemsByEntries]
    }

    buildView.addClasses({root: this.root, items: this.items, openAt, classes})
    this._bind()

    if (ajax.url) {
      this._eventBus.emit('mountAjax.before')

      getEntriesByAjax(ajax).then(entriesByAjax => {
        validateEntriesId(entriesByAjax, this.items)

        const itemsByEntries = getItemsByEntries(entriesByAjax)
        itemView.addItems(itemsByEntries, this.root)
        this.items = [...this.items, ...itemsByEntries]

        itemsByEntries.forEach(item => {
          const {id} = item
          buildView.addClassItem(item, classes)
          this._eventBinders[id] = new EventBinder()
          itemView.bindClickItem(item, this._eventBinders[id], () =>
            this.toggle(id)
          )
          if (openAt === id) this.open(id)
        })

        this._eventBus.emit('mountAjax.after')
      })
    }

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

  append(header, content) {
    this._eventBus.emit('append.before', {header, content})

    const newItem = createItem({header, content})
    this.items = appendItem(newItem, this.items)
    itemView.appendItem(newItem, this.root)

    const {classes} = this._settings
    buildView.addClassItem(newItem, classes)

    const {id} = newItem
    this._eventBinders[id] = new EventBinder()
    itemView.bindClickItem(newItem, this._eventBinders[id], () =>
      this.toggle(id)
    )

    this._eventBus.emit('append.after', newItem)

    return this
  }

  prepend(header, content) {
    this._eventBus.emit('prepend.before', {header, content})

    const newItem = createItem({header, content})
    this.items = prependItem(newItem, this.items)
    itemView.prependItem(newItem, this.root)

    const {classes} = this._settings
    buildView.addClassItem(newItem, classes)

    const {id} = newItem
    this._eventBinders[id] = new EventBinder()
    itemView.bindClickItem(newItem, this._eventBinders[id], () =>
      this.toggle(id)
    )

    this._eventBus.emit('prepend.after', newItem)

    return this
  }

  appendBefore(header, content, referenceId) {
    this._eventBus.emit('appendBefore.before', {header, content, referenceId})

    const referenceItem = findItemById(referenceId, this.items)

    const newItem = createItem({header, content})
    this.items = appendBeforeItem(newItem, referenceItem.id, this.items)
    itemView.appendBeforeItem(newItem, referenceItem, this.root)

    const {classes} = this._settings
    buildView.addClassItem(newItem, classes)

    const {id} = newItem
    this._eventBinders[id] = new EventBinder()
    itemView.bindClickItem(newItem, this._eventBinders[id], () =>
      this.toggle(id)
    )

    this._eventBus.emit('appendBefore.after', newItem)

    return this
  }

  appendAfter(header, content, referenceId) {
    this._eventBus.emit('appendAfter.before', {header, content, referenceId})

    const referenceItem = findItemById(referenceId, this.items)

    const newItem = createItem({header, content})
    this.items = appendAfterItem(newItem, referenceItem.id, this.items)
    itemView.appendAfterItem(newItem, referenceItem, this.root)

    const {classes} = this._settings
    buildView.addClassItem(newItem, classes)

    const {id} = newItem
    this._eventBinders[id] = new EventBinder()
    itemView.bindClickItem(newItem, this._eventBinders[id], () =>
      this.toggle(id)
    )

    this._eventBus.emit('appendAfter.after', newItem)

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
    this._eventBus.on(event, handler)

    return this
  }

  destroy() {
    const {classes} = this._settings

    buildView.removeClasses({root: this.root, items: this.items, classes})
    this._unbind()

    delete this.root
    delete this._settings
    delete this.enabled
    delete this.items
    delete this._eventBinders

    this._eventBus.emit('destroy')
    delete this._eventBus
  }

  _bind() {
    this.items.forEach(item => {
      const {id} = item
      this._eventBinders[id] = new EventBinder()
      itemView.bindClickItem(item, this._eventBinders[id], () =>
        this.toggle(id)
      )
    })
  }

  _unbind() {
    this.items.forEach(item => {
      const {id} = item
      itemView.unbindClickItem(item, this._eventBinders[id])
    })
    this._eventBinders = []
  }
}
