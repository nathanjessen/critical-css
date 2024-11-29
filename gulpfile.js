const siteRoot = 'docs';
const projectName = 'Critical CSS';
const cssFiles = ['index.css', 'lib/*.css'];

const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const cssnano = require('cssnano');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const size = require('gulp-size');
const sourcemaps = require('gulp-sourcemaps');
const atVariables = require('postcss-at-rules-variables');
const atImport = require('postcss-import');
const reporter = require('postcss-reporter');
const stylelint = require('stylelint');
const postcssPresentEnv = require('postcss-preset-env');
const postcssNesting = require('postcss-nesting');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssEach = require('postcss-each');

// CSS
gulp.task('css', function () {
  var processors = [
    atImport(),
    stylelint(),
    reporter({
      clearReportedMessages: true,
      noIcon: true,
    }),
    atVariables(),
    postcssEach(),
    postcssNesting(),
    postcssCustomProperties(),
    postcssPresentEnv({
      browsers: ['last 2 versions', '> 5%', 'not ie < 11'],
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true,
      },
    }),
    cssnano(),
  ];

  return gulp
    .src('index.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(size())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(notify('css optimized'))
    .pipe(gulp.dest(siteRoot))
    .pipe(browserSync.stream());
});

// BrowserSync
gulp.task('serve', () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot,
    },
  });

  // Watch
  gulp.watch(cssFiles, gulp.series('css'));
});

// Default
gulp.task('default', gulp.series('css', 'serve'));
