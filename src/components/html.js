function getOneNode(selector) {
  return document.querySelector(selector)
}

export default function(jaccordion) {
  const Html = {
    mount() {
      this.root = getOneNode(jaccordion.selector)
    }
  }

  return Html
}
