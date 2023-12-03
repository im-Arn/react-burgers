// Хорошая практика - передавать в useSelector не анонимную, а именованную функцию. 
// Это позволит избежать лишних вызовов useSelector 
// и сохранить встроенную в метод useSelector мемоизацию
export const getOrderNumber = state => state.order.number; //номер заказа
export const getOrderData = state => state.constructorData; //список ингредиентов в заказе
export const getAllIngredientsData = state => state.ingredients.ingredients; //общий список ингредиентов
export const getIngredientData = store => store.ingredientDetails.ingredient; //конкретный ингредиент
export const getLoadingStatus = state => state.ingredients.isloading;
export const getDataLoadStatus = state => state.ingredients.isload;

export const getSuccessUserAuth = store => store.user.isAuthChecked; //пройдена аутентификация
export const getSuccessResetPassword = store => store.user.isPassReset; //сброшен ли пароль
export const getSuccessUserData = store => store.user.success;//не знаю что сказать
export const getUserData = store => store.user;//запрос данных авторизованного пользователя
export const getUserDataName = store => store.user.name;
export const getSuccessPassRecover = store => store.user.isPassRecover; //проверка на запрос о восстановлении пароля

export const getWsOrdersPageData = store => store.wsOrders.orders; //получить список заказов с хранилища вебсокета
export const getWsOrdersPageTotal = store => store.wsOrders.total; //получить число всех заказов с хранилища вебсокета
export const getWsOrdersPageTotalToday = store => store.wsOrders.totalToday; //получить число заказов за сегодня с хранилища вебсокета

export const getWsOrdersUserData = store => store.wsFeedUser.orders;

export const setDate = (createdAt) => {
  const orderDate = new Date(Date.parse(createdAt));
  const timeZone = `${orderDate.getTimezoneOffset() > 0 ? `+${orderDate.getTimezoneOffset() / 60}` : orderDate.getTimezoneOffset() / 60}`;
  return ` i-GMT${timeZone}`;
};

export const sumPrice = (yummy, allIngredients) => {
  let sum = 0;
  yummy.forEach(ing => {
    if (ing !== null) {
      sum += allIngredients.find(item => item._id === ing).price;
    }
  });
  return sum;
}

export const countIngredients = (arr) => {
  const counts = {};
  arr.forEach(el => {
    const item = el;
    counts[item] = counts[item] ? counts[item] + 1 : 1;
  });
  const number = {};
  for (const item in counts) {
    if (counts[item] >= 1) {
      number[item] = counts[item];
    }
  };
  return number;
};
