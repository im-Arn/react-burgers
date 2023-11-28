import Style from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import MenuItem from './components/menu-item/menu-item';
import { useLocation } from 'react-router-dom';

function AppHeader() {
  const location = useLocation();

  return (
    <header className={`${Style.header} mt-10`}>
      <nav className={Style.menu}>
        <MenuItem to="/">
          <BurgerIcon type={location.pathname === "/" ? "primary" : "secondary"} />
          <p className={`text text_type_main-default pl-2 ${location.pathname === "/" ? '' : "text_color_inactive"}`}>
            Конструктор
          </p>
        </MenuItem>
        <MenuItem to="/">
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
        </MenuItem>
        <div className={Style.logo}>
          <Logo />
        </div>
        <MenuItem to="/profile">
          <ProfileIcon type={location.pathname.includes("/profile") ? "primary" : "secondary"} />
          <p className={`text text_type_main-default pl-2 ${location.pathname.includes("/profile") ? '' : "text_color_inactive"}`}>
            Личный кабинет
          </p>
        </MenuItem>
      </nav>
    </header>
  )
}

export default AppHeader;
