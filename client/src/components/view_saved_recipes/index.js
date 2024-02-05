import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { AppContext } from "../../contexts/app_context";
import axios from "axios";
import ShowSingleRecipe from "../../pages/user_single_recipe";
import RecipeCard from "../recipe_card";

const baseURL = "http://localhost:8000/api/recipes";

const RecipeCardContainer = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${baseURL}/recipes`, {
          params: { email: user.email },
        });
        setRecipes(response.data);
      } catch (error) {
        console.error("Error while fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [user]);

  const handleClick = async (recipe) => {
    try {
      const serverResponse = await axios.get(
        `${baseURL}/get_user_recipe_details?name=${recipe.name}`
      );
      const mealDetails = serverResponse.data;
      setSelectedRecipe(mealDetails);
      navigate("/profile", { recipe });
    } catch (error) {
      console.error("Error while fetching recipe details:", error);
    }
  };

  let mealsArrayJSX = null;
  if (recipes.length > 0) {
    mealsArrayJSX = recipes.map((recipe) => {
      return (
        <div key={recipe._id} onClick={() => handleClick(recipe)}>
          <RecipeCard recipeTitle={recipe.name} />
        </div>
      );
    });
  }

  if (!mealsArrayJSX) {
    mealsArrayJSX = <p>Nie masz jeszcze zapisanych przepisów</p>;
  }

  return (
    <div className="recipe-display">
      <h4>Przepisy użytkownika {user.name}</h4>
      {selectedRecipe ? (
        <ShowSingleRecipe recipe={selectedRecipe} />
      ) : (
        <section>{mealsArrayJSX}</section>
      )}
    </div>
  );
};

export default RecipeCardContainer;
