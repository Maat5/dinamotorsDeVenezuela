var gulp = require('gulp');
var clean = require('gulp-clean');
var stylus = require('gulp-stylus');
var minify = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var flatten = require('gulp-flatten');
var subree = require('gulp-subtree');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var gutil = require('gulp-util');
var nib = require('nib');
var browserSync = require('browser-sync');
var compress = require('compression');
var imageop = require('gulp-image-optimization');
var htmlmin = require('gulp-htmlmin');

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
    .pipe(browserSync.reload({stream:true}));
});
function bundle(b) {
  return b.bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())
    .pipe(uglify({mangle: false}))
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
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(flatten())
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({stream:true}));
});

/* Load Images */
gulp.task('images', function() {
  return gulp.src('./src/assets/img/*')
    .pipe(gulp.dest('build/assets/img'))
});
/* Load Images */
gulp.task('compressImages', function(cb) {
  return gulp.src(['./src/assets/img/*'])
    .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest('build/assets/img'));
});
/* Watch */
gulp.task('watch', function() {
  var b = browserify('./src/js/index.js', watchify.args);
  var w = watchify(b);
  w.on('update', function(){
    bundle(w);
  })
  .on('log', gutil.log);
  gulp.watch(['src/**/**/*.html'], ['templates']);
  gulp.watch(['src/**/**/*.styl'], ['stylus']);
  return bundle(w);
});

/* Server init */
gulp.task('browserSync', function(){
  browserSync({
    host: 'localhost',
    port: 3000,
    open: 'external',
    server: {
      baseDir: 'build/',
      middleware: [compress()]
    }
  })
});

/* Upload to production */
gulp.task('release', function(){
  return gulp.src('build')
    .pipe(subree({
      remote: 'origin',
      branch: 'test',
      message: 'Uploading to production'
    }));
});

/* Build */
gulp.task('build', [
  'stylus',
  'compressImages',
  'appScripts',
  'templates',
  'watch'
]);

/* Init app*/
gulp.task('default', ['clean'], function(){
  gulp.start('build');
  gulp.start('browserSync');
});
