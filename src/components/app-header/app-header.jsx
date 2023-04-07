import Style from './app-header.module.css';

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import MenuItem from './components/menu-item/menu-item';

function AppHeader() {
  return (
    <header className={`${Style.header} mt-10`}>
      <nav className={Style.menu}>
        <MenuItem>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default pl-2">Конструктор</p>
        </MenuItem>
        <MenuItem>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
        </MenuItem>
        <div className={Style.logo}>
          <Logo />
        </div>
        <MenuItem>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</p>
        </MenuItem>
      </nav>
    </header>
  )
}

export default AppHeader;