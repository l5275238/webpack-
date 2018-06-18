var gulp = require('gulp')
var scp2 = require('gulp-scp2');  //发布插件
var sequence = require('run-sequence');//同步插件11

gulp.task('text', function(){//发布到测试环境
    return gulp.src('dist/**')
        .pipe(scp2({
            host: '192.168.2.4',
            username: '',
            password: '',
            dest: ''
        }))
        .on('error', function(err) {
            throw err;
        });
});


gulp.task('pro', function(){//发布到生产环境
    return gulp.src('dist/**')
        .pipe(scp2({
            host: '47.94.215.56',
            username: 'root',
            password: 'gl123456.',
            dest: ''
        }))
        .on('error', function(err) {
            throw err;
        });
});


gulp.task('default', function(done){
    sequence(
        'dev',
        done
    )
});
