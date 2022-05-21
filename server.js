//****************DEPENDENCIES***************
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT ?? 4000;
const path = require("path");
const cors = require("cors");
const prisma = new PrismaClient();

//****************MIDDLEWARE***************//
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json()); //to access req.body

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}
console.log("dirname:", __dirname);

//****************ROUTES***************//
// app.use('/daybits/journal', journalController);
// app.use('/daybits/register', usersController);
// app.use('/daybits/comments', CommentsController);

// app.get("/", (req, res) => {
//   res.json({ msg: "Hello World!" });
// });

//create a job
app.post("/", async (req, res) => {
  const jobs = await prisma.jobs.findMany();
  res.json({ jobs });
});

//get a job
app.get("/:job_id", (req, res) => {});

//delete a job
app.get("/:job_id", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
