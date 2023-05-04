// Хорошая практика - передавать в useSelector не анонимную, а именованную функцию. 
// Это позволит избежать лишних вызовов useSelector 
// и сохранить встроенную в метод useSelector мемоизацию
export const getOrderNumber = state => state.order.number; //номер заказа
export const getOrderData = state => state.constructorData; //список ингредиентов в заказе
export const getAllIngredientsData = state => state.ingredients.ingredients; //общий список ингредиентов
export const getIngredientData = store => store.ingredientDetails.ingredient; //конкретный ингредиент
