function presets(api) {
  const isTest = api.env('test')

  const test = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ]

  const defaults = [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false
      }
    ]
  ]

  return isTest ? test : defaults
}

function plugins(api) {
  return [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-async-to-generator',
    [
      '@babel/plugin-proposal-object-rest-spread',
      {loose: true, useBuiltIns: true}
    ]
  ]
}

module.exports = api => ({
  presets: presets(api),
  plugins: plugins(api)
})
