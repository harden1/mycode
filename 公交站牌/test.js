var gulp = require('gulp'),
    sass = require("gulp-sass");
gulp.task('sass',function () {
   return gulp.src('src/css.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});
gulp.task("default",["sass"],function(){
    gulp.pipe(gulp.dest("./css"));
})