import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function TabMenu () {
  const [current, setCurrent] = useState('bun')
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <a href="/#bun" style={{textDecoration: 'none'}}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
      </a>
      <a href="/#sauce" style={{textDecoration: 'none'}}>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
      </a>
      <a href="/#main" style={{textDecoration: 'none'}}>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
      </a>
    </div>
  )
}

export default TabMenu

