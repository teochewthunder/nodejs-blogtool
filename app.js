var express = require("express");

var app = express();

var handlebars = require("express-handlebars").create({defaultLayout:"main"});
app.engine("handlebars", handlebars.engine);

app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("assets"));

const fs = require("fs");
const csv = require("csv-parser");

const changes = [];

fs.createReadStream("assets/csv/inputs.csv")
  .pipe(csv())
  .on("data", (row) => {
  	row.find = unescapeSpecialChars(row.find);
    changes.push(row);
 });

 function unescapeSpecialChars(str) {
  return str
    .replace(/\\t/g, '\t')
    .replace(/\\r\\n/g, '\r\n')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r');
}	

app.get("/", (req, res)=> {
	res.render("form", { textContent: "", message: "Paste your text in the box provided, then hit the PROCESS button." });
});

app.post("/process", (req, res)=> {
	let processedText = req.body.txtTextToProcess;

	for (let i = 0; i < changes.length; i++)
	{
		processedText = processedText.replaceAll(changes[i].find, changes[i].replace);
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