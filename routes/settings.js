const router = require("express").Router();
const pool = require("../database");

module.exports = router;

//get all available ingredients
router.get("/ingredients", async(req, res) => {
  try {
    res.json((await pool.query('SELECT ingredient_name from ingredients WHERE ingredient_ismoderated IS NULL')).rows);
  } catch(error) {
    console.error(error.message);
  }
});

//get all available types of dishes
router.get("/types", async(req, res) => {
  try {
    res.json((await pool.query('SELECT type_name from types')).rows);
  } catch(error) {
    console.error(error.message);
  }
});
