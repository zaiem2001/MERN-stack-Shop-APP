const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const protect = expressAsyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  let token;

  if (header && header.startsWith("Bearer")) {
    try {
      token = header.split(" ")[1];

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decode.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Invalid / Bad Token.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, invalid / NO token.");
  }
});

module.exports = protect;
