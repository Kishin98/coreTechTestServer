const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const { Entropy } = require("entropy-string");
const app = express();
const port = 3000;
var dbConnection = require("./src/db");

app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 2 * 1024 * 1024 * 1024, //2MB max file size
    },
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  var query = "SELECT * FROM candidates ORDER BY createdAt desc";
  dbConnection.query(query, (err, rows) => {
    if (err) {
      //TODO: proper error handeling
      console.log("Error");
    } else {
      var r = Object.values(JSON.parse(JSON.stringify(rows)));
      res.json({ message: r });
    }
  });
});

app.get("/download/:id", (req, res) => {
  res.download(`./uploads/${req.params.id}`);
});

app.post("/", (req, res) => {
  var file = "no file";
  if (req.files) {
    let cv = req.files.curriculum;
    const extention = cv.name.includes(".pdf") ? ".pdf" : ".doc";
    const entropy = new Entropy();
    const fileName = entropy.string() + extention;
    cv.mv("./uploads/" + fileName);
    file = fileName;
    console.log(`Uploaded ${cv.name} as ${fileName} !`);
  }
  var values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.phone,
    req.body.age,
    req.body.education,
    req.body.jobClass,
    req.body.jobLocation,
    req.body.jobDetail,
    file,
  ];
  var query =
    "INSERT INTO candidates (firstName, lastName, email, phone, age, education, jobClass, jobLocation, jobDetail, curriculum) VALUES (?,?,?,?,?,?,?,?,?,?)";
  dbConnection.query(query, values, function (err, result) {
    if (err) {
      //TODO: proper error handeling
      console.log("Error post");
    } else {
      res.json({ message: "inserted correctly!" });
      console.log("Data inserted correctly!");
    }
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
