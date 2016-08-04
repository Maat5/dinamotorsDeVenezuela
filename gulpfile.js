var gulp = require('gulp');
var clean = require('gulp-clean');
var stylus = require('gulp-stylus');
var minify = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var flatten = require('gulp-flatten');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var gutil = require('gulp-util');
var nib = require('nib');
var browserSync = require('browser-sync');


/* Clean task*/
gulp.task('clean', function() {
  return gulp.src('build/', { read: false })
    .pipe(clean());
});

/* Build CSS */
gulp.task('stylus', function() {
  return gulp.src('src/assets/css/' + 'app.styl')
    .pipe(stylus({
      use: [nib()]
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(minify())
    .pipe(gulp.dest('build/assets/css/'))
});
function bundle(b) {
  return b.bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.reload({stream:true}));
}
/* Concat repo JS*/
gulp.task('appScripts', function() {
  var b = browserify('./src/js/index.js');
  return bundle(b);
});

/* Load templates */
gulp.task('templates', function() {
  return gulp.src('src/templates' + '*/*.html')
    .pipe(flatten())
    .pipe(gulp.dest('build'));
});

/* Load Images */
gulp.task('images', function() {
  return gulp.src('app/assets/img/' + '*')
    .pipe(gulp.dest('build/assets/img'))
});
/* Watch */
gulp.task('watch', function() {
  var b = browserify('./src/js/index.js', watchify.args);
  var w = watchify(b)
    .on('update', bundle(w))
    .on('log', gutil.log);
  gulp.watch(['src/**/**/*.html'], ['templates']);
  return bundle(w);
});


/* Server init */
gulp.task('browserSync', function(){
  browserSync({
    host: 'localhost',
    port: 3000,
    // open: 'external',
    server: {
      baseDir: 'build/'
    }
  })
});


/* Build */
gulp.task('build', [
  'stylus',
  'images',
  'appScripts',
  'templates',
  'watch'
]);

/* Init app*/
gulp.task('default', ['clean'], function(){
  gulp.start('build');
  gulp.start('browserSync');
});
