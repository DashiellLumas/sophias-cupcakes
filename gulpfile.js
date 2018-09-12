const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'client'
    },
  })
})

gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
})

gulp.task('clean:dist', function(){
  return del.sync('dist');
})

gulp.task('cache:clear', function(callback){
  return cache.clearAll(callback)
})

gulp.task('sass', function(){
  return gulp.src('client/scss/**/*.scss')
  .pipe(plumber({errorHandler:function(err){
    notify.onError({
      title: "Gulp error in" + err.plugin,
      message: err.toString()
    })(err);
    gutil.beep();
  }}))
  .pipe(sass())
  .pipe(gulp.dest('client/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('client/scss/**/*.scss', ['sass']);
  gulp.watch('client/*.html', browserSync.reload);
  gulp.watch('client/js/**/*.js', browserSync.reload);
})


gulp.task('useref', function(){
  return gulp.src('client/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
})

gulp.task('images', function(){
  return gulp.src('client/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
        interlaced: true
      })))
    .pipe(gulp.dest('dist/images'))
})

gulp.task('fonts', function(){
  return gulp.src('client/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})
