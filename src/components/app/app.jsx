import AppHeader from "../app-header/app-header";
import MainPage from "../../pages/main-page/main-page";
import React from "react";

function App() {
  const api = 'https://norma.nomoreparties.space/api/ingredients';

  const [state, setState] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      return await fetch(api)
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((data) => setState(data.data))
        .catch((err) => console.log(err));
    }
    getData();
  }, [])

  return (
    <>
      <AppHeader />
      <MainPage data={state} />
    </>
  )
}

export default App
