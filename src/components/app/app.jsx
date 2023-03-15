import AppHeader from "../app-header/app-header";
import MainPage from "../../pages/main-page/main-page";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import igrArr from '../utils/data';

function App() {
  return (
    <>
    <AppHeader />
    <MainPage>
      <BurgerIngredients ingrData={igrArr}/>
      <BurgerConstructor/>
    </MainPage>
    </>
  )
}

export default App
