import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Style from './login-page.module.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Link,
} from "react-router-dom";
import { loginUser } from '../../services/actions/user'; //action регистрации пользователя

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
  // const loginSuccess = useSelector(getUserDataName);

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
        {/* c глазиком ничего поделать не могу, его функционал полностью из библиотеки яндекса. она часто встаёт криво,
        сейчас переустановила её три раза, глаз не изменился, а вот всё остальное еле починила обратно :( */}
        <PasswordInput
          placeholder={'Пароль'}
          icon={"HideIcon"}
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
