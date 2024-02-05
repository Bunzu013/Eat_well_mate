const mongoose = require("mongoose");

 
  const recipeSchema = new mongoose.Schema({
    
    name: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        
      },
  });
 
 
const uRecipe = mongoose.model("uRecipe", recipeSchema);

module.exports = uRecipe;