import {addClassName, removeClassName} from './utils/dom'

const addClassNameIsOpened = addClassName('is-opened')
const removeClassNameIsOpened = removeClassName('is-opened')

export default class Item {
  constructor({header, content, isOpened = false}) {
    this.header = header
    this.content = content
    this.isOpened = isOpened

    this.init()
  }

  toggle() {
    this.isOpened ? this.close() : this.open()
  }

  open() {
    this.isOpened = true
    addClassNameIsOpened(this.header)
    return this
  }

  close() {
    this.isOpened = false
    removeClassNameIsOpened(this.header)
    return this
  }

  handleClick(event) {
    this.toggle()
  }

  init() {
    this.header.addEventListener('click', this.handleClick.bind(this))
  }
}
