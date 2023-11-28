import Style from "./ingredient-page.module.css";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

export default function IngredientPage() {
  return (
    <section className={Style.container}>
      <IngredientDetails />
    </section>
  )
};
