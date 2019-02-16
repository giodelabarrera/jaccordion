import {addClassName, removeClassName} from '../utils/dom'

export default function(jaccordion, components) {
  const Action = {
    mount() {
      const {Html} = components
      this.items = Html.headers.map((header, index) => {
        const content = Html.contents[index]
        return {header, content, isOpened: false}
      })
      this.bind()
    },

    getItem(index) {
      return this.items[index]
    },

    toggle(index) {
      const item = this.getItem(index)
      item.isOpened ? this.close(index) : this.open(index)
    },

    open(index) {
      const item = this.getItem(index)
      item.isOpened = true

      const {classes} = jaccordion.settings
      addClassName(classes.isOpened)(item.header)

      return this
    },

    close(index) {
      const item = this.getItem(index)
      item.isOpened = false

      const {classes} = jaccordion.settings
      removeClassName(classes.isOpened)(item.header)

      return this
    },

    bind() {
      this.items.forEach(({header}, index) => {
        header.addEventListener('click', event => {
          this.toggle(index)
        })
      })
    },

    unbind() {}
  }

  return Action
}
