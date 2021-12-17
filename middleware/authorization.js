require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async(req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).send("Not Authorize");
    }

    const payload = jwt.verify(jwtToken, "" + process.env.healthy_food_secret);
    req.user = payload.user;

  } catch(error) {
    console.error(error.message);
    return res.status(403).send("Not Authorize");
  }

  next();
}
