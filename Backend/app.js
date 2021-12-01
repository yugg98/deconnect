const express = require("express");
const fileUpload = require('express-fileupload')
const app = express();
const bodyParser = require('body-parser')
const user = require("./routes/userRoutes");
const post = require('./routes/postRoutes');
const message = require('./routes/MessageRoutes');
const cors = require("cors");
const path = require("path");

// app.use(bodyParser())
app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(cors());
app.use(fileUpload());

app.use("/api/v1", user);
app.use("/api/v1", post);
app.use("/api/v1", message);

app.use(express.static(path.join(__dirname, "./build")));

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
module.exports = app;