import {
  isUndefined,
  isNumber,
  isString,
  isBoolean,
  isArray,
  isFunction
} from '../utils/unit'
import {
  throwRequiredError,
  throwTypeError,
  throwError,
  throwEmptyError
} from '../utils/throw-error'
import {isHTMLElement} from '../utils/dom'
import {existsIdInItems} from './item'
import {getRepeatedValues} from '../utils/array'

/**
 * Validates an id
 * @export
 * @param {Number} id - Identifier
 * @throws {Error} Undefined argument
 * @throws {Error} Incorrect type argument
 * @throws {Error} Argument less than zero
 */
export function validateId(id) {
  if (isUndefined(id)) throwRequiredError('id')
  if (!isNumber(id) || isNaN(id)) throwTypeError('id', 'number')
  if (id < 0) throwError(`id must be greater than zero`)
}

/**
 * Validates the entry header
 * @export
 * @param {String} header
 * @throws {Error} Undefined argument
 * @throws {Error} Incorrect type argument
 * @throws {Error} Empty argument
 */
export function validateEntryHeader(header) {
  if (isUndefined(header)) throwRequiredError('header')
  if (!isString(header)) throwTypeError('header', 'string')
  if (header.length === 0) throwEmptyError('header')
}

/**
 * Validates the entry content
 * @export
 * @param {String} content
 * @throws {Error} Undefined argument
 * @throws {Error} Incorrect type argument
 * @throws {Error} Empty argument
 */
export function validateEntryContent(content) {
  if (isUndefined(content)) throwRequiredError('content')
  if (!isString(content)) throwTypeError('content', 'string')
  if (content.length === 0) throwEmptyError('content')
}

/**
 * Validates an entry
 * @export
 * @param {Object} entry
 * @param {Number} entry.id - Identifier of the entry
 * @param {String} entry.header - String of the header entry
 * @param {String} entry.content - String of the content entry
 * @throws {Error} Undefined arguments
 * @throws {Error} Incorrect type arguments
 */
export function validateEntry({id, header, content}) {
  validateId(id)
  validateEntryHeader(header)
  validateEntryContent(content)
}

/**
 * Validates if any of the entries have the same identifier
 * @export
 * @param {Object[]} entries
 * @param {Number} entries[].id - Identifier of the entry
 * @param {String} entries[].header - String of the header entry
 * @param {String} entries[].content - String of the content entry
 * @throws {Error} Any have the same identifier
 */
export function validateEntriesWithRepeatedId(entries) {
  const entriesId = entries.map(({id}) => id)
  const entriesIdIncluded = getRepeatedValues(entriesId)

  if (entriesIdIncluded.length > 0) {
    throwError(
      `entries with id [${entriesIdIncluded.join(
        ', '
      )}] already exist in entries`
    )
  }
}

/**
 * Validates entries
 * @export
 * @param {Object[]} entries
 * @param {Number} entries[].id - Identifier of the entry
 * @param {String} entries[].header - String of the header entry
 * @param {String} entries[].content - String of the content entry
 * @throws {Error} Undefined arguments
 * @throws {Error} Incorrect type arguments
 * @throws {Error} Invalid entries validation
 * @throws {Error} Any have the same identifier
 */
export function validateEntries(entries) {
  if (isUndefined(entries)) throwRequiredError('entries')
  if (!isArray(entries)) throwTypeError('entries', 'array')
  entries.forEach(validateEntry)
  validateEntriesWithRepeatedId(entries)
}

/**
 * Validates the root element
 * @export
 * @param {HTMLDListElement} element
 * @throws {Error} Undefined arguments
 * @throws {Error} Incorrect type arguments
 */
export function validateRootElement(element) {
  if (isUndefined(element)) throwRequiredError('element')
  if (!isHTMLElement(HTMLDListElement)(element))
    throwTypeError('element', 'HTMLDListElement')
}

/**
 * Validates ajax option
 * @export
 * @param {Object} ajax
 * @param {String} ajax.url - Url to make the request
 * @param {Function} ajax.processResults - Function to process the structure of the results of the request
 * @throws {Error} Undefined arguments
 * @throws {Error} Incorrect type arguments
 */
