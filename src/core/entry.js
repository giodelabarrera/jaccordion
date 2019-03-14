import {isUndefined, isArray} from '../utils/unit'
import {throwRequiredError, throwTypeError} from '../utils/throw-error'
import {callApi} from '../utils/service'
import {validateEntry} from './validator'

/**
 * Get entries from an ajax request
 * @export
 * @param {Object} ajax
 * @param {String} ajax.url - Url to make the request
 * @param {Function} ajax.processResults - Function to process the structure of the results of the request
 * @throws {Error} When a problem occurs in call to the api
 * @throws {Error} Undefined entries of processResults
 * @throws {Error} Incorrect type entries of processResults
 * @throws {Error} Invalid entries validation
 * @returns {Promise<Array>} Entries processed by processResults function
 */
export async function getEntriesByAjax(ajax) {
  const {url, processResults} = ajax
  const data = await callApi(url)
  const entries = processResults(data)

  if (isUndefined(entries)) throwRequiredError('entries')
  if (!isArray(entries)) throwTypeError('entries', 'array')
  entries.forEach(validateEntry)

  return entries
}
