const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  //console.log("req", req.headers.cookie);
  const authHeader = req.headers["cookie"];
  //console.log("authHeader", authHeader);
  const token = authHeader && authHeader.split("=")[1];
  //console.log("token is this:", token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); //token not valid
    console.log(user);
    req.user = user;
    console.log(req.user.id);
    next();
  });
};

module.exports = authenticateToken;
