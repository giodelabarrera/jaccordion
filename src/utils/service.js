/**
 * Make asynchronous requests to a url.
 * Process the result to json format
 * @export
 * @param {string} url
 * @throws {Error} By failing something in the process
 * @returns {*} Returned data
 */
export async function callApi(url) {
  let data = {}
  try {
    const response = await fetch(url)
    data = await response.json()
  } catch ({message}) {
    throw new Error(message)
  }
  return data
}
