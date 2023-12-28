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
import FeedPage from '../../pages/feed-page/feed-page';
import FeedInfo from '../feed-info/feed-info';
import FeedInfoPage from '../../pages/feed-info-page/feed-info-page';
import ProfileOrdersPage from '../../pages/profile-orders-page/profile-orders-page';
import ProfileFormPage from '../../pages/profile-form-page/profile-form-page';
import { updateCurrentUser } from '../../services/actions/user'; //actions
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from "../../services/actions/ingredients";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route, useLocation } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { getLoadingStatus, getDataLoadStatus } from '../utils/utils';


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state?.modal;
  const dataLoading = useSelector(getLoadingStatus);
  const dataStatus = useSelector(getDataLoadStatus);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(updateCurrentUser());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        {dataLoading && <p>Загрузка...</p>}
        {dataStatus &&
          <Routes location={location}>
            {!background && (<Route path="/ingredients/:id" element={<IngredientPage />} />)}
            {!background && (<Route path="/feed/:id" element={<FeedInfoPage />} />)}
            <Route path="/" element={<MainPage />} location={background || location}>
              <Route path="ingredients/:id" element={<IngredientPage />} />
            </Route>
            <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
            <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage />} />} />
            <Route path="/forgot-password" element={<OnlyUnAuth component={<PasswordForgotPage />} />} />
            <Route path="/reset-password" element={<OnlyUnAuth component={<PasswordResetPage />} />} />
            <Route path="/profile/" element={<OnlyAuth component={<ProfilePage />} />}>
              <Route index element={<ProfileFormPage />} />
              <Route path="orders" element={<ProfileOrdersPage />} >
                <Route path=":id" element={<FeedInfo />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/feed" element={<FeedPage />}>
              <Route path=":id" element={<FeedInfo />} />
            </Route>
          </Routes>}
      </DndProvider>
    </>
  )
}

export default App
