import IngridientItem from '../ingridient-item/ingridient-item';
import Style from './ingridients-items.module.css'

export default function IdgridientItems(props) {
  const ingridientsArr = props.data;
  return (
    <ul className={`${Style.list} pt-6 pl-4`}>
      {ingridientsArr.map(function(ingridient) {
        return (
          <IngridientItem data={ingridient} key={ingridient._id}/>
        )
      })}
    </ul>
  )
}