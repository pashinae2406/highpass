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
const browserSync = require('browser-sync').create()

const isDev = process.argv.includes('--dev')
const isBuild = process.argv.includes('--build')

const clean = () => {
    return del(['dist'])
}

const resources = () => {
    return src('src/resources/**')
    .pipe(dest('dist'))
}

const styles = () => {
    return src('src/styles/**/*.css')
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(concat('main.css'))
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
    return src('src/**/*.html')
    .pipe(gulpIf(isBuild, htmlMin({
        collapseWhitespace: true,
    }))) 
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/images/svg**/*.svg')
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
    return src([
        'src/js/components/**/*.js',
        'src/js/main.js',
    ])
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
    return src([
        'src/images/**/*.jpg',
        'src/images/**/*.jpeg',
        'src/images/*.svg',
        'src/images/**/*.png',
    ])
    .pipe(image())
    .pipe(dest('dist/images'))
}

watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.css', styles)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)

// exports.styles = styles
// exports.scripts = scripts
// exports.htmlMinify = htmlMinify

const dev = series(clean, resources, htmlMinify, styles, scripts, images, svgSprites, watchFiles)
const build = series(clean, resources, htmlMinify, styles, scripts, images, svgSprites, watchFiles)

exports.dev = dev
exports.build = build

console.log('isDev', isDev)
console.log('isBuild', isBuild)