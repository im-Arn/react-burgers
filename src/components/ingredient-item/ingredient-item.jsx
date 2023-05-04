import Style from './ingredient-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypesIngredients from '../utils/prop-types-ingredients';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details'
import { useDispatch, useSelector } from "react-redux";
import { setIngredientDetails, resetIngredientDetails } from '../../services/actions/ingredientDetails';
import { useDrag } from "react-dnd";
import { getOrderData, getIngredientData } from '../../components/utils/utils';


export default function IngredientItem(props) {
  //работа с модальным окном---------------------------------------------------------------------
  const ingredientData = props.data; //получаем ингредиент от родителя для рендера разметки
  const ingredientDataStore = useSelector(getIngredientData); //получаем ингредиент который попал в хранилище при клике по разметке
  const ingredientsStore = useSelector(getOrderData); //получаем список ингредиентов в заказе, для счётчика
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(setIngredientDetails(ingredientData));
  };
  const closeModal = () => {
    dispatch(resetIngredientDetails());
  };

//днд функционал---------------------------------------------------------------------------------
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredientData,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  //обновляем счётчик в зависимости от типа ингредиента и количества его неуникальных айди в стор
  const count = ingredientsStore.bun && (ingredientData.type === 'bun' & (ingredientsStore.bun._id === ingredientData._id))
    ? '2'
    : ingredientsStore.toppings.filter((ingredient) => ingredient._id === ingredientData._id).length;

  return (
    <li className={Style.listitem} style={isDrag ? { opacity: "0.7" } : { opacity: "1" }} onClick={openModal} ref={dragRef} key={ingredientData.key}>
      <img src={ingredientData.image} alt={ingredientData.name}></img>
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <div className={`${Style.price}`}>
        <p className={`${Style.text} text text_type_digits-default`}>{ingredientData.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${Style.text} text text_type_main-default`}>{ingredientData.name}</p>
      {ingredientDataStore && (
        <Modal closeModal={closeModal}>
          <IngredientDetails />
        </Modal>
      )
      }
    </li>
  )
}

IngredientItem.propTypes = {
  data: PropTypesIngredients.isRequired
}