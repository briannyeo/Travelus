const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const job = express.Router();
const authenticateToken = require("../utils/auth");

// job.get("/test", authenticateToken, async (req, res) => {
//   console.log("success");
// });

job.post("/createjob", authenticateToken, async (req, res) => {
  console.log(req.body);
  const jobs = await prisma.jobs.create({
    data: {
      destination: req.body.destination,
      job_title: req.body.title,
      job_body: req.body.job_body,
      num_days: req.body.num_days,
      pay: req.body.pay,
      author: user,
    },
  });
  res.json({ jobs });
});

job.get("/myjobs", authenticateToken, async (req, res) => {
  console.log(req.body.username);
  const jobs = await prisma.jobs.findMany({
    where: {
      author: req.body.username,
    },
  });
  res.json({ jobs });
});

module.exports = job;
