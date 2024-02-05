import React from "react";
import "./index.css";

const RecipeCard = ({ recipeTitle, recipeImage }) => {
  return (
    <div className="recipe-card">
      <h5 className="card-title">{recipeTitle}</h5>
      <img src={recipeImage} alt=""></img>
    </div>
  );
};

export default RecipeCard;