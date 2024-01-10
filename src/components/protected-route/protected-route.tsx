import { ReactElement } from "react";
import { Navigate, useLocation, Location } from "react-router-dom";
import { useAppSelector } from "../../services/types/types";

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: ReactElement;
};

type TOnlyUnAuthProps = {
  component: ReactElement;
};

const Protected = ({ onlyUnAuth = false, component }: TProtectedProps) => {
  const isAuthChecked = useAppSelector(store => store.user.isAuthChecked);
  const user = useAppSelector(store => store.user.name);
  const location: Location = useLocation();

  if (!isAuthChecked) {
    return <p className="text text_type_main-large">Load</p>;
  }

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
export const OnlyUnAuth = ({ component }: TOnlyUnAuthProps) => (
  <Protected onlyUnAuth={true} component={component} />
);
