import React, { useContext } from "react";
import { AppContext } from "../../contexts/app_context";
import axios from "axios";
import "./index.css";
const baseURL = "http://localhost:8000/api/users";
const ShowSingleRecipe = () => {
  const { meal, user, setUser } = useContext(AppContext);
  console.log("Przepis z strony pojedynczego przepisu: ", meal);

  const {
    idMeal,
    strMeal,
    strArea,
    strCategory,
    strMealThumb,
    strInstructions,
  } = meal;

  const getIngredients = (ingFromMeal) => {
    const ingredients = [];
    for (let i = 1; i <= 40; i++) {
      // zakładając, że nie ma więcej niż 40 składników
      if (ingFromMeal[`strIngredient${i}`]) {
        const ingredient = `${ingFromMeal[`strMeasure${i}`]} - ${ingFromMeal[`strIngredient${i}`]
          }`;
        ingredients.push(ingredient.trim());
      }
    }
    return ingredients;
  };
  const ingredientsArray = getIngredients(meal);

  const ingredientsJSX = ingredientsArray.map((ingredient, i) => {
    return <li key={i}>{ingredient}</li>;
  });



  const handleSaveRecipe = async (id, title, imgURL) => {
    const newRecipe = {
      idMeal: id,
      strMeal: title,
      strMealThumb: imgURL,
    };

    let serverResponse = await axios({
      method: "POST",
      url: `${baseURL}/save_recipe`,
      data: newRecipe,
    });
    console.log("Odpowiedź serwera po zapisaniu przepisu: ", serverResponse);
    // Przejdź przez obecny tablicę savedRecipes i usuń przepis, którego id odpowiada podanemu
    let newSavedRecipes = [...user.savedRecipes];
    newSavedRecipes.push(newRecipe);

    // Ustaw stan, aby zaktualizować tablicę savedRecipes użytkownika
    setUser({
      ...user,
      savedRecipes: newSavedRecipes,
    });
  };

  return (
    <div className="grid-area-main recipe-container">
      <h1>{strMeal || "Nazwa przepisu"}</h1>
      <div className="area-category">
        <h5>
          Region: <em>{strArea || "Region"}</em>
        </h5>
        <h5>
          Kategoria: <em>{strCategory || "Kategoria"}</em>
        </h5>
      </div>
      <img
        src={
          strMealThumb ||
          "https://dummyimage.com/200x200/f6ece2/111311.png&text=obrazek+przepisu"
        }
        alt="Miniatura przepisu"
      />

      <h5>Składniki</h5>
      <div className="ingredients-list">
        {ingredientsJSX || "lista składników"}
      </div>

      <h5>Instrukcje</h5>
      <p>{strInstructions || "instrukcje"}</p>

    </div>
  );
};

export default ShowSingleRecipe;
