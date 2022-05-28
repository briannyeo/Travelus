const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const itineraries = express.Router();
const authenticateToken = require("../utils/auth");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

itineraries.post("/searchcountry", async (req, res) => {
  console.log(req.body);
  const itineraries = await prisma.itineraries.findMany({
    where: {
      destination: req.body.destination,
    },
  });
  res.status(200).json({ itineraries });
});

module.exports = itineraries;
