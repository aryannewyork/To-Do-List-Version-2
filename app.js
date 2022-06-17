const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

items = ["Buy Food", "Cook Food", "Eat Food"];
workItems = [];

app.get("/", function (req, res) {
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("index", {
        listName: day,
        listItems: items
    });

});

app.get("/work", function (req, res) {
    res.render("index", {
        listName: "Work",
        listItems: workItems
    });
})

app.post("/", function (req, res) {
    if (req.body.button == "Work") {
        workItems.push(req.body.newItem);
        res.render("index", {
            listName: req.body.button,
            listItems: workItems
        });
    }
    else {
        items.push(req.body.newItem);
        res.render("index", {
            listName: req.body.button,
            listItems: items
        });
    }
});



app.listen(3000, function () {
    console.log("Server is up and running...");
});