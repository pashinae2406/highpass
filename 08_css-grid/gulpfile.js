const { src, dest, series, watch } = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const svgSprite = require('gulp-svg-sprite')
const image = require('gulp-image')
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const uglify = require('gulp-uglify-es').default
const gulpIf = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const fontsGoogle = require('gulp-google-fonts')
const browserSync = require('browser-sync').create()

'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
  return gulp.src('main/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('main/css'))
};

const isDev = process.argv.includes('--dev')
const isBuild = process.argv.includes('--build')

const clean = () => {
  return del(['dist'])
}

const resources = () => {
  return src('main/resources/**')
  .pipe(dest('dist'))
}

const fonts = () => {
  return src('main/fonts/**')
  .pipe(dest('dist/fonts'))
}

const styles = () => {
  return src('main/css/**/*.css')
  .pipe(gulpIf(isDev, sourcemaps.init()))
  .pipe(concat('style.css'))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(gulpIf(isBuild, cleanCss({
    level: 2
  })))
  .pipe(gulpIf(isDev, sourcemaps.write()))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const htmlMinify = () => {
  return src('main/**/*.html')
  .pipe(gulpIf(isBuild, htmlMin({
    collapseWhitespace: true
  })))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('main/images/svg/**/*.svg')
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(dest('dist/images'))
}

const scripts = () => {
  return src('main/js/**/*.js')
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(gulpIf(isBuild, babel({
      presets: ['@babel/env']
    })))
    .pipe(concat('app.js'))
    .pipe(gulpIf(isBuild, uglify({
      toplevel: true
    }).on('error', notify.onError())))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

const images = () => {
  return src(['main/images/**/*.jpg',
  'main/images/**/*.jpeg',
  'main/images/*.svg',
  'main/images/**/*.png'])
  .pipe(image())
  .pipe(dest('dist/images'))
}

watch('main/**/*.html', htmlMinify)
watch('main/scss/**/*.scss', buildStyles)
watch('main/css/**/*.css', styles)
watch('main/images/svg/**/*.svg', svgSprites)
watch('main/images/**', images)
watch('main/js/**/*.js', scripts)
watch('main/resources/**', resources)

const dev = series(clean, resources, htmlMinify, fonts, buildStyles, styles, scripts, images, svgSprites, watchFiles)
const build = series(clean, resources, htmlMinify, fonts, buildStyles, styles, scripts, images, svgSprites, watchFiles)

exports.dev = dev
exports.build = build

console.log('isDev', isDev)
console.log('isBuild', isBuild)

