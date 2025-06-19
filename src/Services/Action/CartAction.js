import axios from "axios";
const api = axios.create({ baseURL: "" });
const cartLoading = () => ({ type: "CART_LOADING" });
const setCartItems = (items) => ({ type: "SET_CART_ITEMS", payload: items });
const cartError = (err) => ({ type: "CART_ERROR", payload: err });
export const fetchCartAsync = () => async (dispatch) => {
  dispatch(cartLoading());
  try {
    const { data } = await axios.get("http://localhost:3000/cart"); 
    dispatch(setCartItems(data));
  } catch (err) {
    dispatch(cartError(err.message));
  }
};


export const addToCartAsync = (product) => async (dispatch, getState) => {
  dispatch(cartLoading());
  try {
    const { cartReducer } = getState();
    const existingItem = cartReducer.cartItems.find(
      (item) => item.productId === product.id
    );

    if (existingItem) {
      await api.patch(`http://localhost:3000/cart/${existingItem.id}`, { qty: existingItem.qty + 1 });
    } else {
      await api.post("http://localhost:3000/cart", {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        qty: 1,
      });
    }

    dispatch(fetchCartAsync()); 
  } catch (err) {
    dispatch(cartError(err.message));
  }
};
export const incrementQtyAsync = (cartId) => async (dispatch, getState) => {
  const { cartReducer } = getState();
  const item = cartReducer.cartItems.find((c) => c.id === cartId);
  if (!item) return;
  dispatch(cartLoading());
  try {
    await axios.patch(`http://localhost:3000/cart/${cartId}`, { qty: item.qty + 1 });
    dispatch(fetchCartAsync());
  } catch (err) {
    dispatch(cartError(err.message));
  }
};
export const decrementQtyAsync = (cartId) => async (dispatch, getState) => {
  const { cartReducer } = getState();
  const item = cartReducer.cartItems.find((c) => c.id === cartId);
  if (!item || item.qty === 1) return;
  dispatch(cartLoading());
  try {
    await axios.patch(`http://localhost:3000/cart/${cartId}`, { qty: item.qty - 1 });
    dispatch(fetchCartAsync());
  } catch (err) {
    dispatch(cartError(err.message));
  }
};
export const removeFromCartAsync = (cartId) => async (dispatch) => {
  dispatch(cartLoading());
  try {
    await axios.delete(`http://localhost:3000/cart/${cartId}`);
    dispatch(fetchCartAsync());
  } catch (err) {
    dispatch(cartError(err.message));
  }
};

