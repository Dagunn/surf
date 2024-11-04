const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const liveServer = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const source = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const changed = require('gulp-changed');
const babel = require('gulp-babel');
const imageMin = require('gulp-imagemin');

gulp.task('clean:dev', function (done) {
  if (fs.existsSync('./build/')) {
    return gulp.src('./build/', { read: false })
      .pipe(clean({ force: true }));
  }
  done();
})

const notifyPlumber = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: 'Error<%= error.message %>',
      sound: false,
    }),
  };
}

gulp.task('html:dev', function () {
  return gulp.src('./src/*.html', '!./src/html/blocs/*.html')
    .pipe(changed('./build/', { hasChanged: changed.compareContents }))
    .pipe(plumber(notifyPlumber('HTML')))
    .pipe(fileInclude({
      prefix: '@@',
      baspath: '@file'
    }))
    .pipe(gulp.dest('./build/'))
})

gulp.task('sass:dev', function () {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(changed('./build/css'))
    .pipe(notify(notifyPlumber('scss')))
    .pipe(source.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(source.write())
    .pipe(gulp.dest('./build/css/'))
})

gulp.task('imgs:dev', function () {
  return gulp.src('./src/img/**/*')
    .pipe(changed('./build/img'))
    // .pipe(imageMin({verbose: true}))
    .pipe(gulp.dest('./build/img/'))
})

gulp.task('fonts:dev', function () {
  return gulp.src('./src/fonts/**/*')
    .pipe(changed('./build/fonts'))
    .pipe(gulp.dest('./build/fonts/'))
})

gulp.task('files:dev', function () {
  return gulp.src('./src/files/**/*')
    .pipe(changed('./build/files'))
    .pipe(gulp.dest('./build/files/'))
})

gulp.task('js:dev', function () {
  return gulp
    .src('./src/js/**/*.js') // Выбираем все .js файлы, включая подкаталоги
    .pipe(changed('./build/js'))
    .pipe(notify(notifyPlumber('JS')))
    // .pipe(babel())
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./build/js'))
});


// Новая задача для копирования wow.js в папку build
gulp.task('libs:dev', function () {
  return gulp.src('./src/js/wow.js') // путь к wow.js
    .pipe(gulp.dest('./build/js')); // копирование в папку назначения
})

gulp.task('server:dev', function () {
  return gulp.src('./build')
    .pipe(liveServer({
      livereload: true,
      open: true
    }))
})

gulp.task('watch:dev', function () {
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'));
  gulp.watch('./src/**/*html', gulp.parallel('html:dev'));
  gulp.watch('./src/img/**/*', gulp.parallel('imgs:dev'));
  gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'));
  gulp.watch('./src/files/**/*', gulp.parallel('files:dev'));
  gulp.watch('./src/js/**/*js', gulp.parallel('js:dev', 'libs:dev'));
})
