import axios from 'axios';


export const addNewProductSuc = () => ({
  type: "ADD_PRODUCT_SUC",
});

export const addNewProductRej = (err) => ({
  type: "ADD_PRODUCT_REJ",
  payload: err
});

export const getAllProducts = (data) => ({
  type: "GET_ALL_PRODUCTS",
  payload: data
});

export const deleteProductRej = (err) => ({
  type: "DELETE_PRODUCT_REJ",
  payload: err
});

export const getProductSuc = (data) => ({
  type: "GET_PRODUCT",
  payload: data
});

export const updateProductSuc = (data) => ({
  type: "UPDATE_PRODUCT_SUCCESS",
  payload: data
});

export const loading = () => ({
  type: "LOADING"
});


export const getAllProductsAsync = () => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const res = await axios.get("http://localhost:3000/products");
      dispatch(getAllProducts(res.data));
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };
};

export const addNewProductAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.post("http://localhost:3000/products", data);
      dispatch(addNewProductSuc());
      dispatch(getAllProductsAsync());
    } catch (err) {
      console.error("Add product failed:", err);
      dispatch(addNewProductRej(err.message));
    }
  };
};

export const deleteProductAsync = (id) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      dispatch(getAllProductsAsync());
    } catch (err) {
      console.error("Delete failed:", err);
      dispatch(deleteProductRej(err.message));
    }
  };
};

export const getProductAsync = (id) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const res = await axios.get(`http://localhost:3000/products/${id}`);
      dispatch(getProductSuc(res.data));
    } catch (err) {
      console.error("Get single product failed:", err);
    }
  };
};

export const updateProductAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const res = await axios.put(`http://localhost:3000/products/${data.id}`, data);
      dispatch(updateProductSuc(res.data));
      dispatch(getAllProductsAsync());
    } catch (err) {
      console.error("Update product failed:", err);
    }
  };
};

