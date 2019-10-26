import ejs from 'rollup-plugin-emit-ejs';
import resolve from 'rollup-plugin-node-resolve';
import html from 'rollup-plugin-html-minifier';
import babel from 'rollup-plugin-babel';
import analyze from 'rollup-plugin-analyzer';
import { string } from 'rollup-plugin-string';
// import { terser as uglify } from 'rollup-plugin-terser';

const output = [];

output.push({
  input: './src/index.js',
  output: {
    file: './public/index.js',
    format: 'esm'
  },
  cache: true,
  plugins: [
    // resolve({
    //   dedupe: [ '@vaadin/vaadin-button' ]
    // }),
    resolve(),
    string({
      // Required to be specified
      include: 'src/modules/**/*.css'
    }),
    ejs({
      src: 'src',
      layout: 'src/layout/layout.html.ejs',
      options: {},
      data: {
        app: {},
        theme: {
          webApp: {}
        }
      }
    }),
    html(),

    babel({
      babelrc: false,
      plugins: [
        ['@babel/plugin-proposal-decorators', { 'decoratorsBeforeExport': true }],
        '@babel/plugin-proposal-class-properties'
      ]
    }),
    // uglify(),
    analyze()
  ]
});

export default output;
