const router = require("express").Router();
const pool = require("../database");
const bcrypt = require("bcrypt");
const tokenGenerator = require("../utils/tokenGenerator");
const validInfo = require("../middleware/validInfo");

module.exports = router;

router.post("/register", validInfo, async(req, res) => {
  try {
    const { name, password, email, isAdmin } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (user_name, user_password, user_email, user_isAdmin) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, bcryptPassword, email, isAdmin]);

    const token = tokenGenerator(newUser.rows[0].user_id);
    res.json({token: token, isAdmin: isAdmin});
  } catch(error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
})

router.post("/login", validInfo, async(req, res) => {
  try {
    const { password, email } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or email is incorrect");
    }

    const isValidPassword = await bcrypt.compare(password, user.rows[0].user_password);

    if (!isValidPassword) {
      return res.status(401).json("Password or email is incorrect");
    }

    const token = tokenGenerator(user.rows[0].user_id);
    res.json({token: token, isAdmin: user.rows[0].user_isadmin, userId: user.rows[0].user_id});

  } catch(error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
})
