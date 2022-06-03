const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const job = express.Router();
const authenticateToken = require("../utils/auth");
const jwt = require("jsonwebtoken");
// job.get("/test", authenticateToken, async (req, res) => {
//   console.log("success");
// });

//FOR CREATING JOB BY A USER
job.post("/createjob", authenticateToken, async (req, res) => {
  //console.log("req.body is", req.body);
  //console.log("user is", req.user); //{ username: 'brian', id: 1, iat: 1653625752, exp: 1653629352 }

  const jobs = await prisma.jobs.create({
    data: {
      destination: req.body.destination,
      job_title: req.body.job_title,
      job_body: req.body.job_body,
      num_days: req.body.num_days,
      pay: req.body.pay,
      authorId: req.user.id,
    },
  });
  res.status(200).json({ status: "success", jobs: jobs });
});

//FOR GETTING ALL JOBS POSTED BY USER
job.get("/myjobs", authenticateToken, async (req, res) => {
  //console.log(req.body.username);
  const jobs = await prisma.jobs.findMany({
    where: {
      authorId: parseInt(req.user.id),
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
      itinerary: true,
    },
  });
  res.status(200).json({ jobs });
});

//FOR RETRIEVING ALL AVAILABLE JOBS POSTED BY EVERYONE
job.get("/", authenticateToken, async (req, res) => {
  const jobs = await prisma.jobs.findMany({
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  res.status(200).json({ jobs });
});

//FOR FETCHING JOB DETAIL
job.get("/:id", authenticateToken, async (req, res) => {
  //console.log(req.params.id);
  const job = await prisma.jobs.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
      itinerary: {
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
  console.log(job);
  res.status(200).json({ job });
});

// FOR POSTING COMMENTS
job.post("/createcomment/:id", authenticateToken, async (req, res) => {
  // console.log("post req.params.id", req.params.id);
  // console.log("post req.body ", req.body.comment);
  // console.log("post req.user.id ", req.user.id);
  // try {
  const newComment = await prisma.comments.create({
    data: {
      userId: parseInt(req.user.id),
      body: req.body.comment,
      jobsId: parseInt(req.params.id),
    },
  });
  console.log(newComment);
  res.status(200).json({ newComment });
  // } catch (error) {
  // res.status(400).json({ error: error.message });
  //}
});

// FOR RETRIEVING ALL COMMENTS FOR PARTICULAR JOB
job.get("/comments/:id", authenticateToken, async (req, res) => {
  //console.log(req.params.id);
  const allComments = await prisma.comments.findMany({
    where: {
      jobsId: parseInt(req.params.id),
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
      // comments: true,
    },
  });
  console.log(allComments);
  res.status(200).json({ allComments });
});

module.exports = job;
