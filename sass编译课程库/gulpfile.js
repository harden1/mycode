var gulp=require("gulp");
var sass=require("gulp-sass");
gulp.task("sass",function(){
    return gulp.src("./src/css1.scss")
    .pipe(sass())
    .pipe(gulp.dest("./css"));
});
gulp.task("default",["sass"],function(){
    return gulp.pipe(gulp.dest("./dest"));
})
