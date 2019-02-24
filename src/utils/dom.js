export const makeIsTagName = tagName => element =>
  element.tagName === tagName.toUpperCase()

export const removeChildren = element => {
  while (element.firstChild) element.removeChild(element.firstChild)
}
