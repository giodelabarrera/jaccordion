export default function(jaccordion, components) {
  const Build = {
    mount() {
      this.addClasses()
    },

    addClasses() {
      const {classes} = jaccordion.settings
      const {Html} = components

      Html.root.classList.add(classes.root)

      Html.headers = Html.headers.map(header => {
        header.classList.add(classes.header)
        if (header.dataset.jaccordionOpen === 'true') {
          header.classList.add(classes.isOpened)
        }
        return header
      })

      Html.contents = Html.contents.map(content => {
        content.classList.add(classes.content)
        return content
      })
    },

    removeClasses() {
      const {classes} = jaccordion.settings
      const {Html} = components

      Html.root.classList.remove(classes.root)

      Html.headers.map(header => {
        header.classList.remove(classes.header, classes.isOpened)
        return header
      })

      Html.contents.map(content => {
        content.classList.remove(classes.content)
        return content
      })
    },

    destroy() {
      this.removeClasses()
    }
  }

  return Build
}
