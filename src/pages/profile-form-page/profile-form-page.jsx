import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Style from './profile-form-page.module.css';
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { editUser } from '../../services/actions/user';
import { getUserData } from '../../components/utils/utils';

export default function ProfileFormPage() {
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

  return (
    <form className={Style.inputs} onReset={handlerReset} onSubmit={handlerSubmit}>
      <Input
        placeholder={'Имя'}
        name="text"
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
    </form>)
}
