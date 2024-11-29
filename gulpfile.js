import browserSync from 'browser-sync';
import gulp from 'gulp';
import cssnano from 'cssnano';
import notify from 'gulp-notify';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import size from 'gulp-size';
import atVariables from 'postcss-at-rules-variables';
import atImport from 'postcss-import';
import reporter from 'postcss-reporter';
import stylelint from 'stylelint';
import postcssPresentEnv from 'postcss-preset-env';
import postcssNesting from 'postcss-nesting';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssEach from 'postcss-each';

const siteRoot = 'docs';
const cssFiles = ['index.css', 'lib/*.css'];
const bs = browserSync.create();

// CSS processing
function css() {
  const processors = [
    atImport(),
    stylelint(),
    reporter({ clearReportedMessages: true, noIcon: true }),
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

  return gulp.src('index.css')
    .pipe(postcss(processors))
    .on('error', function(err) {
      notify.onError({
        title: "CSS Error",
        message: "Error: <%= error.message %>"
      })(err);
      this.emit('end');
    })
    .pipe(size())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(notify('css optimized'))
    .pipe(gulp.dest(siteRoot))
    .pipe(bs.stream());
}

// Development server
function serve(done) {
  bs.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot,
    },
  }, done);
}

// Watch task
function watchFiles(done) {
  gulp.watch(cssFiles, css).on('error', done);
  done();
}

// Build task
const build = gulp.series(css);
gulp.task('build', build);

// Default task
gulp.task('default', gulp.series(css, gulp.parallel(serve, watchFiles)));
