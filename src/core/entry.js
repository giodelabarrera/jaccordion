import {
  isUndefined,
  isNumber,
  isString,
  isFunction,
  isArray
} from '../utils/unit'
import {throwErrorRequired, throwErrorType} from '../utils/throw-error'
import {callApi} from '../utils/service'

export function validateEntry({id, header, content}) {
  if (isUndefined(id)) throwErrorRequired('id')
  if (isUndefined(header)) throwErrorRequired('header')
  if (isUndefined(content)) throwErrorRequired('content')

  if (!isNumber(id)) throwErrorType('id', 'number')
  if (!isString(header)) throwErrorType('header', 'string')
  if (!isString(content)) throwErrorType('content', 'string')
}

export async function getEntriesByAjax(ajax) {
  if (isUndefined(ajax)) throwErrorRequired('ajax')

  const {url, processResults} = ajax

  if (isUndefined(url)) throwErrorRequired('url')
  if (isUndefined(processResults)) throwErrorRequired('processResults')

  if (!isString(url)) throwErrorType('url', 'string')
  if (!isFunction(processResults)) throwErrorType('processResults', 'function')

  const data = await callApi(url)
  let entries = processResults(data)

  if (isUndefined(entries)) throwErrorRequired('entries')
  if (!isArray(entries)) throwErrorType('entries', 'array')

  entries.forEach(validateEntry)

  return entries
}
