const siteRoot = 'dist';
const cssFiles = 'css/*.css';

const prefix = require('autoprefixer');
const browserSync = require('browser-sync').create();
const mqpacker = require('css-mqpacker');
const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const size = require('gulp-size');
const sourcemaps = require('gulp-sourcemaps');
const immutableCss = require('immutable-css');
const atImport = require('postcss-import');
const nested = require('postcss-nested');
const reporter = require('postcss-reporter');
const styleGuide = require('postcss-style-guide');
const stylelint = require('stylelint');

// CSS
gulp.task('css', function () {
  var processors = [
    atImport(),
    nested(),
    stylelint(),
    immutableCss(),
    reporter({
      clearReportedMessages: true,
      noIcon: true
    }),
    mqpacker(),
    prefix('> 5%'),
    styleGuide({
      project: 'Critical CSS',
      dest: siteRoot + '/index.html'
    })
  ];

  return gulp.src('css/critical.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(siteRoot))
    .pipe(cssnano())
    .pipe(size())
    .pipe(rename({extname: '.min.css'}))
    .pipe(notify('css optimized'))
    .pipe(gulp.dest(siteRoot));
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
  gulp.watch(cssFiles, ['css']);
});

// Default
gulp.task('default', ['css', 'serve']);
