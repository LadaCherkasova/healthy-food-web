const router = require("express").Router();
const authorization = require("../middleware/authorization");

module.exports = router;

router.get("/is-verify", authorization, async(req, res) => {
  try {
    res.json(true);
  } catch(error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
})
