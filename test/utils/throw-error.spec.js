import {
  throwError,
  throwRequiredError,
  throwTypeError,
  throwNotFoundError,
  throwEmptyError
} from '../../src/utils/throw-error'

describe('throw-error', () => {
  test('should throw error correctly', () => {
    expect(() => throwError('generic error')).toThrow('generic error')
  })

  test('should throw required error correctly', () => {
    const name = 'id'
    expect(() => throwRequiredError(name)).toThrow(`${name} is required`)
  })

  test('should throw type error correctly', () => {
    const name = 'id'
    const type = 'number'
    expect(() => throwTypeError(name, type)).toThrow(
      `${name} must be a ${type}`
    )
  })

  test('should throw not found error correctly', () => {
    const name = 'item'
    const id = 123
    expect(() => throwNotFoundError(name, id)).toThrow(
      `No ${name} found with id ${id}`
    )
  })

  test('should throw empty error correctly', () => {
    const name = 'item'
    expect(() => throwEmptyError(name)).toThrow(`${name} can not be empty`)
  })
})
