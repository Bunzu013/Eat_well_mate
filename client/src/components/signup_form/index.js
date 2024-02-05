import React, { useEffect, useState, useContext } from "react";
import {
  logIn,
  signUp,
} from "../../utilities/user-functions";
import { AppContext } from "../../contexts/app_context";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  let { setUser } = useContext(AppContext);

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({
    noUsername: null,
    emailInvalid: null,
    passwordShort: null,
    passwordMismatch: null,
    userAlreadyExists: null,
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

    // Sprawdzenie błędów formularza przed wysłaniem
    let areErrorsPresent = false;
    const formErrors = {
      noUsername: null,
      emailInvalid: null,
      passwordShort: null,
      passwordMismatch: null,
    };

    let username = formState.username;
    let email = formState.email;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let password = formState.password;
    let confirm = formState.confirm;

    if (!username) {
      formErrors.noUsername = true;
      areErrorsPresent = true;
    } else if (!email.match(regex)) {
      formErrors.emailInvalid = true;
      areErrorsPresent = true;
    } else if (password.length < 8) {
      formErrors.passwordShort = true;
      areErrorsPresent = true;
    } else if (password !== confirm) {
      formErrors.passwordMismatch = true;
      areErrorsPresent = true;
    }

    if (areErrorsPresent) {
      setErrors(formErrors);
      return;
    }

    // Jeśli brak błędów formularza, próba wysłania formularza
    try {
      // Pobranie danych formularza
      let formData = { ...formState };
      delete formData.confirm;
      delete formData.error;

      // Wywołanie asynchroniczne do serwera
      let serverResponse = await signUp(formData);
      console.log("Odpowiedź na rejestrację: ", serverResponse);

      // Jeśli użytkownik został pomyślnie dodany, automatycznie zaloguj użytkownika
      if (serverResponse.status === 201) {
        // await logIn(formData);
        navigate("/users/login");
      }

      /*
      // Pobranie informacji o sesji (użytkowniku)
      const user = serverResponse.data;
      setUser(user);

      // Jeśli użytkownik został uwierzytelniony, przekieruj do /recipes/view
      if (user) {
        navigate("/recipes/view");
      }*/
    } catch (error) {
      console.error(error);
      setErrors({
        ...errors,
        userAlreadyExists: error.response.data.message,
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <label>Nazwa użytkownika</label>
            <input
              type="text"
              name="username"
              value={formState.username}
              onChange={handleChange}
              required
            />
            <p className="error-message">
              {errors.noUsername ? "Proszę podać nazwę użytkownika" : ""}
            </p>
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
            {errors.userAlreadyExists && (
              <p className="error-message">{errors.userAlreadyExists}</p>
            )}
            <p className="error-message">
              {errors.emailInvalid ? "Proszę podać prawidłowy adres email" : ""}
            </p>
          </div>
          <div>
            <label>Hasło</label>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
            />
            <p className="error-message">
              {errors.passwordShort
                ? "Hasło musi zawierać co najmniej 8 znaków"
                : ""}
            </p>
          </div>
          <div>
            <label>Potwierdź hasło</label>
            <input
              type="password"
              name="confirm"
              value={formState.confirm}
              onChange={handleChange}
              required
            />
            <p className="error-message">
              {errors.passwordMismatch ? "Upewnij się, że hasła są identyczne" : ""}
            </p>
          </div>
          <button type="submit" >
            Zarejestruj się
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
