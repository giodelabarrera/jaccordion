/**
 * Returns function to indicates whether an element is an instance of an HTMLElement
 * @export
 * @param {HTMLElement} [classElement] - The HTMLElement class to build function
 * @returns {Function} Function to check instance of HTMLElement
 */
export const isHTMLElement = (classElement = HTMLElement) => value =>
  value instanceof classElement

/**
 * Returns function to indicates whether an element is of a tag name
 * @export
 * @param {string} tagName - The tag name to build function
 * @returns {Function} Function to check tag name of a element
 */
export const isTagName = tagName => element =>
  element.tagName === tagName.toUpperCase()

/**
 * Remove children of a element
 * @export
 * @param {HTMLElement} element - The element container
 */
export const removeChildren = element => {
  while (element.firstChild) element.removeChild(element.firstChild)
}