export function validateAjaxOption(ajax) {
  if (isUndefined(ajax)) throwRequiredError('ajax')

  const {url, processResults} = ajax

  if (isUndefined(url)) throwRequiredError('url')
  if (isUndefined(processResults)) throwRequiredError('processResults')

  if (!isString(url)) throwTypeError('url', 'string')
  if (!isFunction(processResults)) throwTypeError('processResults', 'function')
}

/**
 * Validates classes option
 * @export
 * @param {Object} classes
 * @param {String} classes.root - Root class for styles
 * @param {String} classes.header - Header class for styles
 * @param {String} classes.opened - Opened class for styles
 * @param {String} classes.content - Content class for styles
 * @throws {Error} Undefined arguments
 * @throws {Error} Incorrect type arguments
 */
export function validateClassesOption(classes) {
  if (isUndefined(classes)) throwRequiredError('classes')

  const {root, header, opened, content} = classes

  if (isUndefined(root)) throwRequiredError('root')
  if (isUndefined(header)) throwRequiredError('header')
  if (isUndefined(opened)) throwRequiredError('opened')
  if (isUndefined(content)) throwRequiredError('content')

  if (!isString(root)) throwTypeError('root', 'string')
  if (!isString(header)) throwTypeError('header', 'string')
  if (!isString(opened)) throwTypeError('opened', 'string')
  if (!isString(content)) throwTypeError('content', 'string')
}

/**
 * Validates setting options
 * @export
 * @param {Object} options
 * @param {Number} [options.openAt] - Indicates the item opened by default
 * @param {Boolean} [options.multiple] - Indicates if there are more than one item open
 * @param {Array} [options.entries] - Entries for make items
 * @param {Object} [options.ajax] - Object for make the request
 * @param {Object} [options.classes] - Object with classes for styles
 * @throws {Error} Undefined arguments
 * @throws {Error} Incorrect type arguments
 * @throws {Error} Invalid entries validation
 * @throws {Error} Any have the same identifier
 */
export function validateOptions(options) {
  if (options.hasOwnProperty('openAt')) {
    const {openAt} = options
    if (!isNumber(openAt)) throwTypeError('openAt', 'number')
  }
  if (options.hasOwnProperty('multiple')) {
    const {multiple} = options
    if (!isBoolean(multiple)) throwTypeError('multiple', 'boolean')
  }
  if (options.hasOwnProperty('entries')) {
    const {entries} = options
    validateEntries(entries)
  }
  if (options.hasOwnProperty('ajax')) {
    const {ajax} = options
    validateAjaxOption(ajax)
  }
  if (options.hasOwnProperty('classes')) {
    const {classes} = options
    validateClassesOption(classes)
  }
}

/**
 * Validates if an id exists in id of items
 * @export
 * @param {Number} id - Identifier of the item
 * @param {Object[]} items - Items to search the id
 * @param {Number} items[].id - Identifier of the item
 * @param {HTMLElement} items[].header - DT element
 * @param {HTMLElement} items[].content - DD element
 * @throws {Error} Identifier already exists
 */
export function validateIdInItems(id, items) {
  const included = existsIdInItems(id, items)
  if (included) throwError(`id ${id} already exist in items`)
}

/**
 * Validates if any of the entries id are in items
 * @export
 * @param {Array} entries
 * @param {Object[]} items - Items to search the id
 * @param {Number} items[].id - Identifier of the item
 * @param {HTMLElement} items[].header - DT element
 * @param {HTMLElement} items[].content - DD element
 * @throws {Error} Some id of entries already exist in items
 */
export function validateEntriesIdInItems(entries, items) {
  const entriesIdIncluded = entries
    .map(({id}) => id)
    .filter(id => existsIdInItems(id, items))

  if (entriesIdIncluded.length > 0) {
    throwError(
      `entries with id [${entriesIdIncluded.join(', ')}] already exist in items`
    )
  }
}
