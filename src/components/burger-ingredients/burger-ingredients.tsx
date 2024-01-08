import Style from './burger-ingredients.module.css';
import TabMenu from '../tabs/tabs';
import IngredientCategory from '../ingredient-category/ingredient-category';
import { useRef, useState, useMemo } from 'react';
import { TIngredientItem, useAppSelector } from "../../services/types/types";

export default function BurgerIngredients() {
  //достали ингредиенты из стора и раскидали по разделам
  const data = useAppSelector(state => state.ingredients.ingredients);
  const bunsArr = useMemo(
    () => { return data.filter((bun: TIngredientItem) => bun.type === "bun"); }, [data]);
  const sauceArr = useMemo(
    () => { return data.filter((sauce: TIngredientItem) => sauce.type === "sauce"); }, [data]);
  const mainArr = useMemo(
    () => { return data.filter((main: TIngredientItem) => main.type === "main"); }, [data]);

  //константы для последующего вычисления активной вкладки посредством анализа расположения разделов 
  const [current, setCurrent] = useState<'bun' | 'sauce' | 'main'>('bun');
  const containerRef = useRef<HTMLUListElement>(null);
  const bunRef = useRef<HTMLLIElement>(null);
  const sauceRef = useRef<HTMLLIElement>(null);
  const mainRef = useRef<HTMLLIElement>(null);

  //создаем функцию срабатывающую на событие скролла, сравнивает координаты верхних точек родителя и потомка 
  //при выполнении условия перезаписывает стейт, влияющий на выбор активной вкладки 
  const handleScroll = () => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    const bunRect = bunRef.current?.getBoundingClientRect();
    const sauceRect = sauceRef.current?.getBoundingClientRect();
    const mainRect = mainRef.current?.getBoundingClientRect();
    if (containerRect && bunRect && sauceRect && mainRect) {
      if (containerRect.top >= bunRect.top) {
        setCurrent('bun');
      }
      if (containerRect.top >= sauceRect.top) {
        setCurrent('sauce');
      }
      if (containerRect.top >= mainRect.top) {
        setCurrent('main');
      }
    }
  };

  return (
    <section className={`${Style.section} pt5 mb-10`}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <TabMenu current={current} bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} />
      <ul className={`${Style.listingridients}`} ref={containerRef} onScroll={handleScroll}>
        <IngredientCategory dataArr={bunsArr} header='Булки' id="bun" ref={bunRef} />
        <IngredientCategory dataArr={sauceArr} header='Соусы' id="sauce" ref={sauceRef} />
        <IngredientCategory dataArr={mainArr} header='Начинки' id="main" ref={mainRef} />
      </ul>
    </section>
  )
}



