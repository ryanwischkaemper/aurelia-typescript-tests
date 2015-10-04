var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('./tsconfig.json', {
  typescript: require('typescript'),
  noExternalResolve: true
});


// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('ts:build', function () {
  var tsResult = gulp.src([paths.source, paths.typings.tsd, paths.typings.aurelia])
    .pipe( sourcemaps.init({ loadMaps: true }))
    .pipe(ts(tsProject));

  return tsResult.js
    .pipe(sourcemaps.write({ includeContent: true }))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('html:build', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

// copies changed css files to the output directory
gulp.task('css:build', function () {
  return gulp.src(paths.css)
    .pipe(changed(paths.output, {extension: '.css'}))
    .pipe(gulp.dest(paths.output));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['ts:build', 'html:build', 'css:build'],
    callback
  );
});
