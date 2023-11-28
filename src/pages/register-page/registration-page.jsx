import Style from './registration-page.module.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUser } from "../../services/actions/user"; //action регистрации пользователя
import { getSuccessUserAuth } from '../../components/utils/utils'; //именованная функция работы с хранилищем

export default function RegistrationPage() {
  //хуки хранения данных формы
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //слушатели событий полей ввода
  const onChangeLogin = e => {
    setLogin(e.target.value);
  };
  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  //константа хранящая информацию о успешности регистрации
  const registerSuccess = useSelector(getSuccessUserAuth);

  const dispatch = useDispatch();
  //сабмит, отправка собранных из полей данных на сервер
  const handlerSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
      name: login,
    };
    dispatch(registerUser(user));
  };

  if (registerSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <section className={Style.register}>
      <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
      <form className={Style.form} onSubmit={handlerSubmit}>
        <Input
          type="text"
          placeholder="Имя"
          value={login}
          required
          onChange={onChangeLogin}
        />
        <EmailInput
          type="email"
          placeholder="E-mail"
          value={email}
          required
          onChange={onChangeEmail}
        />
        <PasswordInput
          type="password"
          placeholder="Пароль"
          icon="ShowIcon"
          value={password}
          required
          onChange={onChangePassword}
        />
        <Button htmlType="submit">Зарегистрироваться</Button>
      </form>
      <p className={`${Style.nav} text text_type_main-default text_color_inactive`}>
        Уже зарегистрированы? <Link to="/login" className={Style.link}> Войти</Link>
      </p>
    </section>
  );
};
