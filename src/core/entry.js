import {isUndefined, isArray} from '../utils/unit'
import {throwErrorRequired, throwErrorType} from '../utils/throw-error'
import {callApi} from '../utils/service'
import {validateEntry, validateAjaxOption} from './validator'

export async function getEntriesByAjax(ajax) {
  if (isUndefined(ajax)) throwErrorRequired('ajax')
  validateAjaxOption(ajax)

  const {url, processResults} = ajax
  const data = await callApi(url)
  let entries = processResults(data)

  if (isUndefined(entries)) throwErrorRequired('entries')
  if (!isArray(entries)) throwErrorType('entries', 'array')

  entries.forEach(validateEntry)

  return entries
}
