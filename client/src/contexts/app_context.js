import React, { useState, createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [mealsArray, setMealsArray] = useState([]);
  const [meal, setMeal] = useState("");
  const [searchQueries, setSearchQueries] = useState([]);
  const [mealId, setMealId] = useState("");

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,

        searchQueries,
        setSearchQueries,

        mealsArray,
        setMealsArray,

        meal,
        setMeal,

        mealId,
        setMealId,

    
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;