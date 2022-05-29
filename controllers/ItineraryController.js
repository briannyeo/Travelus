const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const itineraries = express.Router();
const authenticateToken = require("../utils/auth");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

//FOR FETCHING ITINERARIES OF PARTICULAR COUNTRY
itineraries.post("/searchcountry", async (req, res) => {
  console.log(req.body);
  const itineraries = await prisma.itineraries.findMany({
    where: {
      destination: req.body.destination,
    },
  });
  res.status(200).json({ itineraries });
});

//FOR FETCHING ITINERARY DETAIL AND COMMENTS
itineraries.get("/:id", authenticateToken, async (req, res) => {
  //console.log(req.params.id);
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
      comments: true,
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

module.exports = itineraries;
