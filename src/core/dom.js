export function getElementBySelector(selector) {
  if (typeof selector === 'undefined') throw new Error('selector is required')
  if (typeof selector !== 'string')
    throw new Error('selector must be of type string')

  return document.querySelector(selector)
}
