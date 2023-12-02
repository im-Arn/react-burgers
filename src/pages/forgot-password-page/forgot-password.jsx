import Style from "./forgot-password.module.css";
import {
  EmailInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";
import {
  useDispatch, 
  useSelector
} from "react-redux";
import {
  Link,
  Navigate
} from 'react-router-dom';
import { getSuccessUserData } from '../../components/utils/utils'; //именованная функция работы с хранилищем
import { passwordRecover } from "../../services/actions/user"; //action 

export default function PasswordForgotPage() {
  //хук хранения данных формы
  const [email, setEmail] = useState("");
  //слушатель событий полей ввода
  const onChange = e => {
    setEmail(e.target.value);
  };

  //константа хранящая информацию о успешности запроса на смену пароля
  const success = useSelector(getSuccessUserData);

  const dispatch = useDispatch();
  //сабмит, отправка собранных из полей данных на сервер
  const handlerSubmit = (e) => {
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
          type="email"
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
