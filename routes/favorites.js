const router = require("express").Router();
const pool = require("../database");
const authorization = require("../middleware/authorization");

module.exports = router;

//toggle favorites
router.post("/", authorization, async(req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.user;
    const isFavorite = await pool.query('SELECT user_id, recipe_id FROM favorites WHERE user_id = $1 AND recipe_id = $2', [userId, recipeId]);

    if (isFavorite.rows.length === 0) {
      await pool.query('INSERT INTO favorites (user_id, recipe_id) VALUES ($1, $2)', [userId, recipeId]);
    } else {
      await pool.query('DELETE FROM favorites WHERE user_id = $1 AND recipe_id = $2', [userId, recipeId]);
    }
  } catch(error) {
    console.error(error.message);
  }
});

//get favorites of certain user
router.get("/", authorization, async(req, res) => {
  try {
    const userId = req.user;
    const favorites =  await pool.query('SELECT * FROM recipes ' +
      'LEFT JOIN favorites ON favorites.recipe_id = recipes.recipe_id ' +
      'LEFT JOIN recipe_type ON recipe_type.recipe_id = recipes.recipe_id ' +
      'LEFT JOIN types ON types.type_id = recipe_type.type_id WHERE user_id = $1', [userId]);
    res.json(favorites.rows);
  } catch(error) {
    console.error(error.message);
  }
});

//is specific recipe favorite or not
router.get("/is-favorite/", authorization, async(req, res) => {
  try {
    const { recipeId } = req.query;
    const userId = req.user;
    const isFavorite = await pool.query('SELECT user_id, recipe_id FROM favorites WHERE user_id = $1 AND recipe_id = $2', [userId, recipeId]);
    res.json(isFavorite.rows.length !== 0);
  } catch(error) {
    console.error(error.message);
  }
});
