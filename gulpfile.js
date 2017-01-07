const browserSync = require('browser-sync').create();
const atImport = require('postcss-import');
const nested = require('postcss-nested');
const mqpacker = require('css-mqpacker');
const gulp = require('gulp');
const prefix = require('autoprefixer');
const cssnano = require('gulp-cssnano');
const inlinesource = require('gulp-inline-source');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');

const siteRoot = '_site';
const cssFiles = '_assets/css/*.css';
const cssSourceFiles = '_assets/css/**/*.css';
const htmlFiles = '_pages/**/*.html';
const siteHtmlFiles = '_site/**/*.html';

// CSS
gulp.task('css', function () {
  var processors = [
    atImport(),
    nested(),
    mqpacker(),
    prefix('> 5%')
  ];
  return gulp.src(cssFiles)
    .pipe(postcss(processors))
    .pipe(cssnano())
    .pipe(notify('css optimized'))
    .pipe(gulp.dest('_site/assets/css'));
});

// HTML
gulp.task('html', function () {
  return gulp.src(htmlFiles)
    .pipe(gulp.dest('_site'));
});

// Inline the CSS
gulp.task('inlinesource', ['css', 'html'], function () {
  return gulp.src(siteHtmlFiles)
    .pipe(inlinesource())
    .pipe(gulp.dest('_site'));
});

// BrowserSync
gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });

  // Watch
  gulp.watch(cssSourceFiles, ['inlinesource']);
  gulp.watch(htmlFiles, ['inlinesource']);
});

// Default
gulp.task('default', ['css', 'html', 'inlinesource', 'serve']);
