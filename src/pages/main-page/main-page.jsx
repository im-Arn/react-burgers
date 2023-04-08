import Style from './main-page.module.css';
// import PropTypes from 'prop-types';
// import PropTypesIngredients from '../../components/utils/prop-types-ingredients';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import { useContext } from 'react';
import { TotalDataContext } from '../../services/AppContext';

export default function MainPage() {
  const { data } = useContext(TotalDataContext);
  if (!data.length) return <>Загрузка...</>

  return (
    <main className={Style.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  )
}

// MainPage.propTypes = {
//   data: PropTypes.arrayOf(PropTypesIngredients.isRequired).isRequired,
// }