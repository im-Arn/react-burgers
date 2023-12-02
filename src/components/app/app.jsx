import AppHeader from '../app-header/app-header';
//пути
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import RegistrationPage from '../../pages/register-page/registration-page';
import PasswordForgotPage from '../../pages/forgot-password-page/forgot-password';
import PasswordResetPage from '../../pages/reset-password-page/reset-password-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import IngredientPage from '../../pages/ingredient-page/ingredient-page';
import { updateCurrentUser } from '../../services/actions/user'; //actions
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIngredients } from "../../services/actions/ingredients";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route, useLocation } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state?.modal;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(updateCurrentUser());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <Routes>
          {!background && (<Route path="/ingredients/:id" element={<IngredientPage />} />)}
          <Route path="/" element={<MainPage />} location={background || location}>
            <Route path="ingredients/:id" element={<IngredientPage />} />
          </Route>
          <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<PasswordForgotPage />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<PasswordResetPage />} />} />
          <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </DndProvider>
    </>
  )
}

export default App
