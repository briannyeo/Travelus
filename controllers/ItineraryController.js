const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const itineraries = express.Router();

module.exports = itineraries;
