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
  appendBeforeItem,
  appendAfterItem,
  appendItem,
  prependItem
} from './core/item'
import EventBinder from './event/event-binder'
import EventBus from './event/event-bus'
import * as buildView from './view/build'
import * as itemView from './view/item'

export default class Jaccordion {
  constructor(selector, options = {}) {
    this.root = getElementBySelector(selector)
    this.settings = mergeOptions(defaults, options)
    this.enabled = false
    this.items = []
    this.eventBinders = []
    this.eventBus = new EventBus()
  }

  mount() {
    this.eventBus.emit('mount.before')

    const {openAt, ajax, classes, entries} = this.settings

    this.items = getItemsByRoot(this.root)

    if (entries && entries.length > 0) {
      const itemsByEntries = getItemsByEntries(entries)
      itemView.addItems(itemsByEntries, this.root)
      this.items = [...this.items, ...itemsByEntries]
    }

    buildView.addClasses({root: this.root, items: this.items, openAt, classes})
    this._bind()

    if (ajax.url) {
      this.eventBus.emit('mountAjax.before')

      getEntriesByAjax(ajax).then(entriesByAjax => {
        const itemsByEntries = getItemsByEntries(entriesByAjax)
        itemView.addItems(itemsByEntries, this.root)
        this.items = [...this.items, ...itemsByEntries]

        itemsByEntries.forEach(item => {
          const {id} = item

          buildView.addClassItem(item, classes)

          this.eventBinders[id] = new EventBinder()
          itemView.bindClickItem(item, this.eventBinders[id], () =>
            this.toggle(id)
          )
        })

        this.eventBus.emit('mountAjax.after')
      })
    }

    this.enabled = true

    this.eventBus.emit('mount.after')

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

  append(header, content) {
    this.eventBus.emit('append.before', {header, content})

    const newItem = createItem({header, content})
    this.items = appendItem(newItem, this.items)
    itemView.appendItem(newItem, this.root)

    const {classes} = this.settings
    buildView.addClassItem(newItem, classes)

    const {id} = newItem
    this.eventBinders[id] = new EventBinder()
    itemView.bindClickItem(newItem, this.eventBinders[id], () =>
      this.toggle(id)
    )

    this.eventBus.emit('append.after', newItem)

    return this
  }

  prepend(header, content) {
    this.eventBus.emit('prepend.before', {header, content})

    const newItem = createItem({header, content})
    this.items = prependItem(newItem, this.items)
    itemView.prependItem(newItem, this.root)

    const {classes} = this.settings
    buildView.addClassItem(newItem, classes)

    const {id} = newItem
    this.eventBinders[id] = new EventBinder()
    itemView.bindClickItem(newItem, this.eventBinders[id], () =>
      this.toggle(id)
    )

    this.eventBus.emit('prepend.after', newItem)

    return this
  }

  appendBefore(header, content, referenceId) {
    this.eventBus.emit('appendBefore.before', {header, content, referenceId})

    const referenceItem = findItemById(referenceId, this.items)

    const newItem = createItem({header, content})
    this.items = appendBeforeItem(newItem, referenceItem.id, this.items)
    itemView.appendBeforeItem(newItem, referenceItem, this.root)

    const {classes} = this.settings
    buildView.addClassItem(newItem, classes)

    const {id} = newItem
    this.eventBinders[id] = new EventBinder()
    itemView.bindClickItem(newItem, this.eventBinders[id], () =>
      this.toggle(id)
    )

    this.eventBus.emit('appendBefore.after', newItem)

    return this
  }

  appendAfter(header, content, referenceId) {
    this.eventBus.emit('appendAfter.before', {header, content, referenceId})

    const referenceItem = findItemById(referenceId, this.items)

    const newItem = createItem({header, content})
    this.items = appendAfterItem(newItem, referenceItem.id, this.items)
    itemView.appendAfterItem(newItem, referenceItem, this.root)

    const {classes} = this.settings
    buildView.addClassItem(newItem, classes)

    const {id} = newItem
    this.eventBinders[id] = new EventBinder()
    itemView.bindClickItem(newItem, this.eventBinders[id], () =>
      this.toggle(id)
    )

    this.eventBus.emit('appendAfter.after', newItem)

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

  _bind() {
    this.items.forEach(item => {
      const {id} = item
      this.eventBinders[id] = new EventBinder()
      itemView.bindClickItem(item, this.eventBinders[id], () => this.toggle(id))
    })
  }

  _unbind() {
    this.items.forEach(item => {
      const {id} = item
      itemView.unbindClickItem(item, this.eventBinders[id])
    })
    this.eventBinders = []
  }
}
