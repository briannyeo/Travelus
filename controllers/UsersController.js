const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();

//seed account
// users.post("/seedaccount", async (req, res) => {
//   try {
//     // console.log("here");
//     // const deleted = await prisma.user.deleteMany({});
//     // console.log("deleted", deleted);
//     await prisma.user.deleteMany({});
//     await prisma.user.createMany({
//       data: [
//         {
//           username: "brian",
//           password: bcrypt.hashSync("12345", 10),
//           location_based: "Singapore",
//           description: "Shopping etc etc",
//         },
//         {
//           username: "admin",
//           password: bcrypt.hashSync("88888", 10),
//           location_based: "Thailand",
//           //description: "admin description",
//         },
//       ],
//     });
//     const users = await prisma.user.findMany({});

//     res.send(users);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

//ADD NEW USER TO PRISMA (REGISTER)
users.post("/register", async (req, res) => {
  // console.log("req.body: ", req.body);
  //console.log("password: ", req.body.password); // correct

  try {
    // Get user input
    const { username, password, location_based } = req.body;

    // Validate if user exist in our database
    const oldUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    //Encrypting user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    //Create user in database
    const user = await prisma.user.create({
      data: {
        username: username,
        password: encryptedPassword,
        location_based: location_based,
      },
    });

    //create token
    const accessToken = jwt.sign(user, process.env.TOKEN_SECRET, {
      expiresIn: "2h",
    });
    //save user token
    user.accessToken = accessToken;
    //return new user
    res.status(201).json({ status: "success" });
    console.log("created user", user);
  } catch (err) {
    console.log(err);
  }
});

//LOGIN  AUTHENTICATION
users.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: "2h",
      });

      // save user token
      user.token = token;
      console.log(token);

      // user
      res.status(200).json({ user: user, status: "success" });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

//LOGOUT
users.post("/logout", (req, res) => {});

//middleware to authenticate user
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); //token not valid

    req.user = user;
    next();
  });
};

module.exports = users;
