const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Student = require("./models");
const dbConfig = require("./config");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/student")
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to database", err);
    process.exit();
  });

app.use("/css", express.static(path.resolve(__dirname, "static/css")));
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/addmarks", (req, res) => {
  var myData = new Student(req.body);
  myData
    .save()
    .then((item) => {
      console.log("item saved to database");
      res.redirect("/getMarks");
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});
app.get("/getMarks", (req, res) => {
  console.log(req.query);
  Student.find(req.query)
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      res.json({ message: "err" });
    });
});
app.get("/dsbdaGreaterThan20", (req, res) => {
  Student.find({ dsbda_marks: { $gt: 20 } })
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      res.json({ message: "err" });
    });
});

app.get("/updatestudent/:id", function (req, res) {
  Student.find(req.params.id)
    .then((student) => {
      res.render("update", {
        student: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/updatestudent/:id", function (req, res) {
  // Student.updateOne(
  //   { _id: req.params.id },
  //   {
  //     wad: req.body.wad,
  //     dsbda: req.body.dsbda,
  //     cns: req.body.cns,
  //     cc: req.body.cc,
  //     ai: req.body.ai,
  //   }
  // )
  var myData = new Student(req.body);
  myData
    .save()
    .then(() => {
      console.log("Updated Successfully!");
      res.redirect("/getMarks");
    })
    .catch((err) => {
      console.log("Error");
    });
});

app.get("/wadccGreaterThan40", (req, res) => {
  Student.find({ wad_marks: { $gt: 40 }, cc_marks: { $gt: 40 } })
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      res.json({ message: "err" });
    });
});

app.post("/deleteStudent/:id", (req, res) => {
  Student.findByIdAndDelete(req.params.id).then((student) => {
    console.log("Deleted Successfully");
    res.redirect("/getMarks");
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
