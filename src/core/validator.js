import {
  isUndefined,
  isNumber,
  isString,
  isBoolean,
  isArray,
  isFunction
} from '../utils/unit'
import {
  throwErrorRequired,
  throwErrorType,
  throwErrorTagName
} from '../utils/throw-error'
import {isHTMLElement, isTagName} from '../utils/dom'

export function validateEntry({id, header, content}) {
  if (isUndefined(id)) throwErrorRequired('id')
  if (isUndefined(header)) throwErrorRequired('header')
  if (isUndefined(content)) throwErrorRequired('content')

  if (!isNumber(id)) throwErrorType('id', 'number')
  if (!isString(header)) throwErrorType('header', 'string')
  if (!isString(content)) throwErrorType('content', 'string')
}

export function validateItem({id, header, content}, toCreate = false) {
  if (isUndefined(header)) throwErrorRequired('header')
  if (isUndefined(content)) throwErrorRequired('content')

  if (toCreate) {
    if (id && !isNumber(id)) throwErrorType('id', 'number')
  } else {
    if (isUndefined(id)) throwErrorRequired('id')
    if (!isNumber(id)) throwErrorType('id', 'number')
  }

  if (!isHTMLElement()(header)) throwErrorType('header', 'HTMLElement')
  else if (!isTagName('dt')(header)) throwErrorTagName('header', 'dt')

  if (!isHTMLElement()(content)) throwErrorType('content', 'HTMLElement')
  else if (!isTagName('dd')(content)) throwErrorTagName('content', 'dd')
}

export function validateElement(element) {
  if (isUndefined(element)) throwErrorRequired('element')
  if (!isHTMLElement(HTMLDListElement)(element))
    throwErrorType('element', 'HTMLDListElement')
}

export function validateAjaxOption(ajax) {
  const {url, processResults} = ajax

  if (isUndefined(url)) throwErrorRequired('url')
  if (isUndefined(processResults)) throwErrorRequired('processResults')

  if (!isString(url)) throwErrorType('url', 'string')
  if (!isFunction(processResults)) throwErrorType('processResults', 'function')
}

export function validateClassesOption(classes) {
  const {root, header, opened, content} = classes

  if (isUndefined(root)) throwErrorRequired('root')
  if (isUndefined(header)) throwErrorRequired('header')
  if (isUndefined(opened)) throwErrorRequired('opened')
  if (isUndefined(content)) throwErrorRequired('content')

  if (!isString(root)) throwErrorType('root', 'string')
  if (!isString(header)) throwErrorType('header', 'string')
  if (!isString(opened)) throwErrorType('opened', 'string')
  if (!isString(content)) throwErrorType('content', 'string')
}

export function validateOptions(options) {
  if (options.hasOwnProperty('openAt')) {
    const {openAt} = options
    if (!isNumber(openAt)) throwErrorType('openAt', 'number')
  }

  if (options.hasOwnProperty('multiple')) {
    const {multiple} = options
    if (!isBoolean(multiple)) throwErrorType('multiple', 'boolean')
  }

  if (options.hasOwnProperty('entries')) {
    const {entries} = options
    if (!isArray(entries)) throwErrorType('entries', 'array')
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
