import Style from './registration-page.module.css';
import { useState, FormEvent } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUser } from "../../services/actions/user"; //action регистрации пользователя
import { useAppDispatch, useAppSelector } from "../../services/types/types";

export default function RegistrationPage() {
  //хуки хранения данных формы
  const [login, setLogin] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  //слушатели событий полей ввода
  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  //константа хранящая информацию о успешности регистрации
  const registerSuccess = useAppSelector(store => store.user.name);

  const dispatch = useAppDispatch();
  //сабмит, отправка собранных из полей данных на сервер
  const handlerSubmit = (e: FormEvent) => {
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
          name="email"
          placeholder="E-mail"
          value={email}
          required
          onChange={onChangeEmail}
        />
        <PasswordInput
          name="password"
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
