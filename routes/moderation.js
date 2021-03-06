const router = require("express").Router();
const pool = require("../database");
const authorization = require("../middleware/authorization");
const isAdmin = require("../middleware/isAdmin");

module.exports = router;

//get moderated recipes
router.get("/recipes", authorization, isAdmin, async(req, res) => {
  try {
    let recipes = await pool.query('SELECT * from recipes ' +
      'INNER JOIN recipe_type ON recipe_type.recipe_id = recipes.recipe_id ' +
      'INNER JOIN types ON types.type_id = recipe_type.type_id ' +
      'WHERE recipe_ismoderated = true');
    res.json(recipes.rows);
  } catch(error) {
    console.error(error.message);
  }
})

//get moderated ingredients
router.get("/ingredients", authorization, isAdmin, async(req, res) => {
  try {
    let ingredients = await pool.query('SELECT * from ingredients WHERE ingredient_ismoderated = true');
    res.json(ingredients.rows);
  } catch(error) {
    console.error(error.message);
  }
})

//approve recipe or ingredient
router.post("/approve", authorization, isAdmin, async(req, res) => {
  try {
    const { isRecipe } = req.body;
    if (isRecipe) {
      const { recipeId } = req.body;
      await pool.query('UPDATE recipes SET recipe_ismoderated = false WHERE recipe_id = $1', [recipeId]);
    } else {
      const { ingredientId } = req.body;
      await pool.query('UPDATE ingredients SET ingredient_ismoderated = null WHERE ingredient_id = $1', [ingredientId]);
    }
  } catch(error) {
    console.error(error.message);
  }
})

//decline recipe or ingredient
router.delete("/decline", authorization, isAdmin, async(req, res) => {
  try {
    const { isRecipe } = req.query;
    if (isRecipe === 'true') {
      const { recipeId } = req.query;
      await pool.query('DELETE FROM recipe_ingredient WHERE recipe_id = $1', [recipeId]);
      await pool.query('DELETE FROM steps WHERE recipe_id = $1', [recipeId]);
      await pool.query('DELETE FROM recipe_type WHERE recipe_id = $1', [recipeId]);
      await pool.query('DELETE FROM recipes WHERE recipe_id = $1', [recipeId]);
    } else {
      const { ingredientId } = req.query;
      await pool.query('DELETE FROM ingredients WHERE ingredient_id = $1', [ingredientId]);
    }
  } catch(error) {
    console.error(error.message);
  }
})

//send ingredient to moderation
router.post("/ingredient", authorization, async(req, res) => {
  try {
    const { ingredient } = req.body;
    await pool.query('INSERT INTO ingredients (ingredient_name, ingredient_ismoderated) VALUES ($1, true)', [ingredient]);
  } catch(error) {
    console.error(error.message);
  }
})
