const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();

//seed account
users.post("/seedaccount", async (req, res) => {
  try {
    // console.log("here");
    // const deleted = await prisma.user.deleteMany({});
    // console.log("deleted", deleted);
    await prisma.user.deleteMany({});
    await prisma.user.createMany({
      data: [
        {
          username: "brian",
          password: bcrypt.hashSync("12345", 10),
          location_based: "Singapore",
          description: "Shopping etc etc",
        },
        {
          username: "admin",
          password: bcrypt.hashSync("88888", 10),
          location_based: "Thailand",
          description: "admin description",
        },
      ],
    });

    res.send("user created");
  } catch (err) {
    res.status(400).send(err);
  }
});

//Adds new users accounts to Prisma
users.get("/register", async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  try {
    const createdUser = await prisma.user.create(req.body);
    console.log("created user is: ", createdUser);
    if (createdUser) {
      res.status(200).json({ status: "success" });
      return;
    }
    //res.redirect('/');
  } catch (err) {
    res.status(500).json({ status: "failed" });
    console.log(err);
  }
});

module.exports = users;
