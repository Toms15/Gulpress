// Create Variables
var gulp 			          = require('gulp');
var $ 				          = require('gulp-load-plugins')();
var runSequence 	      = require('run-sequence');
var mainBowerFiles 	    = require('main-bower-files');
var browserSync 				= require("browser-sync").create();

// Task for SASS files.
gulp.task('sass', function () {
	return gulp.src('scss/**/*.scss')
	.pipe($.sass().on('error', $.sass.logError))
	.pipe($.autoprefixer({
		browsers: ['last 2 versions'],
		cascade: true
	}))
	.pipe($.cleanCss({compatibility: 'ie8'}))
	.pipe(gulp.dest('../css'))
	.pipe(browserSync.stream());
});

gulp.task('php', function() {
  return gulp.src('../**/*.php')
  .pipe(browserSync.stream());
})

// Task for JS files.
gulp.task('js', function() {
  return gulp.src('js/**/*.js')
  .pipe($.uglify())
  .pipe(gulp.dest('../js'))
  .pipe(browserSync.stream());
});

// Task for BOWER files. 
gulp.task('bower', function() {
    return gulp.src(mainBowerFiles(), {base: 'bower_components'})
        .pipe(gulp.dest('vendor'));
});

// Task for VENDOR JS files. 
gulp.task('vendor-js', () => {
  return gulp.src(['vendor/jquery/**/*.js', 'vendor/**/*.js'])
      .pipe($.concat('vendor.js'))
      .pipe($.uglify())
      .pipe(gulp.dest('../js'))
});

// Task for VENDOR CSS files.
gulp.task('vendor-css', () => {
  return gulp.src('vendor/**/*.css')
      .pipe($.concat('vendor.css'))
      .pipe($.cleanCss({compatibility: 'ie8'}))
      .pipe(gulp.dest('../css'))
});

// Task INJECT
gulp.task('inject', () => {
     runSequence('bower', ['vendor-css', 'vendor-js']);
});

// Task SERVE. Init Browser Sync
gulp.task('serve', function() {
	browserSync.init({
    // Your local server name
		// proxy: "example.dev"
	})
	gulp.watch("scss/**/*.scss", ['sass'])
	gulp.watch("js/**/*.js", ['js'])
	gulp.watch("../**/*.php", ['php'])
});