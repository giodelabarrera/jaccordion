// @TODO: test
export function getRepeatedValues(values) {
  return values.filter((value, index, array) => array.indexOf(value) !== index)
}
