import Style from './burger-constructor.module.css';
import { CurrencyIcon, Button, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerConstructor() {
  const img = 'https://code.s3.yandex.net/react/code/bun-02.png';
  return (
    <section className={`${Style.section}`}>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className={`${Style.list} pt-25 pl-4`}>
        <li className={`${Style.listitem} pr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />
        </li>
        <li className={Style.listitemlist}>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className={Style.list2}>
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
        </li>
        <li className={`${Style.listitem} pr-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={img}
          />
        </li>
      </ul>
      <div className={Style.pricearea}>
        <p className='text text_type_digits-medium mr-9'>610 <CurrencyIcon type="primary" /></p>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section >
  )
}