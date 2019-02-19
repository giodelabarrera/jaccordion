export const makeIsTagName = tagName => element =>
  element.tagName === tagName.toUpperCase()

export function removeChildren(elem) {
  while (elem.firstChild) elem.removeChild(elem.firstChild)
}
