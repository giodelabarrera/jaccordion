export function throwError(message) {
  throw new Error(message)
}

export function throwRequiredError(name) {
  throwError(`${name} is required`)
}

export function throwTypeError(name, type) {
  throwError(`${name} must be a ${type}`)
}

export function throwNotFoundError(name, id) {
  throwError(`No ${name} found with id ${id}`)
}
