//****************DEPENDENCIES***************
require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT ?? 4000;
const path = require("path");

app.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
