export function throwError(message) {
  throw new Error(message)
}

export function throwRequiredError(name) {
  throwError(`${name} is required`)
}

export function throwTypeError(name, type) {
  throwError(`${name} must be a ${type}`)
}

export function throwTagNameError(name, tagName) {
  throwError(`${name} must have a tag name equal to ${tagName.toUpperCase()}`)
}

export function throwEntityError(name, id) {
  throwError(`No ${name} found with id ${id}`)
}
