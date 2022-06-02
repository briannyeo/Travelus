const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const itineraries = express.Router();
const authenticateToken = require("../utils/auth");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

//FOR FETCHING ITINERARIES OF PARTICULAR COUNTRY
itineraries.post("/searchcountry", async (req, res) => {
  console.log(req.body.destination);
  const itineraries = await prisma.itineraries.findMany({
    where: {
      destination: req.body.destination,
      isprivate: false,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  res.status(200).json({ itineraries });
});

//FOR GETTING ALL ITINERARIES POSTED BY USER
itineraries.get("/myitineraries/all", authenticateToken, async (req, res) => {
  //console.log(req.body.username);
  const itineraries = await prisma.itineraries.findMany({
    where: {
      authorId: parseInt(req.user.id),
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  res.status(200).json({ itineraries });
});

//FOR POSTING ITINERARY TO COMMUNITY
itineraries.post("/createitinerary", authenticateToken, async (req, res) => {
  console.log("post req.body ", req.body);
  console.log("post req.user.id ", req.user.id);
  console.log("req.body.image", req.body.image);
  // try {
  const newItinerary = await prisma.itineraries.create({
    data: {
      authorId: parseInt(req.user.id),
      destination: req.body.destination,
      num_days: req.body.num_days,
      itinerary_title: req.body.itinerary_title,
      itinerary_body: req.body.itinerary_body,
      isprivate: false,
      image: req.body.image,
    },
  });
  console.log(newItinerary);
  res.status(200).json({ status: "success", newItinerary });
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
});

//FOR POSTING ITINERARY TO JOB POST
itineraries.post(
  "/create/newitinerary",
  authenticateToken,
  async (req, res) => {
    console.log("post isprivate req.body ", req.body);
    // console.log("post req.body ", req.body);
    // console.log("post req.user.id ", req.user.id);
    try {
      const newItinerary = await prisma.itineraries.create({
        data: {
          authorId: parseInt(req.user.id),
          destination: req.body.destination,
          num_days: req.body.num_days,
          itinerary_title: req.body.itinerary_title,
          itinerary_body: req.body.itinerary_body,
          image: req.body.image,
          isprivate: req.body.isprivate,
          jobsId: parseInt(req.body.jobsId),
        },
      });
      console.log(newItinerary);
      res.status(200).json({ status: "success", newItinerary });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

//FOR FETCHING ITINERARY DETAIL
itineraries.get("/:id", authenticateToken, async (req, res) => {
  console.log(req.params.id);
  const itinerary = await prisma.itineraries.findUnique({
    where: {
      id: parseInt(req.params.id),
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
  console.log(itinerary);
  res.status(200).json({ itinerary });
});

// FOR POSTING COMMENTS
itineraries.post("/:id", authenticateToken, async (req, res) => {
  // console.log("post req.params.id", req.params.id);
  // console.log("post req.body ", req.body.comment);
  // console.log("post req.user.id ", req.user.id);
  try {
    const newComment = await prisma.comments.create({
      data: {
        userId: parseInt(req.user.id),
        body: req.body.comment,
        itineraryId: parseInt(req.params.id),
      },
    });
    console.log(newComment);
    res.status(200).json({ newComment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// FOR RETRIEVING ALL COMMENTS FOR PARTICULAR ITINERARY
itineraries.get("/comments/:id", authenticateToken, async (req, res) => {
  //console.log(req.params.id);
  const allComments = await prisma.comments.findMany({
    where: {
      itineraryId: parseInt(req.params.id),
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

module.exports = itineraries;
