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

export function isArray(value) {
  return Array.isArray(value)
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
 * Indicates if the value is function
 *
 * @export
 * @param {*} value
 * @returns
 */
export function isFunction(value) {
  return typeof value === 'function'
}

export function isBoolean(value) {
  return typeof value === 'boolean'
}
