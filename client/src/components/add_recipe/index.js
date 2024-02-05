import React, { useState, useContext } from "react";
import { addRecipe } from "../../utilities/recipe-functions.js";
import { AppContext } from "../../contexts/app_context";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const { user } = useContext(AppContext);

  const [formState, setFormState] = useState({
    email: user.email,
    name: "",
    ingredients: "",
    instructions: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    ingredients: false,
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sprawdzanie błędów przed przesłaniem formularza
    let areErrorsPresent = false;
    const formErrors = {
      name: false,
      ingredients: false,
    };

    if (formState.name.trim() === "") {
      formErrors.name = true;
      areErrorsPresent = true;
    }

    if (formState.ingredients.trim() === "") {
      formErrors.ingredients = true;
      areErrorsPresent = true;
    }

    if (areErrorsPresent) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await addRecipe(formState, user.email);
      const newRecipe = response.data;
      console.log("Dodano nowy przepis:", newRecipe);

      // Przykład - przekierowanie na stronę z listą przepisów
      navigate("/profile");
    } catch (error) {
      console.error("Błąd dodawania przepisu:", error);
      setError(true);
    }
  };

  return (
    <div >
      <h2 className="recipe">Dodaj przepis</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nazwa:</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p>To pole nie może być puste.</p>}
        </div>
        <div>
          <label>Składniki:</label>
          <textarea
            name="ingredients"
            value={formState.ingredients}
            onChange={handleChange}
            required
          ></textarea>
          {errors.ingredients && <p>To pole nie może być puste.</p>}
        </div>
        <div>
          <label>Instrukcje:</label>
          <textarea
            name="instructions"
            value={formState.instructions}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Dodaj przepis</button>
        {error && <p>Wystąpił błąd podczas dodawania przepisu.</p>}
      </form>
    </div>
  );
};

export default AddRecipe;
