let gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-cssmin'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    minifyjs = require('gulp-js-minify'),
    tingpng = require('gulp-tinypng'),
    browserSync   = require('browser-sync');


gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'www'
        },
        notify: false
    });
});

gulp.task('style:build', () => {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        // .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js:build', () =>
    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minifyjs())
        .pipe(gulp.dest('dist/js/'))
);

gulp.task('fonts:build', () =>
    gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts/'))
);

gulp.task('tinypng:build', () => {
    gulp.src('dist/img/**/*.*')
        .pipe(tingpng('D7rjw4lXFTG6Vz6TJ4534pz2xbl89pZK'))
        .pipe(gulp.dest('dist/img/'))
});



gulp.task('build', [
    'js:build',
    'style:build',
    'fonts:build',
    'tinypng:build'
]);

gulp.task('watch', ['browser-sync', 'style:build','js:build'], function () {

    watch('src/sass/**/*.scss', function(event, cb) {
        gulp.start('style:build');
    });

    watch('src/js/**/*.js', function(event, cb) {
        gulp.start('js:build');
    });
    // //
    // // // watch('src/img/**/*.*', function(event, cb) {
    // // //     gulp.start('tinypng:build');
    // // // });
    // // //
    watch('src/fonts/**/*.*', function(event, cb) {
        gulp.start('fonts:build');
    });

});

gulp.task('default', ['build','watch']);
