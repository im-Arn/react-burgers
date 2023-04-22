import AppHeader from "../app-header/app-header";
import MainPage from "../../pages/main-page/main-page";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/actions/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <MainPage />
      </DndProvider>
    </>
  )
}

export default App
