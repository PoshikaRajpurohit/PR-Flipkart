const initialState = {
  products: [],
  product: null,
  isLoading: false,
  isCreated: false,
  errorMsg: ""
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true
      };

    case "ADD_PRODUCT_SUC":
      return {
        ...state,
        isCreated: true,
        isLoading: false
      };

    case "ADD_PRODUCT_REJ":
    case "DELETE_PRODUCT_REJ":
      return {
        ...state,
        errorMsg: action.payload,
        isLoading: false
      };

    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        isCreated: false  
      };

    case "GET_PRODUCT":
      return {
        ...state,
        product: action.payload,
        isLoading: false
      };

    case "UPDATE_PRODUCT_SUCCESS":
      return {
        ...state,
        products: state.products.map(prod =>
          prod.id === action.payload.id ? action.payload : prod
        ),
        product: null,
        isCreated: true, 
        isLoading: false
      };

    default:
      return state;
  }
};

export default productReducer;
