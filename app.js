var express = require("express");

var app = express();

var handlebars = require("express-handlebars").create({defaultLayout:"main"});
app.engine("handlebars", handlebars.engine);

app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

app.use(require("body-parser")());
app.use(express.static("assets"));

app.get("/", (req, res)=> {
	res.render("form", { error: "", message: "Paste your text in the bo provied, then hit the PROCESS button." });
});

app.post("/process", (req, res)=> {
	const changes = [
		{
			"find": "<",
			"replace": "&lt;"
		},
		{
			"find": ">",
			"replace": "&gt;"
		},
		{
			"find": "  ",
			"replace": "&nbsp;&nbsp;"
		},
		{
			"find": "\r\n",
			"replace": "<br />"
		},
		{
			"find": "c---",
			"replace": '<div class="post_box code">'
		},
		{
			"find": "r---",
			"replace": '<div class="post_box result">'
		},
		{
			"find": "---d",
			"replace": "</div>"
		}												
	];

	//use req.body
});

app.use((req, res, next)=> {
	res.status(404);
	res.render("404");
});

app.use((err, req, res, next)=> {
	res.status(500);
	res.render("500", { errorMessage: err.code });
});

app.listen(app.get("port"), ()=> {

});