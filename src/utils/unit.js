/**
 * Indicates if the value is string
 * @export
 * @param {*} value
 * @returns {Boolean}
 */
export function isString(value) {
  return typeof value === 'string'
}

/**
 * Indicates if the value is number
 * @export
 * @param {*} value
 * @returns {Boolean}
 */
export function isNumber(value) {
  return typeof value === 'number'
}

/**
 * Indicates if the value is array
 * @export
 * @param {*} value
 * @returns {Boolean}
 */
export function isArray(value) {
  return Array.isArray(value)
}

/**
 * Indicates if the value is undefined
 * @export
 * @param {*} value
 * @returns {Boolean}
 */
export function isUndefined(value) {
  return typeof value === 'undefined'
}

/**
 * Indicates if the value is function
 * @export
 * @param {*} value
 * @returns {Boolean}
 */
export function isFunction(value) {
  return typeof value === 'function'
}

/**
 * Indicates if the value is boolean
 * @export
 * @param {*} value
 * @returns {Boolean}
 */
export function isBoolean(value) {
  return typeof value === 'boolean'
}
