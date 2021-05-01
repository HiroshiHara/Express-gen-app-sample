var createError = require("http-errors"); // HTTPエラー処理
var express = require("express"); // Express本体
var path = require("path"); // ファイルパス処理
var cookieParser = require("cookie-parser"); // クッキーのパース処理
var logger = require("morgan"); // HTTPリクエストのログ出力

// ルーティング用モジュールのロード
// 各URLへのアクセス時の処理を個別にrouteフォルダに用意し、
// それぞれサーバ起動前にロードしている。
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var helloRouter = require("./routes/hello");

// Expressモジュールの作成
var app = express();

// view engine setup
// app.setでアプリケーションの基本設定を行う。
// views:テンプレートファイル(今回はejs)がおかれる場所を指定
// view engine:テンプレートエンジンの種類
// (__dirname:現在のディレクトリのパス(つまりapp.jsがある階層))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.useで組み込み関数(アプリケーションのミドルウェア)をセット
app.use(logger("dev")); // ログ出力レベルをdevにセット
app.use(express.json()); // jsonリクエストをパース出来るようにする
app.use(express.urlencoded({ extended: false })); // URLエンコードされたPOSTリクエストをjsonで解析できるようにする
app.use(cookieParser()); // リクエスト内のcookieを解析できるようにする
app.use(express.static(path.join(__dirname, "public"))); // アプリケーションの静的ファイルの場所をセット

// 各URLへのアクセス時の関連付け
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/hello", helloRouter);

// catch 404 and forward to error handler
// 不正なURLにアクセスされたとき404エラーを出す
// "/", "/users"以外にアクセスされればこの関数が実行され、
// next関数の処理をcreateErrorに移譲することで404エラーを実現している。
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
// 404エラー以外のハンドラ
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
