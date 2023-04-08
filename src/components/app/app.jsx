import AppHeader from "../app-header/app-header";
import MainPage from "../../pages/main-page/main-page";
import React, { useState } from "react";
import Api from "../utils/Api";
import { SERVER_URL } from "../utils/serverUrl";
import { TotalDataContext, ApiClassContext } from '../../services/AppContext';

function App() {
  const api = new Api(SERVER_URL);

  const [data, setData] = useState([]); //данные запрошенные с сервера

  React.useEffect(() => {
    api.getIngredients()
      .then((res) => {
        setData(res.data);
      });
  }, []) // eslint-disable-line
  // TODO: пустой массив необходим для единоразового срабатывания useEffect

  return (
    <>
      <AppHeader />
      <TotalDataContext.Provider value={{ data, setData }}>
        <ApiClassContext.Provider value={{ api }}>
          <MainPage />
        </ApiClassContext.Provider>
      </TotalDataContext.Provider>
    </>
  )
}

export default App
