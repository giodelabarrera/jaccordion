import defaults from './defaults'
import {
  openItem,
  closeItem,
  mergeOptions,
  getElementBySelector,
  getItemsByRoot,
  getItemsByEntries,
  closeItems
} from './helpers'

export default class Jaccordion {
  constructor(selector, options) {
    this.selector = selector
    this.root = getElementBySelector(this.selector)
    this.settings = mergeOptions(defaults, options)
    this._items = []
    this._listeners = []
    this._enabled = false
  }

  mount() {
    let items = []

    if (this.settings.entries && this.settings.entries.length > 0) {
      items = getItemsByEntries(this.settings.entries, this.settings)
      while (this.root.firstChild) this.root.removeChild(this.root.firstChild)
      items.forEach(item => {
        this.root.appendChild(item.header)
        this.root.appendChild(item.content)
      })
    } else {
      items = getItemsByRoot(this.root, this.settings)
    }

    this._items = items

    // add class
    this.root.classList.add(this.settings.classes.root)
    // add class
    const {openAt} = this.settings
    this._items.forEach((item, currentIndex) => {
      item.header.classList.add(this.settings.classes.header)
      item.content.classList.add(this.settings.classes.content)
      if (openAt === currentIndex) {
        item.header.classList.add(this.settings.classes.opened)
      }
    })

    this._listeners = this._items.map((item, currentIndex) => {
      return () => this.toggle(currentIndex)
    })
    this.bind()

    this._enabled = true
  }

  update(options) {
    // remove class
    this.root.classList.remove(this.settings.classes.root)
    // remove class
    this._items.forEach(item => {
      item.header.classList.remove(
        this.settings.classes.header,
        this.settings.classes.opened
      )
      item.content.classList.remove(this.settings.classes.content)
    })
    this.unbind()

    this.settings = mergeOptions(this.settings, options)
    this.mount()
    return this
  }

  destroy() {
    // remove class
    this.root.classList.remove(this.settings.classes.root)
    // remove class
    this._items.forEach(item => {
      item.header.classList.remove(
        this.settings.classes.header,
        this.settings.classes.opened
      )
      item.content.classList.remove(this.settings.classes.content)
    })
    this.unbind()

    this.selector = ''
    this.root = undefined
    this.settings = defaults
    this._items = []
    this._listeners = []
    this._enabled = false

    return this
  }

  disable() {
    this._enabled = false
    return this
  }

  enable() {
    this._enabled = true
    return this
  }

  toggle(index) {
    if (this._enabled) {
      this._items[index].opened ? this.close(index) : this.open(index)
    }
    return this
  }

  open(index) {
    if (this._enabled) {
      this._items = closeItems(this._items)
      this._items.forEach(item =>
        item.header.classList.remove(this.settings.classes.opened)
      )

      this._items = openItem(index, this._items)
      this._items[index].header.classList.add(this.settings.classes.opened)
    }

    return this
  }

  close(index) {
    if (this._enabled) {
      this._items = closeItem(index, this._items)
      this._items[index].header.classList.remove(this.settings.classes.opened)
    }

    return this
  }

  bind() {
    this._items.forEach(({header}, currentIndex) => {
      header.addEventListener('click', this._listeners[currentIndex])
    })
  }

  unbind() {
    this._items.forEach(({header}, currentIndex) => {
      header.removeEventListener('click', this._listeners[currentIndex])
    })
  }

  on(event, handler) {
    return this
  }
}
