import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { AppContext } from "../../contexts/app_context";
import { Link } from "react-router-dom";
import { logOut } from "../../utilities/user-functions";

const UserAuth = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    setUser(false);
    navigate("/home");
  };

  return (
    <div className="user-auth">
      {user ? (
        <div>{`Witaj: ${user.username}`}</div>
      ) : (
        <div></div>
      )}
      {user ? (

        
        <div className="auth-btns">
          
          <Link to="/profile" >
            <button>Zobacz profil</button>
          </Link>
          
          <Link to="/home">
            <button onClick={handleLogout}>Wyloguj sie</button>
          </Link>
        </div>
      ) : (
        <div className="auth-btns">

          <Link to="/users/signup">
            <button className="button btn-sm">Zarejestruj sie</button>
          </Link>
          
          <Link to="/users/login">
            <button className="button btn-sm">Zaloguj sie</button>
          </Link>
          
          
        
        </div>
      )}
      
    </div>
  );
};

export default UserAuth;