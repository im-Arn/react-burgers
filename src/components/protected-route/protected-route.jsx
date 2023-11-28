import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import { getSuccessUserAuth, getUserData } from "../utils/utils";

const Protected = ({ onlyUnAuth = false, component }) => {
  const user = useSelector(getSuccessUserAuth);
  const location = useLocation();

  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);

Protected.propTypes = {
  onlyUnAuth: PropTypes.bool,
  component: PropTypes.element.isRequired
};

OnlyUnAuth.propTypes = {
  component: PropTypes.element.isRequired
};
