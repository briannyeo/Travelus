const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  console.log("req", req.headers);
  const authHeader = req.headers["cookie"];
  //console.log("authHeader", authHeader);
  const cookieValue = authHeader && authHeader.split(" ")[1];
  const token = cookieValue.split("=")[1];
  console.log("token is this:", token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); //token not valid
    //console.log(user);
    req.user = user;
    // req.user.id = user;
    //console.log(user);
    next();
  });
};

module.exports = authenticateToken;
