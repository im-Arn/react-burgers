import AppHeader from "../app-header/app-header";
import MainPage from "../../pages/main-page/main-page";
import React from "react";
import Api from "../utils/Api"
import { serverUrl } from "../utils/serverUrl"

function App() {
  const api = new Api(serverUrl);

  const [state, setState] = React.useState([]);

  React.useEffect(() => {
    api.getIngredients()
      .then((res) => {
        setState(res.data);
      });
  }, []) // eslint-disable-line
// TODO: пустой массив необходим для единоразового срабатывания useEffect

  return (
    <>
      <AppHeader />
      <MainPage data={state} />
    </>
  )
}

export default App
