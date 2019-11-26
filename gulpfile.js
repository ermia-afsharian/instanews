const gulp = require("gulp"); // Load Gulp!
// Now that we've installed the terser package we can require it:
const terser = require("gulp-terser"),
  rename = require("gulp-rename"),
  eslint = require("gulp-eslint"),
  sass= require('gulp-sass'),
  cssnano= require('gulp-cssnano'),
  autoprefixer= require('gulp-autoprefixer');

  const browserSync = require('browser-sync').create();

gulp.task('sass',function () {
  return gulp
  .src ('./sass/main.scss')
  .pipe(sass())
  .pipe(cssnano())
  .pipe(autoprefixer ({
    browsers: ["last 2 versions"]
  }) )
  .pipe(cssnano())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest('./build/css'))
})
gulp.task("scripts", function() {
  return gulp
    .src('./js/index.js') // What files do we want gulp to consume?
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(terser()) // Call the terser function on these files
    .pipe(rename( "index.min.js" )) // Rename the uglified file
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
  gulp.watch("sass/*.scss", gulp.series("sass", 'reload'));
  gulp.watch("./index.html",gulp.series("reload"));


});

gulp.task("default", gulp.parallel('browser-sync','watch'));
  