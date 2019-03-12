import {isUndefined, isArray} from '../utils/unit'
import {throwRequiredError, throwTypeError} from '../utils/throw-error'
import {callApi} from '../utils/service'
import {validateEntry} from './validator'

/**
 * Gets the entries processed by the ajax
 * @param {Object} ajax - The ajax object
 * @param {String} ajax.url - The url to make the request
 * @param {Function} ajax.processResults - The processResults function to the results of the request
 * @throws {Error} Call api
 * @throws {Error} Required entries of processResults
 * @throws {Error} Incorrect type of entries of processResults
 * @throws {Error} Validation of entries
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
