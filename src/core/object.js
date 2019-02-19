export function mergeOptions(defaults, settings) {
  // @TODO: protect and validate options
  const options = {...defaults, ...settings}
  return options
}
