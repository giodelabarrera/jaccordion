import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'

import pkg from './package.json'

export default [
  // ES
  {
    input: 'src/index.js',
    output: {file: 'dist/jaccordion.esm.js', format: 'es', indent: false},
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: [
      babel({
        runtimeHelpers: true
      })
    ]
  },

  // ES for Browsers
  {
    input: 'src/index.js',
    output: {file: 'dist/jaccordion.mjs', format: 'es', indent: false},
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  },

  // UMD Development
  {
    input: 'src/index.js',
    output: {
      file: 'dist/jaccordion.js',
      format: 'umd',
      name: 'Jaccordion',
      indent: false
    },
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      commonjs(),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**'
      })
    ]
  },

  // UMD Production
  {
    input: 'src/index.js',
    output: {
      file: 'dist/jaccordion.min.js',
      format: 'umd',
      name: 'Jaccordion',
      indent: false
    },
    plugins: [
      nodeResolve({
        jsnext: true
      }),
      commonjs(),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**'
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  }
]
