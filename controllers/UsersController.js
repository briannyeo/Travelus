const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const jwt = require("jsonwebtoken");
const path = require("path");

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
//           description: "admin description",
//         },
//       ],
//     });
//     const users = await prisma.user.findMany({});

//     res.send(users);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

//Adds new users accounts to Prisma
users.post("/register", async (req, res) => {
  console.log("req.body: ", req.body);
  console.log("password: ", req.body.password); // correct
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  console.log("password: ", req.body.password); // correct
  // try {
  //   const createdUser = await prisma.user.create({ data: req.body });
  //   console.log("created user is: ", createdUser);
  //   if (createdUser) {
  //     res.status(200).json({ status: "success" });
  //     return;
  //   }
  //   //res.redirect('/');
  // } catch (err) {
  //   res.status(500).json({ status: "failed" });
  //   console.log(err);
  // }
});

//login
users.post("/login", (req, res) => {
  //authenticate user
  const { username, password } = req.body;
  console.log(username, password);

  const payload = { username };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ accessToken: accessToken });
});

//middleware to authenticate user
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); //token not valid

    req.user = user;
    next();
  });

  // try {
  //   const token = req.headers.authorization.split(" ")[1];
  //   const payload = jwt.verify(token, process.env.JWT_SECRET);
  //   req.payload = payload;
  //   next();
  // } catch (error) {
  //   res.send(403).end();
  // }
};

//   if (username === "admin" && password === "admin") {
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.json({ token: token });
//   } else {
//     res.status(403).json({ msg: "Invalid credentials" });
//   }
// });

module.exports = users;
