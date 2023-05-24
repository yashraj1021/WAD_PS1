const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const studentSchema = require("./schemas/student");
const { resolveInclude } = require("ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/wadldb").then(() => {
  console.log("Connected");
});

const Student = mongoose.model("Student", {
  name: String,
  rollNo: Number,
  wad: Number,
  dsbda: Number,
  cns: Number,
  cc: Number,
  ai: Number,
});
const s1 = {
  name: "John Doe",
  rollNo: 33301,
  wad: 85,
  dsbda: 92,
  cns: 78,
  cc: 87,
  ai: 90,
};

const students = [
  {
    name: "John Doe",
    rollNo: 33301,
    wad: 85,
    dsbda: 92,
    cns: 78,
    cc: 87,
    ai: 90,
  },
  {
    name: "Jane Smith",
    rollNo: 33345,
    wad: 76,
    dsbda: 88,
    cns: 92,
    cc: 85,
    ai: 80,
  },
  {
    name: "Alice Johnson",
    rollNo: 33310,
    wad: 91,
    dsbda: 85,
    cns: 89,
    cc: 92,
    ai: 93,
  },
  {
    name: "Bob Thompson",
    rollNo: 33320,
    wad: 78,
    dsbda: 92,
    cns: 87,
    cc: 84,
    ai: 88,
  },
  {
    name: "Emma Davis",
    rollNo: 33355,
    wad: 83,
    dsbda: 90,
    cns: 86,
    cc: 91,
    ai: 89,
  },
  {
    name: "Michael Wilson",
    rollNo: 33367,
    wad: 86,
    dsbda: 82,
    cns: 91,
    cc: 88,
    ai: 82,
  },
  {
    name: "Olivia Taylor",
    rollNo: 33378,
    wad: 79,
    dsbda: 87,
    cns: 92,
    cc: 85,
    ai: 88,
  },
  {
    name: "William Brown",
    rollNo: 33383,
    wad: 90,
    dsbda: 91,
    cns: 84,
    cc: 88,
    ai: 92,
  },
  {
    name: "Sophia Anderson",
    rollNo: 33325,
    wad: 88,
    dsbda: 89,
    cns: 83,
    cc: 90,
    ai: 91,
  },
  {
    name: "James Thomas",
    rollNo: 33370,
    wad: 87,
    dsbda: 84,
    cns: 89,
    cc: 92,
    ai: 86,
  },
];

app.get("/", function (req, res) {
  // students.forEach((student) => {
  //   var snew = new Student({
  //     name: student.name,
  //     rollNo: student.rollNo,
  //     wad: student.wad,
  //     dsbda: student.dsbda,
  //     cns: student.cns,
  //     cc: student.cc,
  //     ai: student.ai,
  //   });
  //   snew.save().then(() => {
  //     console.log(`Inserted ${snew.name}`);
  //   });
  // });
  //console.log(students[0]);
  Student.find({ dsbda: { $gt: 20 } }).then((result) => {
    Student.find({
      dsbda: { $gt: 25 },
      wad: { $gt: 25 },
      cc: { $gt: 25 },
      ai: { $gt: 25 },
      cns: { $gt: 25 },
    }).then((mt25) => {
      Student.find({ wad: { $lt: 40 }, cns: { $lt: 40 } }).then((lt40) => {
        res.render("home", {
          totalCount: 10,
          dsbda: result,
          morethan25: mt25,
          lessthan40: lt40,
        });
      });
    });
  });
});

app.get("/display", function (req, res) {
  Student.find({})
    .then((result) => {
      //console.log(result);
      res.render("display", { students: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  const newStudent = new Student({
    name: req.body.name,
    rollNo: req.body.rollno,
    wad: 0,
    cns: 0,
    dsbda: 0,
    cc: 0,
    ai: 0,
  });
  newStudent.save().then(() => {
    console.log("New Student Created!");
  });
  res.redirect("/display");
});

app.get("/delete/:id", function (req, res) {
  Student.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Student deleted!");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/display");
});

app.get("/update/:id", function (req, res) {
  Student.findOne({ _id: req.params.id })
    .then((result) => {
      res.render("update", {
        student: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/update/:id", function (req, res) {
  Student.updateOne(
    { _id: req.params.id },
    {
      wad: req.body.wad,
      dsbda: req.body.dsbda,
      cns: req.body.cns,
      cc: req.body.cc,
      ai: req.body.ai,
    }
  )
    .then(() => {
      console.log("Updated Successfully!");
      res.redirect("/display");
    })
    .catch((err) => {
      console.log("Error");
    });
});

app.listen(3000, function () {
  console.log("Listening on port 3000");
});
