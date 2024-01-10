import { useState, useEffect, FormEvent } from "react";
import Style from './profile-form-page.module.css';
import {
  Button,
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { editUser } from '../../services/actions/user';
import { useAppDispatch, useAppSelector } from "../../services/types/types";

export default function ProfileFormPage() {
  const dispatch = useAppDispatch();
  //хуки хранения данных формы
  const user = useAppSelector(store => store.user);
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  //слушатели событий полей ввода
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsEditing(true);
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEditing(true);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const handlerSubmit = (e: FormEvent) => {
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
  const handlerReset = (e: FormEvent) => {
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
        name={"text"}
        required
        value={name}
        onChange={onChangeName}
        minLength={3}
        icon={"EditIcon"}
      />
      <EmailInput
        placeholder={'Логин'}
        name="email"
        required
        value={email}
        onChange={onChangeEmail}
        minLength={3}
        isIcon={true} //потому что документация
      />
      <PasswordInput
        placeholder={'Пароль'}
        icon={"EditIcon"}
        name={"password"}
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
