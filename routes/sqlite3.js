const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3");

// DBオブジェクトの取得
// ローカルの.sqlite3ファイルを指定する
const db = new sqlite3.Database("mydb.sqlite3");

router.get("/", (req, res, next) => {
	// DBのシリアライズ(並列でDBアクセスが行われないようにする)
	// 直列化することで引数の関数が順次実行される
	db.serialize(() => {
		// // allメソッド...SQL実行結果すべてのレコードを取得してからコールバック実行
		// db.all("select * from mydata", (err, rows) => {
		// 	// DBアクセス成功時
		// 	if (!err) {
		// 		const data = {
		// 			title: "Hello, sqlite3.",
		// 			content: rows,
		// 		};
		// 		res.render("sqlite3", data);
		// 	}
		// });
		let rows = [];
		// eachメソッド...SQL実行結果1行ごとにコールバック1実行
		// すべてのレコード取得後コールバック2実行
		db.each(
			"select * from mydata",
			// コールバック1(ageに"歳"を付与)
			(err, row) => {
				if (!err) {
					if (row.age) {
						row.age = row.age + "歳";
					}
				}
				rows.push(row);
			},
			// コールバック2(レンダリング)
			(err, count) => {
				if (!err) {
					const data = {
						title: "Hello, sqlite3",
						content: rows,
					};
					res.render("sqlite3", data);
				}
			}
		);
	});
});

module.exports = router;
