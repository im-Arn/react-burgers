import Style from './reset-password-page.module.css';
import {
  PasswordInput,
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, FormEvent } from 'react';
import {
  Link,
  Navigate
} from 'react-router-dom';
// import { getSuccessResetPassword, getSuccessPassRecover } from '../../components/utils/utils'; //именованная функция работы с хранилищем
import { passwordReset } from "../../services/actions/user"; //action 
import { useAppDispatch, useAppSelector } from '../../services/types/types';

export default function PasswordResetPage() {
  const dispatch = useAppDispatch();
  //хуки хранения данных формы
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");
  //слушатель событий полей ввода
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  //константа хранящая информацию о успешности смены пароля
  const successReset = useAppSelector(store => store.user.isPassReset);
  const successRecover = useAppSelector(store => store.user.isPassRecover);

  //сабмит, отправка собранных из полей данных на сервер
  const handlerSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(passwordReset(password, code));
  };

  if (successReset) {
    return <Navigate to="/login" />;
  }

  return (
    <main className={Style.reset} >
      {!successRecover && <Navigate to="/forgot-password" />}
      <h2 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h2>
      <form className={Style.form} onSubmit={handlerSubmit}>
        <PasswordInput
          placeholder={"Введите новый пароль"}
          name="password"
          required
          value={password}
          onChange={onChangePassword}
        />
        <Input
          placeholder={"Введите код из письма"}
          name="text"
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
