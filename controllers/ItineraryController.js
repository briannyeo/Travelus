const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const itineraries = express.Router();
const authenticateToken = require("../utils/auth");
const jwt = require("jsonwebtoken");

itineraries.post("/searchcountry", authenticateToken, async (req, res) => {
  console.log(req.body);
  const itineraries = await prisma.itineraries.findMany({
    where: {
      destination: req.body.destination,
    },
  });
  res.status(200).json({ itineraries });
});

module.exports = itineraries;
