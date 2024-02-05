import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { AppContext } from "../../contexts/app_context";
import RecipeCard from "../recipe_card";
import axios from "axios";
const baseURL = "http://localhost:8000/api/recipes";
const RecipeCardContainer = ({ searchQueries }) => {
  const navigate = useNavigate();
  const { mealsArray, setMeal } = useContext(AppContext);

  console.log("mealsArray from RecipeCardContainer ", mealsArray);
  console.log("searchQueries from RecipeCardContainer ", searchQueries[0]);

  let searchQueriesJSX;
  if (searchQueries[0]) {
    searchQueriesJSX = searchQueries[0]
      .map((query) => {
        if (!query) {
          return "";
        } else {
          return `${query.trim()}`;
        }
      })
      .filter((query) => query)
      .join(", ");
    console.log("searchQueriesJSX: ", searchQueriesJSX);
  }

  const handleClick = async (id) => {
    console.log("show-single-recipe mealId: ", id);

    const config = { params: { i: id } };
    console.log("show-single-recipe config: ", config);

    const serverResponse = await axios.get(`${baseURL}/get_recipe_details`, config);
    console.log(
      "show-single-recipe serverResponse: ",
      serverResponse.data.meals[0]
    );

    setMeal(serverResponse.data.meals[0]);
    navigate("/recipe/show");
  };

  let mealsArrayJSX = null;
  if (mealsArray) {
    mealsArrayJSX = mealsArray.map((recipe) => {
      return (
        <div key={recipe.idMeal} onClick={() => handleClick(recipe.idMeal)}>
          <RecipeCard
            recipeTitle={recipe.strMeal}
            recipeImage={recipe.strMealThumb}
          />
        </div>
      );
    });
  }

  if (!mealsArrayJSX) {
    mealsArrayJSX = (
      <p>Brak przepisów spełniających wybrane kryteria</p>
    );
  }

  console.log("mealsArrayJSX: ", mealsArrayJSX);

  return (
    <div className="recipe-display">
      {searchQueries[0].includes("random") ? (
        <h4>Mała inspiracja!:</h4>
      ) : (
        <h4>Wynik dla: {searchQueriesJSX}</h4>
      )}
      <section>{mealsArrayJSX}</section>
    </div>
  );
};

export default RecipeCardContainer;