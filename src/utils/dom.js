export const makeIsTagName = tagName => element =>
  element.tagName === tagName.toUpperCase()

export const makeActionClassName = action => className => element =>
  element.classList[action](className)

export const addClassName = makeActionClassName('add')

export const removeClassName = makeActionClassName('remove')
