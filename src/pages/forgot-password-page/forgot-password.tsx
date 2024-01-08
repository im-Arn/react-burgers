import Style from "./forgot-password.module.css";
import {
  EmailInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, FormEvent } from "react";
import {
  Link,
  Navigate
} from 'react-router-dom';
import { passwordRecover } from "../../services/actions/user"; //action 
import { useAppDispatch, useAppSelector } from "../../services/types/types"; //кастомный диспатч

export default function PasswordForgotPage() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");   //хук хранения данных формы
  const success = useAppSelector(store => store.user.success);  //константа хранящая информацию о успешности запроса на смену пароля
  
  //слушатель событий полей ввода
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  //сабмит, отправка собранных из полей данных на сервер
  const handlerSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(passwordRecover(email));
  };

  if (success) {
    return <Navigate to="/reset-password" />;
  }

  return (
    <main className={Style.forgot}>
      <h2 className={`text text_type_main-medium mb-6`}>Восстановление пароля</h2>
      <form className={Style.form} onSubmit={handlerSubmit}>
        <EmailInput
          placeholder={'Укажите e-mail'}
          name="email"
          required
          value={email}
          onChange={onChange}
        />
        <Button htmlType="submit">
          Восстановить
        </Button>
      </form>
      <p className={`${Style.nav} text text_type_main-default text_color_inactive`}>
        Вспомнили пароль?
        <Link to="/login" className={Style.link}>Войти</Link>
      </p>
    </main>
  );
};
