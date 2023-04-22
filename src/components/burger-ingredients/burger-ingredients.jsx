import Style from './burger-ingredients.module.css';
import TabMenu from '../tabs/tabs';
import { useSelector } from "react-redux";
import IngredientCategory from '../ingredient-category/ingredient-category';
import { useRef, useState } from 'react';

export default function BurgerIngredients() {
  //достали ингредиенты из стора и раскидали по разделам
  const data = useSelector(state => state.ingredients.ingredients);
  const bunsArr = data.filter((bun) => bun.type === "bun");
  const sauceArr = data.filter((sauce) => sauce.type === "sauce");
  const mainArr = data.filter((main) => main.type === "main");

  //константы для последующего вычисления активной вкладки посредством анализа расположения разделов 
  const [current, setCurrent] = useState('bun');
  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  //создаем функцию срабатывающую на событие скролла, сравнивает координаты верхних точек родителя и потомка 
  //при выполнении условия перезаписывает стейт, влияющий на выбор активной вкладки 
  const handleScroll = () => {
    const containerRect = containerRef.current.getBoundingClientRect();
    const bunRect = bunRef.current.getBoundingClientRect();
    const sauceRect = sauceRef.current.getBoundingClientRect();
    const mainRect = mainRef.current.getBoundingClientRect();
    if (containerRect.top >= bunRect.top) {
      setCurrent('bun');
    }
    if (containerRect.top >= sauceRect.top) {
      setCurrent('sauce');
    }
    if (containerRect.top >= mainRect.top) {
      setCurrent('main');
    }
  };

  return (
    <section className={`${Style.section} pt5 mb-10`}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <TabMenu current={current} />
      <ul className={`${Style.listingridients}`} ref={containerRef} onScroll={handleScroll}>
        <IngredientCategory data={bunsArr} header='Булки' id="bun" ref={bunRef} />
        <IngredientCategory data={sauceArr} header='Соусы' id="sauce" ref={sauceRef} />
        <IngredientCategory data={mainArr} header='Начинки' id="main" ref={mainRef} />
      </ul>
    </section>
  )
}



