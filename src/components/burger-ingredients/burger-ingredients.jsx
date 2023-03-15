import Style from './burger-ingredients.module.css';
import TabMenu from '../tabs/tabs';
import IdgridientItems from '../ingridient-items/ingridient-items';


export default function BurgerIngredients(props) {
  const bunsArr = props.ingrData.filter((bun) => bun.type === "bun");
  const sauceArr = props.ingrData.filter((sauce) => sauce.type === "sauce");
  const mainArr = props.ingrData.filter((main) => main.type === "main");

  return (
    <section className={`${Style.section} pt5 mb-10`}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <TabMenu />
      <ul className={`${Style.listingridients} mt-10`}>
        <li>
          <h2 className="text text_type_main-medium" id="bun">Булки</h2>
          <IdgridientItems data={bunsArr} />
        </li>

        <li>
          <h2 className="text text_type_main-medium mt-10" id="sauce">Соусы</h2>
          <IdgridientItems data={sauceArr} />
        </li>

        <li>
          <h2 className="text text_type_main-medium mt-10" id="main">Начинки</h2>
          <IdgridientItems data={mainArr} />
        </li>
      </ul>
    </section>
  )
}

