
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static("public"));


var task = [" "];
var complete = [""];


app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

app.get("/", function(req, res) {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today  = new Date();
    let currentDay = (today.toLocaleDateString("en-US", options));
    res.render('index', {KindOfDay : currentDay, task: task, complete: complete });  
});

app.listen(3000, function() {
    console.log("server is running on port 3000");
});