import {addClassName, removeClassName} from '../utils/dom'

export default function(jaccordion, components) {
  const Build = {
    mount() {
      this.addClasses()
    },

    addClasses() {
      const {classes} = jaccordion.settings
      const {Html} = components

      addClassName(classes.root)(Html.root)
      Html.headers.forEach(addClassName(classes.header))
      Html.contents.forEach(addClassName(classes.content))
    },

    removeClasses() {
      const {classes} = jaccordion.settings
      const {Html} = components

      removeClassName(classes.root)(Html.root)
      Html.headers.forEach(removeClassName(classes.header))
      Html.contents.forEach(removeClassName(classes.content))
    },

    destroy() {
      this.removeClasses()
    }
  }

  return Build
}
