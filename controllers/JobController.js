const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const job = express.Router();

job.post("/", async (req, res) => {
  const jobs = await prisma.jobs.create({
    data: {
      destination: "US",
      job_title: "Going to US for 20 days",
      job_body: "this is a body for US job",
      num_days: 20,
      pay: 30,
      authorId: 3,
    },
  });
  res.json({ jobs });
});

module.exports = job;
