import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Style from './tabs.module.css';
import { forwardRef, RefObject } from 'react';

type TTabMenu = {
  current: 'bun' | 'sauce' | 'main',
  bunRef: RefObject<HTMLLIElement>,
  sauceRef: RefObject<HTMLLIElement>,
  mainRef: RefObject<HTMLLIElement>,
}

const TabMenu = (props: TTabMenu) => {

  const setTab = (element: React.RefObject<HTMLLIElement>) => {
    element.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={Style.tabs}>
      <a href="/#bun" className={Style.anchor}>
        <Tab value="bun" active={props.current === 'bun'} onClick={() => { setTab( props.bunRef) }}>Булки</Tab>
      </a>
      <a href="/#sauce" className={Style.anchor}>
        <Tab value="sauce" active={props.current === 'sauce'} onClick={() => { setTab(props.sauceRef) }}>Соусы</Tab>
      </a>
      <a href="/#main" className={Style.anchor}>
        <Tab value="main" active={props.current === 'main'} onClick={() => { setTab(props.mainRef) }}>Начинки</Tab>
      </a>
    </div>
  )
}

export default TabMenu;

