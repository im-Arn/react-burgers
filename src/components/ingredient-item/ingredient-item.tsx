import Style from './ingredient-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details'
import { setIngredientDetails, resetIngredientDetails } from '../../services/actions/ingredientDetails';
import { useDrag } from "react-dnd";
import { useNavigate, useMatch, useLocation, Location, NavigateFunction } from "react-router-dom";
import { TIngredientItem, TIngredientItemConstructor, useAppSelector, useAppDispatch } from "../../services/types/types";

type TProps = {
  data: TIngredientItem,
  key: string,
  kkey: string //key из нот а prop, маскируемся
}

export default function IngredientItem(props: TProps) {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const match = useMatch('ingredients/:id');
  const { id } = match?.params || {};

  //работа с модальным окном---------------------------------------------------------------------
  const background: boolean = location.state?.modal;
  const dispatch = useAppDispatch();
  const ingredientData = props.data; //получаем ингредиент от родителя для рендера разметки
  const ingredientKey = props.kkey; //получаем ингредиент который попал в хранилище при клике по разметке
  const ingredientsStore = useAppSelector(state => state.constructorData); //получаем список ингредиентов в заказе, для счётчика

  const openModal = () => {
    dispatch(setIngredientDetails(ingredientData));
  };
  const closeModal = () => {
    dispatch(resetIngredientDetails());
    navigate('/', {
      state: { modal: false }
    });
  };

  const onClick = () => {
    if (id !== ingredientData._id) {
      navigate(`/ingredients/${ingredientData._id}`, { state: { modal: true, background: location } });
    }
    openModal();
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
  const count = ingredientsStore.bun && (ingredientData.type === 'bun' && (ingredientsStore.bun._id === ingredientData._id))
    ? 2
    : ingredientsStore.toppings.filter((ingredient: TIngredientItemConstructor) => ingredient._id === ingredientData._id).length;

  return (
    <li className={Style.listitem} style={isDrag ? { opacity: "0.7" } : { opacity: "1" }}
      onClick={onClick}
      ref={dragRef} key={ingredientKey}>
      <img src={ingredientData.image} alt={ingredientData.name}></img>
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <div className={`${Style.price}`}>
        <p className={`${Style.text} text text_type_digits-default`}>{ingredientData.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${Style.text} text text_type_main-default`}>{ingredientData.name}</p>
      {background && (
        <Modal closeModal={closeModal}>
          <IngredientDetails />
        </Modal>
      )
      }
    </li>
  )
}
