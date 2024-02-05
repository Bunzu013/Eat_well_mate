import axios from "axios";
const baseURL = "http://localhost:3000/api/recipes"; 

export const addRecipe = async (recipeData, email) => {
  try {
    const response = await axios.post(`${baseURL}/add_recipe`, {
      ...recipeData,
      email: email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRecipe = async (recipeName) => {
    try {
      const response = await axios.delete(`${baseURL}/delete_by_name?name=${recipeName}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };