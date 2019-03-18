/**
 * Throw a native error
 * @export
 * @param {string} message
 * @throws {Error} The error message
 */
export function throwError(message) {
  throw new Error(message)
}

/**
 * Throw a error with message customized for a required error of argument
 * @export
 * @param {string} message
 * @throws {Error} The error message
 */
export function throwRequiredError(name) {
  throwError(`${name} is required`)
}

/**
 * Throw a error with message customized for a incorrect type of argument
 * @export
 * @param {string} message
 * @throws {Error} The error message
 */
export function throwTypeError(name, type) {
  throwError(`${name} must be a ${type}`)
}

/**
 * Throw a error with message customized for a element not found
 * @export
 * @param {string} message
 * @throws {Error} The error message
 */
export function throwNotFoundError(name, id) {
  throwError(`No ${name} found with id ${id}`)
}

/**
 * Throw a error with message customized for a element is empty
 * @export
 * @param {string} message
 * @throws {Error} The error message
 */
export function throwEmptyError(name) {
  throwError(`${name} can not be empty`)
}
