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

//****************CONTROLLERS***************//
const UsersController = require("./controllers/UsersController.js");

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
app.use("/api/register", UsersController);
// app.use('/daybits/comments', CommentsController);

//get all jobs
// app.get("/", async (req, res) => {
//   const jobs = await prisma.jobs.findMany({ include: { author: true } });
//   res.json({ jobs });
// });

//create a user
// app.post("/", async (req, res) => {
//   const jobs = await prisma.user.create({
//     data: {
//       destination: "US",
//       job_title: "Going to US for 20 days",
//       job_body: "this is a body for US job",
//       num_days: 20,
//       pay: 30,
//       authorId: 2,
//     },
//   });
//   res.json({ jobs });
// });

//create a job
// app.post("/", async (req, res) => {
//   const jobs = await prisma.jobs.create({
//     data: {
//       destination: "US",
//       job_title: "Going to US for 20 days",
//       job_body: "this is a body for US job",
//       num_days: 20,
//       pay: 30,
//       authorId: 2,
//     },
//   });
//   res.json({ jobs });
// });

//get a job
// app.get("/:job_id", async (req, res) => {
//   const job = await prisma.jobs.findUnique({
//     where: {
//       id: 2,
//     },
//   });
//   res.json({ job });
// });

//delete a job
// app.post("/:job_id", async (req, res) => {
//   const job = await prisma.jobs.delete({
//     where: { id: 2 },
//   });
//   res.json({ job });
// });

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
