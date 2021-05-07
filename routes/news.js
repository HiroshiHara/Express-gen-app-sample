const express = require("express");
const router = express.Router();
const https = require("https");
const parseString = require("xml2js").parseString; //xmlを解析する

router.get("/", (req, res, next) => {
	const opt = {
		host: "news.google.com",
		port: 443,
		path: "/rss?hl=ja&ie=UTF-8&oe=UTF-8&gl=JP&ceid=JP:ja",
	};
	// 外部RSS提供サイトにGETリクエストを送信し、xml形式で受信する
	https.get(opt, (res2) => {
		// console.log(JSON.stringify(res2.headers));
		let body = "";
		res2.on("data", (data) => {
			body += data;
		});
		res2.on("end", () => {
			parseString(body.trim(), (err, result) => {
				const data = {
					title: "Google News",
					content: result.rss.channel[0].item,
				};
				res.render("news", data);
			});
		});
	});
});

module.exports = router;
