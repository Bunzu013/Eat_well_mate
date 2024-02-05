import React, { useEffect, useState, useContext } from "react";
import { logIn, getUser } from "../../utilities/user-functions";
import { AppContext } from "../../contexts/app_context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let { setUser } = useContext(AppContext);

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [disabled, setDisabled] = useState(true);
  const [credentialError, setCredentialError] = useState(null);
  const [errors, setErrors] = useState({
    emailInvalid: null,
    passwordShort: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    let propertyName = e.target.name;
    setFormState({
      ...formState,
      [propertyName]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sprawdź błędy formularza przed wysłaniem
    let areErrorsPresent = false;
    const formErrors = {
      emailInvalid: null,
      passwordShort: null,
    };

    let email = formState.email;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let password = formState.password;

    if (!email.match(regex)) {
      formErrors.emailInvalid = true;
      areErrorsPresent = true;
    } else if (password.length < 8) {
      formErrors.passwordShort = true;
      areErrorsPresent = true;
    }

    if (areErrorsPresent) {
      setErrors(formErrors);
      return;
    }

    // Jeśli brak błędów, spróbuj przesłać formularz
    try {
      const formData = { email, password };
      const response = await logIn(formData);
      console.log(response);
      let user = response.data;
      
      if (user) {
        console.log("Zalogowany użytkownik. ID:", user);
        setUser(user);
        navigate("/home");
      } else {
        console.log("Użytkownik niezalogowany.");
      }
    } catch (error) {
      setCredentialError(true);
      console.error("Błąd pobierania informacji o użytkowniku:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <label>Email </label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
            <p className="error-message">
              {errors.emailInvalid ? "Proszę podać poprawny adres email" : ""}
            </p>
          </div>
          <div>
            <label>Hasło </label>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
            />
            <p className="error-message">
              {errors.passwordShort
                ? "Hasło musi mieć co najmniej 8 znaków"
                : ""}
            </p>
          </div>
          <button type="submit">Zaloguj się</button>
          <p className="error-message">
            {credentialError ? "Logowanie nieudane: nieprawidłowy email lub hasło" : ""}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
