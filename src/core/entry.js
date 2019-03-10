import {isUndefined, isArray} from '../utils/unit'
import {throwRequiredError, throwTypeError} from '../utils/throw-error'
import {callApi} from '../utils/service'
import {validateEntry} from './validator'

export async function getEntriesByAjax(ajax) {
  const {url, processResults} = ajax
  const data = await callApi(url)
  const entries = processResults(data)

  if (isUndefined(entries)) throwRequiredError('entries')
  if (!isArray(entries)) throwTypeError('entries', 'array')
  entries.forEach(validateEntry)

  return entries
}
