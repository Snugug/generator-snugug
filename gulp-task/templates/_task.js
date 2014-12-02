'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var gutil = require('gulp-util')<% if (!browserSync) { %>;<% } else { %>,
    browserSync = require('browser-sync'),
    reload = browserSync.reload;<% } %>

//////////////////////////////
// Internal Vars
//////////////////////////////
var to<%= classy %> = [
  <%= runPaths %>
];

//////////////////////////////
// Export
//////////////////////////////
module.exports = function (gulp, <%= classy %>Paths) {
  // Set value of paths to either the default or user entered
  <%= classy %>Paths = <%= classy %>Paths || to<%= classy %>;

  //////////////////////////////
  // Encapsulate task in function to choose path to work on
  //////////////////////////////
  var <%= classy %>Task = function (path) {
    return gulp.src(<%= classy %>Paths)<% if (!browserSync) { %>;<% } else { %>
      .pipe(reload({stream: true}));<% } %>
  }

  //////////////////////////////
  // Core Task
  //////////////////////////////
  gulp.task('<%= slug %>', function () {
    return <%= classy %>Task(<%= classy %>Paths);
  });

  //////////////////////////////
  // Watch Task
  //////////////////////////////
  gulp.task('<%= slug %>:watch', function () {
    return gulp.watch(<%= classy %>Paths)
      .on('change', function (event) {
        // Add absolute and relative (to Gulpfile) paths
        event.path = {
          absolute: event.path,
          relative: event.path.replace(__dirname.replace('/tasks', '') + '/', '')
        }

        // Notify user of the change
        gutil.log('File ' + gutil.colors.magenta(event.path.relative) + ' was ' + event.type);

        // Call the task
        return <%= classy %>Task(event.path.absolute);
      });
  });
}
