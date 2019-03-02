/**
 * Indicates if the value is string
 *
 * @export
 * @param {*} value
 * @returns
 */
export function isString(value) {
  return typeof value === 'string'
}

/**
 * Indicates if the value is number
 *
 * @export
 * @param {*} value
 * @returns
 */
export function isNumber(value) {
  return typeof value === 'number'
}

/**
 * Indicates if the value is undefined
 *
 * @export
 * @param {*} value
 * @returns
 */
export function isUndefined(value) {
  return typeof value === 'undefined'
}

/**
 * Indicates if the value is a instance of HTMLElement
 *
 * @export
 * @param {*} value
 * @returns
 */
export function isHTMLElement(value) {
  return value instanceof HTMLElement
}
