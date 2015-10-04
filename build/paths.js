var path = require('path');

var appRoot = 'src/';
var outputRoot = 'dist/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  style: 'styles/**/*.css',
  output: outputRoot,

  typings: {
    tsd: './typings/**/*.d.ts',
    aurelia: './jspm_packages/github/aurelia/**/*.d.ts'
  }

};
