import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Style from './tabs.module.css';

function TabMenu() {
  const [current, setCurrent] = useState('bun')
  return (
    <div className={Style.tabs}>
      <a href="/#bun" className={Style.anchor}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
      </a>
      <a href="/#sauce" className={Style.anchor}>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
      </a>
      <a href="/#main" className={Style.anchor}>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
      </a>
    </div>
  )
}

export default TabMenu;

