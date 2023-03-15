import Style from './constructor-elements.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function ConstructorElements() {
  const img = 'https://code.s3.yandex.net/react/code/bun-02.png';
  return (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className={Style.list2}>
      <li className={Style.listitem}>
        <DragIcon type="primary" />
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={img}
        />
      </li>
      <li className={Style.listitem}>
        <DragIcon type="primary" />
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={img}
        />
      </li>
      <li className={Style.listitem}>
        <DragIcon type="primary" />
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={img}
        />
      </li>
      <li className={Style.listitem}>
        <DragIcon type="primary" />
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={img}
        />
      </li>
      <li className={Style.listitem}>
        <DragIcon type="primary" />
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={img}
        />
      </li>
      <li className={Style.listitem}>
        <DragIcon type="primary" />
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={img}
        />
      </li>
    </ul>
  )
}

export default ConstructorElements;