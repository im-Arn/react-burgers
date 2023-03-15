import Style from './ingridient-item.module.css';
import { CurrencyIcon, Counter  } from '@ya.praktikum/react-developer-burger-ui-components';

export default function IngridientItem(props) {
  return (
    <li className={Style.listitem}>
      <img src={props.data.image} alt={props.data.name}></img>
      <Counter count={1} size="default" extraClass="m-1" />
      <div className={`${Style.price}`}>
        <p className={`${Style.text} text text_type_digits-default`}>{props.data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${Style.text} text text_type_main-small`}>{props.data.name}</p>
    </li>
  )
}