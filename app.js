var express = require("express");

var app = express();

var handlebars = require("express-handlebars").create({defaultLayout:"main"});
app.engine("handlebars", handlebars.engine);

app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("assets"));

app.get("/", (req, res)=> {
	res.render("form", { textContent: "", message: "Paste your text in the bo provied, then hit the PROCESS button." });
});

app.post("/process", (req, res)=> {
	//console.log(req.body);
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

	let processedText = req.body.txtTextToProcess;

	for (let i = 0; i < changes.length; i++)
	{
		processedText = processedText.replaceAll(changes[i].find, changes[i].replace);
		console.log("Replaced", changes[i].find, changes[i].replace);
	}

	res.render("form", { textContent: processedText, message: "Text processed." });
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