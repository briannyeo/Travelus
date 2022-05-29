const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["cookie"];
  const cookieValue = authHeader && authHeader.split(" ")[1];
  const token = cookieValue.split("=")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); //token not valid
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
