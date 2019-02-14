function render(item) {
  if (item.isOpened) {
    item.header.classList.add('is-opened')
  } else {
    item.header.classList.remove('is-opened')
  }
}

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
    render(this)
    return this
  }

  close() {
    this.isOpened = false
    render(this)
    return this
  }

  handleClick(event) {
    this.toggle()
  }

  init() {
    this.header.addEventListener('click', this.handleClick.bind(this))
  }
}
