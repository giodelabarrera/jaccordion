export function throwError(message) {
  throw new Error(message)
}

export function throwErrorRequired(name) {
  throwError(`${name} is required`)
}

export function throwErrorType(name, type) {
  throwError(`${name} must be a ${type}`)
}

export function throwErrorTagName(name, tagName) {
  throwError(`${name} must have a tag name equal to ${tagName.toUpperCase()}`)
}
