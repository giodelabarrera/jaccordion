import {makeIsTagName} from '../utils/dom'

const isDTTagName = makeIsTagName('dt')
const isDDTagName = makeIsTagName('dd')

export default function(jaccordion) {
  const Html = {
    mount() {
      this.root = document.querySelector(jaccordion.selector)
      const children = Array.from(this.root.children)
      this.headers = children.filter(isDTTagName)
      this.contents = children.filter(isDDTagName)
    }
  }

  return Html
}
