const jwt = require("jsonwebtoken");
const User = require("../models/user");
// auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "tokenSignature");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    // console.log("req token: ", req.token);
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }

  // console.log("Auth middleware");
};

module.exports = auth;
