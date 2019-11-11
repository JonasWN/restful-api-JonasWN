module.exports = function (router) {
	router.get("/", function (req, res) {
		res.send({
			message: "Hello, World!"
		});
	});
};