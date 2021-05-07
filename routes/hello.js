var express = require("express");
var router = express.Router();

/* GET hello page. */
// 第一引数は/hello以降のURLを示す。
// "/"なら"/hello/"にアクセスしたときの処理
// "/ok"なら"/hello/ok"にアクセスした時の処理となる
// 要はこのスクリプトに/hello/*のルーティング処理をまとめる
router.get("/", (req, res, next) => {
	let msg = "Please send some message.";
	// セッションから取り出し
	if (req.session.message != undefined) {
		msg = "Last message:" + req.session.message;
	}
	const data = {
		title: "Hello",
		content: msg,
	};
	res.render("hello", data);
});

router.post("/post", (req, res, next) => {
	// Body Parserパッケージを利用することで, req.bodyからパラメータを取得可能
	// Express Generatorでは標準搭載なのでインストール不要
	const msg = req.body["message"];
	// セッションに保存
	req.session.message = msg;
	const data = {
		title: "Hello",
		content: "Last massage:" + req.session.message,
	};
	res.render("hello", data);
});

module.exports = router;
