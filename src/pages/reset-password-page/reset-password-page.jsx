import Style from './reset-password-page.module.css';
import {
  PasswordInput,
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import {
  useDispatch,
  useSelector
} from "react-redux";
import {
  Link,
  Navigate
} from 'react-router-dom';
import { getSuccessResetPassword, getSuccessPassRecover } from '../../components/utils/utils'; //именованная функция работы с хранилищем
import { passwordReset } from "../../services/actions/user"; //action 

export default function PasswordResetPage() {
  //хуки хранения данных формы
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  //слушатель событий полей ввода
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const onChangeCode = e => {
    setCode(e.target.value);
  };

  //константа хранящая информацию о успешности смены пароля
  const successReset = useSelector(getSuccessResetPassword);
  const successRecover = useSelector(getSuccessPassRecover);

  const dispatch = useDispatch();
  //сабмит, отправка собранных из полей данных на сервер
  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(passwordReset(password, code));
  };

  if (successReset) {
    return <Navigate to="/login" />;
  }

  return (
    <main className={Style.reset} >
      { !successRecover && <Navigate to="/forgot-password" />}
      <h2 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h2>
      <form className={Style.form} onSubmit={handlerSubmit}>
        <PasswordInput
          placeholder={"Введите новый пароль"}
          type="password"
          required
          value={password}
          onChange={onChangePassword}
        />
        <Input
          placeholder={"Введите код из письма"}
          type="text"
          required
          value={code}
          onChange={onChangeCode}
        />
        <Button htmlType="submit">Сохранить</Button>
      </form>
      <p className={`${Style.nav} text text_type_main-default text_color_inactive`}>
        Вспомнили пароль?
        <Link to="/login" className={Style.link}>Войти</Link>
      </p>
    </main>
  )
};
