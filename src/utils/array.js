/**
 * Returns the values that are repeated
 * @export
 * @param {Array} values
 * @returns {Array} Repeated values
 */
export function getRepeatedValues(values) {
  return values.filter((value, index, array) => array.indexOf(value) !== index)
}
