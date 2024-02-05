import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/app_context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:8000/api/recipes";

const ShowSingleRecipe = ({ recipe }) => {
  const { user, setUser } = useContext(AppContext);
  const [recipeId, setRecipeId] = useState("");
  const navigate = useNavigate(); // Move the hook outside the function

  useEffect(() => {
    fetchRecipeId();
  }, []);

  const fetchRecipeId = async () => {
    try {
      const response = await axios.get(`${baseURL}/get_user_recipe_details?name=${recipe.name}`);
      const fetchedRecipe = response.data;
      if (fetchedRecipe) {
        setRecipeId(fetchedRecipe._id);
      }
    } catch (error) {
      console.error("Error while fetching recipe details:", error);
    }
  };

  const handleDeleteRecipe = async () => {
    try {
      const serverResponse = await axios.delete(`${baseURL}/delete_by_name?name=${recipe.name}`);
      console.log("serverResponse for deleting recipe: ", serverResponse);
      navigate("/home");
    } catch (error) {
      console.error("Error while deleting recipe:", error);
    }
  };

  const ingredientsJSX = recipe.ingredients.map((ingredient, i) => {
    return <li key={i}>{ingredient}</li>;
  });

  return (
    <div className="grid-area-main recipe-container">
      <h1>{recipe.name || "Recipe Name"}</h1>
      <div className="area-category">
        <h5>
          Autor: <em>{recipe.email}</em>
        </h5>
      </div>
      <img
        src={
          recipe.strMealThumb ||
          "https://dummyimage.com/200x200/f6ece2/111311.png&text=recipe+image"
        }
        alt="Recipe Thumbnail"
      />

      <h5>Skladniki</h5>
      <div className="ingredients-list">
        {ingredientsJSX.length > 0 ? (
          <ul>{ingredientsJSX}</ul>
        ) : (
          <p>Brak</p>
        )}
      </div>

      <h5>Instrukcje</h5>
      <p>{recipe.instructions || "instructions"}</p>

      <div>
        <button onClick={handleDeleteRecipe}>Usun przepis</button>
      </div>
    </div>
  );
};

export default ShowSingleRecipe;
