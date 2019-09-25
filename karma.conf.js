// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies */
const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('webpack-merge');

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      // @ts-ignore
      files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // npm run test -- --grep test/foo/bar.test.js
        // npm run test -- --grep test/bar/*
        { pattern: config.grep ? config.grep : 'test/**/*.test.js', type: 'module' }
      ],

      esm: {
        nodeResolve: true,
        customBabelConfig: {
          plugins: [
            ['@babel/plugin-proposal-decorators', {
              decoratorsBeforeExport: true
            }],
            '@babel/plugin-proposal-class-properties',
            ['@babel/plugin-transform-runtime', {
              helpers: false,
              regenerator: true
            }],
            ['@babel/plugin-proposal-object-rest-spread', {
              useBuiltIns: true
            }]
          ]
        }
      },

      coverageIstanbulReporter: {
        thresholds: {
          global: {
            branches: 50
          }
        }
      }

      // you can overwrite/extend the config further
    })
  );
  return config;
};
