require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async(req, res, next) => {
  const jwtToken = req.header("token");

  const payload = jwt.verify(
    jwtToken,
    process.env.PG_KEY.replace(/\\n/g, '\n'),
    { algorithms: ['RS256']}
  );

  if (payload.userUuid === process.env.PG_ADMIN_UUID) {
    next();
  } else {
    return res.status(401).send("Not Administrator");
  }
}
