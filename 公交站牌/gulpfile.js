//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'); //本地安装gulp所用到的地方
var sass = require('gulp-sass');
var uglify=require("gulp-uglify");
var cssmin=require("gulp-minify-css");
var minifyHtml=require("gulp-minify-html");
// 定义一个sass的任务
gulp.task('sass', function () {
  return gulp.src('./src/*.scss')   //该任务针对的文件
  .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));  //将会在dist/css下生成*.css
});

// 监听sass编译 自动执行sass任务，编译监听sass并生成css文件
gulp.task('sass:watch', function () {
    gulp.watch('./src/*.scss', ['sass']);
});

 //引入gulp插件browser-sync
 var browserSync = require('browser-sync').create();
// 静态服务器 + 监听 scss/html/js 文件
gulp.task('browser-sync', function() {
    browserSync.init({ //初始化项目跟目录为'./'
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('*.html').on('change', browserSync.reload);            //监听html文件的变化，自动重新载入
    gulp.watch('./css/*.css').on('change', browserSync.reload);    //监听css文件的变化，自动重新载入
    gulp.watch('./js/*.js').on('change', browserSync.reload);      //监听js文件的变化，自动重新载入

});
//压缩js
gulp.task('script', function() {
  return gulp.src('./js/*.js') //压缩的文件
  .pipe(uglify())
  .pipe(gulp.dest('./dist')) //输出文件夹
});
//压缩css
gulp.task('testCssmin', function () {
    gulp.src('./css/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./stylesheet'));
});
//压缩html
gulp.task('minify-html', function () {
    gulp.src('./*.html') // 要压缩的html文件
    .pipe(minifyHtml()) //压缩
    .pipe(gulp.dest('./'));
});
//默认启动的gulp任务数组['browser-sync', 'sass:watch']
gulp.task('default', ['browser-sync', 'sass:watch','script','testCssmin','minify-html']);