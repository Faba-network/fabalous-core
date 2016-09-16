module.exports = function(gulp){
    var path = require('path');
    var nodemon = require('nodemon');
    var webpack = require('webpack');

    console.log(path.join(__dirname + "/../webpack/webpack.core.config.js"));

    var backendConfig = require(path.join(__dirname + "/../webpack/webpack.core.config.js"));
    function onBuild(done) {
        return function(err, stats) {
            if(err)console.error('Error', err);
            else console.log(stats.toString());
            if(done) done();
        }
    }

    gulp.task('backend-build', function(done) {
        webpack(backendConfig).run(onBuild(done));
    });

    gulp.task('backend-watch', ['backend-wbp'], function() {
        nodemon({
            execMap: {
                js: 'node'
            },
            script: path.join(__workDir, './dist/node/server.js'),
            ignore: ['*'],
            watch: ['foo/'],
            ext: 'noop'
        }).on('restart', function(){

        });
    });

    gulp.task('backend-wbp', function(done) {
        var firedDone = false;
        webpack(backendConfig).watch(100, function(err, stats) {
            console.error(err);
            console.log(stats);
            if(!firedDone) {
                firedDone = true;
                done();
            }
            nodemon.restart();
        });
    });

}

/*
var path = require('path');
var nodemon = require('nodemon');

var backendConfig = require(path.join(__dirname + "/../webpack/webpack.core.config.js"));
function onBuild(done) {
    return function(err, stats) {
        if(err)console.error('Error', err);
        else console.log(stats.toString());
        if(done) done();
    }
}

gulp.task('backend-build', function(done) {
    webpack(backendConfig).run(onBuild(done));
});

gulp.task('backend-watch', ['backend-wbp'], function() {
    nodemon({
        execMap: {
            js: 'node'
        },
        script: path.join(__dirname, "../../dist/node/server.js"),
        ignore: ['*'],
        watch: ['foo/'],
        ext: 'noop'
    }).on('restart', function(){

    });
});

gulp.task('backend-wbp', function(done) {
    var firedDone = false;
    webpack(backendConfig).watch(500, function(err, stats) {
        if(!firedDone) {
            firedDone = true;
            done();
        }
        nodemon.restart();
    });
});
 */