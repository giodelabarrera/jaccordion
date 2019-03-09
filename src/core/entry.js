import {isUndefined, isArray} from '../utils/unit'
import {throwRequiredError, throwTypeError} from '../utils/throw-error'
import {callApi} from '../utils/service'
import {validateEntry, validateAjaxOption} from './validator'

export async function getEntriesByAjax(ajax) {
  if (isUndefined(ajax)) throwRequiredError('ajax')
  validateAjaxOption(ajax)

  const {url, processResults} = ajax
  const data = await callApi(url)
  const entries = processResults(data)

  if (isUndefined(entries)) throwRequiredError('entries')
  if (!isArray(entries)) throwTypeError('entries', 'array')

  entries.forEach(validateEntry)

  return entries
}
