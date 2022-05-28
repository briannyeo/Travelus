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
const cookieParser = require("cookie-parser");

//****************CONTROLLERS***************//
const UsersController = require("./controllers/UsersController.js");
const ItineraryController = require("./controllers/ItineraryController.js");
const JobController = require("./controllers/JobController.js");

//****************MIDDLEWARE***************//
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json()); //to access req.body
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  // //middleware to authenticate user
  // const authenticateToken = (req, res, next) => {
  //   const authHeader = req.headers["authorization"];
  //   const token = authHeader && authHeader.split(" ")[1];
  //   if (token == null) return res.sendStatus(401);
  //   jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
  //     if (err) return res.sendStatus(403); //token not valid
  //     req.user = user;
  //     next();
  //   });
  // };
}

console.log("dirname:", __dirname);

//****************ROUTES***************//

app.use("/api/user", UsersController);
app.use("/api/itinerary", ItineraryController);
app.use("/api/job", JobController);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("cookie").json({ status: "success" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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
//       authorId: 3,
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
