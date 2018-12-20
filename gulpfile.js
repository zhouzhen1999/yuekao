let gulp = require("gulp");
let sass = require("gulp-sass");
let server = require("gulp-webserver");
let fs = require("fs");
let url = require("url");
let path = require("path");
let data = require("./src/mock/data.json");
console.log(data)

gulp.task('sass', function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest('./src/css'));
});

gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("sass"))
})

gulp.task("server", function() {
    return gulp.src("src")
        .pipe(server({
            port: 9009,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                let pathname = url.parse(req.url).pathname;
                if (pathname == "/api/list") {
                    let { pagenum, limit, type, key } = url.parse(req.url, true).query;
                    var arr = [];
                    data.forEach(function(item) {
                        if (item.title.match(key) != null) {
                            arr.push(item);
                        }
                    })
                    let copyStr = arr.slice(0);
                    if (type == "desc") {
                        copyStr.sort(function(a, b) {
                            return a.money - b.money
                        })
                    } else if (type == "asc") {
                        copyStr.sort(function(a, b) {
                            return b.money - a.money
                        })
                    } else if (type == "credit") {
                        copyStr.sort(function(a, b) {
                            return a.credit - b.credit
                        })
                    }
                    let totle = Math.ceil(data.length / limit);
                    let target = copyStr.slice((pagenum - 1) * limit, pagenum * limit);
                    res.end(JSON.stringify({ code: 0, datas: target, totle: totle }))
                } else if (pathname == "/favicon.ico") {
                    return
                } else {
                    pathname = pathname == "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                }
            }
        }))
})