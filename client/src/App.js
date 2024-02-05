import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Nav from './components/nav';
import Footer from './components/footer';
import LogInForm from './components/login_form';
import SignUpForm from './components/signup_form';
import AddRecipe from './components/add_recipe';
import HomePage from './pages/home';
import Profile from './pages/profile';
import ShowSingleRecipe from './pages/show_single_recipe';
import ViewRecipes from './pages/view_recipes';
import { AppContext } from './contexts/app_context';

function App() {
  const { user, setUser } = useContext(AppContext);
  const returnPage = () => {
    return (
      <>
        <div className="page-wrapper">
          <Nav />
          {user ? (
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/users/signup" element={<SignUpForm />} />
              <Route path="/users/login" element={<LogInForm />} />
              <Route path="/recipes/view" element={<ViewRecipes />} />
              <Route path="/recipe/show" element={<ShowSingleRecipe />} />
              <Route path="/profile/" element={<Profile />} />
              <Route path="/recipes/add" element={<AddRecipe />} />
              <Route path="/*" element={<Navigate to="/home" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/users/signup" element={<SignUpForm />} />
              <Route path="/users/login" element={<LogInForm />} />
              <Route path="/recipes/view" element={<ViewRecipes />} />
              <Route path="/recipe/show" element={<ShowSingleRecipe />} />

              <Route path="/*" element={<Navigate to="/home" />} />
            </Routes>
          )}
          <Footer />
        </div>
      </>
    );
  };

  return <div className="App">{returnPage()}</div>;
}

export default App;
