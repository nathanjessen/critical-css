const prefix = require('autoprefixer');
const browserSync = require('browser-sync').create();
const mqpacker = require('css-mqpacker');
const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const immutableCss = require('immutable-css');
const atImport = require('postcss-import');
const nested = require('postcss-nested');
const reporter = require('postcss-reporter');
const styleGuide = require('postcss-style-guide');
const stylelint = require('stylelint');

const siteRoot = '_site';
const cssFiles = '_assets/css/*.css';
const cssSourceFiles = '_assets/css/**/*.css';

// CSS
gulp.task('css', function () {
  var processors = [
    atImport(),
    nested(),
    stylelint(),
    immutableCss({
      strict: true
    }),
    reporter({
      clearReportedMessages: true,
      noIcon: true
    }),
    mqpacker(),
    prefix('> 5%'),
    styleGuide({
      project: 'Critical CSS',
      dest: '_site/index.html'
    })
  ];

  return gulp.src(cssFiles)
    .pipe(postcss(processors))
    .pipe(cssnano())
    .pipe(notify('css optimized'))
    .pipe(gulp.dest('_site/assets/css'));
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
  gulp.watch(cssSourceFiles, ['css']);
});

// Default
gulp.task('default', ['css', 'serve']);
