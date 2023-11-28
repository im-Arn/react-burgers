import Style from './login-page.module.css';

import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Navigate
} from "react-router-dom";
import { loginUser } from '../../services/actions/user'; //action регистрации пользователя
import { getSuccessUserAuth } from '../../components/utils/utils'; //именованная функция работы с хранилищем

export default function LoginPage() {
  //хуки хранения данных формы
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //слушатели событий полей ввода
  const onChangeEmail = e => {
    setEmail(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  //константа хранящая информацию о успешности регистрации
  const loginSuccess = useSelector(getSuccessUserAuth);

  const dispatch = useDispatch();
  //сабмит, отправка собранных из полей данных на сервер
  const handlerSubmit = (e) => {
    e.preventDefault();
    const user = {
      "email": email,
      "password": password,
    };
    dispatch(loginUser(user));
  };

  if (loginSuccess) {
    return <Navigate to="/" />;
  }

  return (
    <main className={Style.login}>
      <h2 className={`text text_type_main-medium mb-6`}>Вход</h2>
      <form className={Style.form} onSubmit={handlerSubmit}>
        <EmailInput
          placeholder={'E-mail'}
          type="email"
          required
          value={email}
          onChange={onChangeEmail}
        />
        <PasswordInput
          placeholder={'Пароль'}
          icon={"ShowIcon"}
          type="password"
          required
          value={password}
          onChange={onChangePassword}
        />
        <Button htmlType="submit">Войти</Button>
      </form>
      <ul className={Style.nav}>
        <li className={`${Style.txt} text text_type_main-default text_color_inactive`}>
          Вы - новый пользователь? <Link to="/register" className={Style.link}>Зарегистрироваться</Link>
        </li>
        <li className={`${Style.txt} text text_type_main-default text_color_inactive`}>
          Забыли пароль? <Link to="/forgot-password" className={Style.link}>Восстановить пароль</Link>
        </li>
      </ul>
    </main>
  );
};
