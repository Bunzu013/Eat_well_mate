const express = require("express");
const axios = require("axios");
const router = express.Router();
const baseURL = "http://www.themealdb.com/api/json/v1/1/";

const Recipe = require("../models/recipe");
const uRecipe = require("../models/userRecipe");

router.post(`/add_recipe`, async (req, res) => {
  const recipeData = req.body;
  recipeData.email = req.body.email;
  try {
    const newRecipe = new uRecipe(recipeData);
    const savedRecipe = await newRecipe.save();

    res.json(savedRecipe);
    console.log("Response from addRecipe:", savedRecipe);
  } catch (error) {
    console.error("Error while adding recipe:", error);       
    res.status(500).json({ error: "Failed to add recipe" });
  }
});

router.get(`/recipes`, async (req, res) => {
  const email = req.query.email;
  
  try {
    const recipes = await uRecipe.find({ email: email });

    res.json(recipes);
  } catch (error) {
    console.error("Error while retrieving recipes:", error);
    res.status(500).json({ error: "Failed to retrieve recipes" });
  }
});

router.get(`/get_user_recipe_details`, async (req, res) => {
  const recipeName = req.query.name;

  try {
    const recipe = await uRecipe.findOne({ name: recipeName });
  
    if (recipe) {
      res.json(recipe);
      console.log(recipe);
    } else {
      res.status(404).json({ error: "Recipe not found" });
    }
  } catch (error) {
    console.error("Error while retrieving recipe details:", error);
    res.status(500).json({ error: "Failed to retrieve recipe details" });
  }
});
router.delete("/delete_by_name", async (req, res) => {
  const recipeName = req.query.name;

  try {
    const deletedRecipe = await uRecipe.findOneAndDelete({ name: recipeName });

    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    return res.status(200).json({ message: "Recipe deleted successfully." });
  } catch (error) {
    console.error("Error while deleting recipe:", error);
    return res.status(500).json({ error: "An error occurred while deleting the recipe." });
  }
});

router.get(`/get_random_recipe`, async (req, res) => {
  const apiResponse = await axios.get(`${baseURL}/random.php`);
  console.log(apiResponse.data);
  res.json(apiResponse.data);
});

router.get(`/search_recipes`, async (req, res) => {
  const config = { params: req.query };
  console.log("axios config for /search_recipes ", config);

  const apiResponse = await axios.get(`${baseURL}/search.php`, config);
  console.log("apiResponse.data for /get_recipe_details ", apiResponse.data);

  res.json(apiResponse.data);
});

router.get(`/filter_recipes`, async (req, res) => {
  const i = req.query.i;
  const c = req.query.c;
  const a = req.query.a;

  const apiResponse = await axios.get(
    `${baseURL}/filter.php?${i ? `i=${i}` : ""}&${c ? `c=${c}` : ""}&${
      a ? `a=${a}` : ""
    }`
  );

  console.log("API Response: ", apiResponse.data);

  res.json(apiResponse.data);
});

router.get(`/get_recipe_details`, async (req, res) => {
  const config = { params: req.query };
  console.log("axios config for /get_recipe_details ", config);

  const apiResponse = await axios.get(
    `http://www.themealdb.com/api/json/v1/1/lookup.php?`,
    config
  );
  console.log("apiResponse.data for /get_recipe_details ", apiResponse.data);

  res.json(apiResponse.data);
});

module.exports = router;
