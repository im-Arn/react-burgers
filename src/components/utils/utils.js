// Хорошая практика - передавать в useSelector не анонимную, а именованную функцию. 
// Это позволит избежать лишних вызовов useSelector 
// и сохранить встроенную в метод useSelector мемоизацию
export const getOrderNumber = state => state.order.number; //номер заказа
export const getOrderData = state => state.constructorData; //список ингредиентов в заказе
export const getAllIngredientsData = state => state.ingredients.ingredients; //общий список ингредиентов
export const getIngredientData = store => store.ingredientDetails.ingredient; //конкретный ингредиент

export const getSuccessUserAuth = store => store.user.isAuthChecked; //пройдена аутентификация
export const getSuccessResetPassword = store => store.user.isPassReset; //сброшен ли пароль
export const getSuccessUserData = store => store.user.success;//не знаю что сказать
export const getUserData = store => store.user;//запрос данных авторизованного пользователя
export const getUserDataName = store => store.user.name;
export const getSuccessPassRecover = store => store.user.isPassRecover; //проверка на запрос о восстановлении пароля
