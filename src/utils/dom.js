export const isHTMLElement = (classElement = HTMLElement) => value =>
  value instanceof classElement

export const isTagName = tagName => element =>
  element.tagName === tagName.toUpperCase()

export const removeChildren = element => {
  while (element.firstChild) element.removeChild(element.firstChild)
}
