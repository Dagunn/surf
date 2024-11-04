
const gulp = require('gulp');

// HTML
const fileInclude = require('gulp-file-include');
const htmlClean = require ('gulp-htmlclean');
const webpHTML = require('gulp-webp-html');
//HTML


// SASS
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const webpCss = require('gulp-webp-css');
// SASS

const liveServer = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const source = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const webp = require('gulp-webp');
const imageMin = require('gulp-imagemin');
const changed = require('gulp-changed');

// const media = require('gulp-group-css-media-queries');



gulp.task('clean:docs', function(done){
  if(fs.existsSync('./docs/')) {
    return gulp.src('./docs/', {read: false})
    .pipe(clean({force: true}));
  }
  done();
})

const notifyPlumber = (title) =>{
  return {
    errorHandler: notify.onError({
      title: title,
      message: 'Error<%= error.message %>',
      sound: false,
    }),
  };
}
gulp.task('html:docs', function(){
  return gulp.src('./src/*.html')
    .pipe(changed('./docs/'))
    .pipe(plumber(notifyPlumber('HTML')))
    .pipe(fileInclude({
      prefix: '@@',
      baspath: '@file'
    }))
    .pipe(webpHTML())
    .pipe(htmlClean())
    .pipe(gulp.dest('./docs/'))
})

gulp.task('sass:docs', function(){
  return gulp
    .src('./src/scss/*.scss')
    .pipe(changed('./docs/css/'))
    .pipe(notify(notifyPlumber('scss')))
    .pipe(source.init())
    .pipe(autoprefixer({overrideBrowserslist: ['last 10 version']}))
    .pipe(sassGlob())
    .pipe(webpCss())
    .pipe(sass())
    .pipe(csso())
    // .pipe(media())
    .pipe(source.write())
    .pipe(gulp.dest('./docs/css/'))
})

gulp.task('imgs:docs', function(){
  return gulp.src('./src/img/**/*')
    .pipe(changed('./docs/img/'))
    .pipe(webp())
    .pipe(gulp.dest('./docs/img/'))
    .pipe(gulp.src('./src/img/**/*'))
    .pipe(changed('./docs/img/'))
    .pipe(imageMin({verbose: true}))
    .pipe(gulp.dest('./docs/img/'))

})

gulp.task('fonts:docs', function(){
  return gulp.src('./src/fonts/**/*')
    .pipe(changed('./docs/fonts/'))
    .pipe(gulp.dest('./docs/fonts/'))
})

gulp.task('files:docs', function(){
  return gulp.src('./src/files/**/*')
    .pipe(changed('./docs/files/'))
    .pipe(gulp.dest('./docs/files/'))
})

gulp.task('js:docs', function(){
  return gulp
    .src('./src/js/*.js')
    .pipe(changed('./docs/js/'))
    .pipe(notify(notifyPlumber('JS')))
    .pipe(babel())
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./docs/js'))

})

gulp.task('server:docs', function(){
  return gulp.src('./docs')
    .pipe(liveServer({
      livereload: true,
      open: true
    }))
})



