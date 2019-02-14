export const makeIsTagName = tagName => element =>
  element.tagName === tagName.toUpperCase()
