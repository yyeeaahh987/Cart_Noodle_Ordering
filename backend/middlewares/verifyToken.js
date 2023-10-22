const jwt = require("jsonwebtoken");

// token verification
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ msg: "You are not authorized" });
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer ")
  ) {
    const token = req.headers.authorization.substr(7);
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      (err, data) => {
        if (err)
          return res.status(403).json({ msg: "Expired or invalid token" });
        else {
          req.user = data;
          next();
        }
      }
    );
  }
};

// Admin token verification
const verifyTokenAdmin = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ msg: "You are not authorized" });
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer ")
  ) {
    const token = req.headers.authorization.substr(7);
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      (err, data) => {
        if (err)
          return res.status(403).json({ msg: "Expired or invalid token" });
        else {
          // data = { id: user._id, isAdmin: user.isAdmin },
          if (!data.isAdmin)
            return res.status(403).json({ msg: "You are not authorized" });
          req.user = data;
          next();
        }
      }
    );
  }
};

module.exports = { verifyToken, verifyTokenAdmin };
