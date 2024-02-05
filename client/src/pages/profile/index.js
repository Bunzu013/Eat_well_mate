import React from "react";
import { Link } from "react-router-dom";
import ViewSavedRecipes from "../../components/view_saved_recipes";

const Profile = () => {
  return (
    <div className="profile grid-area-main">
      <Link to="/recipes/add" className="button btn-sm">
        {"Dodaj przepis"}
      </Link>
      <ViewSavedRecipes />


    </div>

  );
};

export default Profile