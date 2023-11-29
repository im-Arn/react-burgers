import Style from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function AppHeader() {
  const location = useLocation();

  return (
    <header className={`${Style.header} mt-10`}>
      <nav className={Style.menu}>
        <NavLink to="/" className={`${Style.menuitem} p-5`}>
          <BurgerIcon type={location.pathname === "/" ? "primary" : "secondary"} />
          <p className={`text text_type_main-default pl-2 ${location.pathname === "/" ? '' : "text_color_inactive"}`}>
            Конструктор
          </p>
        </NavLink>
        <NavLink to="/" className={`${Style.menuitem} p-5`}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
        </NavLink>
        <NavLink to="/" className={Style.logo}>
            <Logo />
        </NavLink>
        <NavLink to="/profile" className={`${Style.menuitem} p-5`}>
          <ProfileIcon type={location.pathname.includes("/profile") ? "primary" : "secondary"} />
          <p className={`text text_type_main-default pl-2 ${location.pathname.includes("/profile") ? '' : "text_color_inactive"}`}>
            Личный кабинет
          </p>
        </NavLink>
      </nav>
    </header>
  )
}

export default AppHeader;
