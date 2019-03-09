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
  throwTagNameError,
  throwError
} from '../utils/throw-error'
import {isHTMLElement, isTagName} from '../utils/dom'
import {existsIdInItems} from './item'
import {getRepeatedValues} from '../utils/array'

export function validateId(id) {
  if (isUndefined(id)) throwRequiredError('id')
  if (!isNumber(id)) throwTypeError('id', 'number')
}

export function validateEntryHeader(header) {
  if (isUndefined(header)) throwRequiredError('header')
  if (!isString(header)) throwTypeError('header', 'string')
}

export function validateEntryContent(content) {
  if (isUndefined(content)) throwRequiredError('content')
  if (!isString(content)) throwTypeError('content', 'string')
}

export function validateEntry({id, header, content}) {
  validateId(id)
  validateEntryHeader(header)
  validateEntryContent(content)
}

export function validateIdInItems(id, items) {
  const included = existsIdInItems(id, items)
  if (included) throwError(`id ${id} already exist in items`)
}

export function validateItem({id, header, content}, toCreate = false) {
  if (isUndefined(header)) throwRequiredError('header')
  if (isUndefined(content)) throwRequiredError('content')

  if (toCreate) {
    if (id && !isNumber(id)) throwTypeError('id', 'number')
  } else {
    if (isUndefined(id)) throwRequiredError('id')
    if (!isNumber(id)) throwTypeError('id', 'number')
  }

  if (!isHTMLElement()(header)) throwTypeError('header', 'HTMLElement')
  else if (!isTagName('dt')(header)) throwTagNameError('header', 'dt')

  if (!isHTMLElement()(content)) throwTypeError('content', 'HTMLElement')
  else if (!isTagName('dd')(content)) throwTagNameError('content', 'dd')
}

export function validateElement(element) {
  if (isUndefined(element)) throwRequiredError('element')
  if (!isHTMLElement(HTMLDListElement)(element))
    throwTypeError('element', 'HTMLDListElement')
}

export function validateAjaxOption(ajax) {
  const {url, processResults} = ajax

  if (isUndefined(url)) throwRequiredError('url')
  if (isUndefined(processResults)) throwRequiredError('processResults')

  if (!isString(url)) throwTypeError('url', 'string')
  if (!isFunction(processResults)) throwTypeError('processResults', 'function')
}

export function validateClassesOption(classes) {
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
    if (!isArray(entries)) throwTypeError('entries', 'array')
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

// @TODO: test
export function validateEntriesId(entries) {
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
