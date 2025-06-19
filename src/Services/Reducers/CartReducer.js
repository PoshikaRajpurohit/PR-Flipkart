
const initialState = {
  cartItems: [],      
  isLoading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case "IS_LOADING":
      return { ...state, isLoading: true, error: null };

  
    case "SET_CART_ITEMS":
      return { ...state, isLoading: false, cartItems: action.payload };

 
    case "CART_ERROR":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default cartReducer;

