import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import {
  getProductAsync,
  updateProductAsync,
} from "../Services/Action/ProductAction";
import "../App.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product, isCreated,errorMsg } = useSelector((state) => state.productReducer);

  const initialState = {
    id: "",
    title: "",
    desc: "",
    category: "",
    price: "",
    image: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };
  const validateForm = () => {
    const { title, desc, category, price, image } = inputForm;
    const newErrors = {};
    if (!title) newErrors.title = "Product title is required.";
    if (!desc) newErrors.desc = "Description is required.";
    if (!category) newErrors.category = "Category must be selected.";
    if (!price) {
      newErrors.price = "Price is required.";
    } else if (isNaN(price) || Number(price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }
    if (!image) newErrors.image = "Image URL is required.";
    return newErrors;
  };
 const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(updateProductAsync({ ...inputForm, id }));
  };
  useEffect(() => {
    if (id) dispatch(getProductAsync(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (product) setInputForm(product);
  }, [product]);
 useEffect(() => {
    if (isCreated) {
      setInputForm(initialState);
      setErrors({});
      navigate("/");
    }
  }, [isCreated, navigate]);
  return (
    <Container className="edit-container mt-5 p-4 shadow rounded bg-white" style={{width:"700px"}}>
      <h2 className="text-primary fw-bold text-center mb-4"> Edit Product</h2>
      <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Product Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Product Title" name="title" value={inputForm.title} onChange={handleChanged}/>
            {errors.title && <small className="text-danger">{errors.title}</small>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter Product Description" name="desc" value={inputForm.desc} 
            onChange={handleChanged}/>
            {errors.desc && <small className="text-danger">{errors.desc}</small>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Price</Form.Label>
            <Form.Control type="number" placeholder="Enter Product Price" name="price" value={inputForm.price} onChange={handleChanged}/>
            {errors.price && <small className="text-danger">{errors.price}</small>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Category</Form.Label>
            <Form.Select name="category" value={inputForm.category} onChange={handleChanged}>
              <option value="">Select Category</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Laptops">Laptops</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Appliances">Appliances</option>
              <option value="Beauty">Beauty</option>
              <option value="Grocery">Grocery</option>
            </Form.Select>
            {errors.category && <small className="text-danger">{errors.category}</small>}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Product Image URL</Form.Label>
            <Form.Control type="text" placeholder="Enter Image URL" name="image" value={inputForm.image} onChange={handleChanged}/>
            {errors.image && <small className="text-danger">{errors.image}</small>}
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit" className="px-5 py-2 rounded-pill fw-semibold">
              <span>Update Product</span>
            </Button>
          </div>
          {errorMsg && <p className="text-danger mt-3 text-center">{errorMsg}</p>}
        </Form>
    </Container>
  );
};

export default EditProduct;


