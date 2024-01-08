import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from './login-page.module.css';
import { useState, FormEvent } from "react";
import {
  Link,
} from "react-router-dom";
import { loginUser } from '../../services/actions/user'; //action регистрации пользователя
import { useAppDispatch } from "../../services/types/types";

export default function LoginPage() {
  //хуки хранения данных формы
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //слушатели событий полей ввода
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const dispatch = useAppDispatch();
  //сабмит, отправка собранных из полей данных на сервер

  const handlerSubmit = (e: FormEvent) => {
    e.preventDefault();
    const user = {
      "email": email,
      "password": password,
    };
    dispatch(loginUser(user));
  };

  return (
    <main className={Style.login}>
      <h2 className={`text text_type_main-medium mb-6`}>Вход</h2>
      <form className={Style.form} onSubmit={handlerSubmit}>
        <EmailInput
          placeholder={'E-mail'}
          name="email"
          required
          value={email}
          onChange={onChangeEmail}
        />
        <PasswordInput
          placeholder={'Пароль'}
          name="password"
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
