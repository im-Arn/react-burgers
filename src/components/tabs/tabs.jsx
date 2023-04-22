import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Style from './tabs.module.css';
import { forwardRef } from 'react';

const TabMenu = forwardRef((props, ref) => {
  return (
    <div className={Style.tabs} ref={ref}>
      <a href="/#bun" className={Style.anchor}>
        <Tab value="bun" active={props.current === 'bun'} >Булки</Tab>
      </a>
      <a href="/#sauce" className={Style.anchor}>
        <Tab value="sauce" active={props.current === 'sauce'} >Соусы</Tab>
      </a>
      <a href="/#main" className={Style.anchor}>
        <Tab value="main" active={props.current === 'main'} >Начинки</Tab>
      </a>
    </div>
  )
})

export default TabMenu;

