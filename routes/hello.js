var express = require("express");
var router = express.Router();

/* GET hello page. */
router.get("/", function (req, res, next) {
	const data = {
		title: "Hello",
		contents: "This is sample contents.",
	};
	res.render("hello", data);
});

module.exports = router;
