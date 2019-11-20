const gulp = require("gulp"); // Load Gulp!
// Now that we've installed the terser package we can require it:
const terser = require("gulp-terser"),
  rename = require("gulp-rename"),
  eslint = require("gulp-eslint");

  const browserSync = require('browser-sync').create();

gulp.task("scripts", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(terser()) // Call the terser function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
gulp.task('reload',function(done) {
  browserSync.reload();
  done();
})
gulp.task("watch", function() {
  gulp.watch("js/*.js", gulp.series("scripts"));
  gulp.watch("./index.html",gulp.series("reload"));


});

gulp.task("default", gulp.parallel('browser-sync','watch'));
  