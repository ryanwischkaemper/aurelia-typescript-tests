var gulp = require('gulp');
var KarmaServer = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  var server = new KarmaServer({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: true
  }, done).start();

});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  var server = new KarmaServer({
    configFile: __dirname + '/../../karma.conf.js'
  }, done).start();
});


