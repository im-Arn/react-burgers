import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Style from './profile-page.module.css';
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useParams } from 'react-router-dom';
import NotFoundPage from "../not-found-page/not-found-page";
import { logOut, editUser } from '../../services/actions/user';
import { getCookie } from '../../components/utils/cookies';
import { getUserData } from '../../components/utils/utils';

export default function ProfilePage() {
  const dispatch = useDispatch();
  //хуки хранения данных формы
  const user = useSelector(getUserData);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  //слушатели событий полей ввода
  const onChangeName = e => {
    setName(e.target.value);
    setIsEditing(true);
  };
  const onChangeEmail = e => {
    setEmail(e.target.value);
    setIsEditing(true);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
    setIsEditing(true);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword("");
    }
  }, [user]);

  let { '*': to } = useParams();

  //сабмит, отправка собранных из полей данных на сервер
  const handlerSubmit = (e) => {
    e.preventDefault();
    const editedUser = {
      "email": email,
      "name": name,
      "password": password,
    };
    dispatch(editUser(editedUser));
    setPassword("");
    setIsEditing(false);
  };

  const handlerReset = (e) => {
    e.preventDefault();
    setName(user.name);
    setEmail(user.email);
    setPassword("");
    setIsEditing(false);
  };

  const handlerLogout = () => {
    const refreshToken = getCookie('refreshToken');
    dispatch(logOut(refreshToken));
  }


  return (
    <main className={Style.profile}>
      <nav className={Style.nav}>
        <ul className={`text text_type_main-medium mb-20 ${Style.list}`}>
          <li className={Style.list_item}>
            <NavLink end to="/profile" className={({ isActive }) => `${Style.navlink}
            ${isActive ? Style.active : "text_color_inactive"}`}>
              Профиль
            </NavLink>
          </li>
          <li className={Style.list_item}>
            <NavLink end to="/profile/orders" className={({ isActive }) => `${Style.navlink}
            ${isActive ? Style.active : "text_color_inactive"}`}>
              История заказов
            </NavLink>
          </li>
          <li className={Style.list_item}>
            <NavLink to="/login" onClick={handlerLogout} className={({ isActive }) => `${Style.navlink}
            ${isActive ? Style.active : "text_color_inactive"}`}>
              Выход
            </NavLink>
          </li>
        </ul>
        <p className={`text text_type_main-default text_color_inactive ${Style.text}`}>В этом разделе вы можете изменить свои персональные данные</p>
      </nav>
      {to === 'orders'
        ? <NotFoundPage />
        : (
          <form className={Style.inputs} onReset={handlerReset} onSubmit={handlerSubmit}>
            <Input
              placeholder={'Имя'}
              type="text"
              required
              value={name}
              onChange={onChangeName}
              minLength={3}
              icon="EditIcon"
            />
            <EmailInput
              placeholder={'Логин'}
              type="email"
              required
              value={email}
              onChange={onChangeEmail}
              minLength={3}
              icon="EditIcon"
            />
            <PasswordInput
              placeholder={'Пароль'}
              icon={"EditIcon"}
              type="password"
              required
              value={password}
              onChange={onChangePassword}
              minLength={3}
            />
            {isEditing && (
              <div className={Style.buttons}>
                <Button htmlType="reset" type="secondary" size="medium">Отмена</Button>
                <Button htmlType="submit">Сохранить</Button>
              </div>)}
          </form>)}
    </main>
  )
};
