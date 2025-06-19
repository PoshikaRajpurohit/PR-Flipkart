import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProductAsync } from "../Services/Action/ProductAction";
import { addToCartAsync } from "../Services/Action/CartAction";
import {Container,Row,Col,Image,Spinner,Button,ListGroup,Badge,} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
const ViewProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isLoading } = useSelector((state) => state.productReducer);
  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [dispatch, id]);
  const handleAddToCart = () => {
    dispatch(addToCartAsync(product));
    navigate("/cart");
  };
  const handleBuyNow = () => {
    dispatch(addToCartAsync(product));
    navigate("/");
  };
  if (isLoading || !product) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <Container className="py-5">
      <Row>       
       <Col md={4} className="d-flex flex-column align-items-center">
        <Image src={product.image} alt={product.title} fluid className="border mb-3" style={{ maxHeight: "400px", objectFit: "contain" }}/>
        <div className="d-flex w-100 gap-2 px-2">
          <Button variant="warning" className="w-50 text-white fw-bold" onClick={handleAddToCart}>
           <FaShoppingCart /> Go to Cart
          </Button>
          <Button variant="danger" className="w-50 fw-bold" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </div>
    </Col>
        <Col md={8}>
          <h3 className="text-align-start d-flex">{product.title}</h3>
          <p className="text-muted d-flex text-align-start">{product.category}</p>
          <div className="d-flex text-align-start gap-2 mb-2">
            <Badge bg="success">4.1 ★</Badge>
            <span className="text-muted">(42,000+ Ratings)</span>
          </div>
          <h4 className="text-success d-flex text-align-start">₹{product.price} <small className="text-muted tetx-align-start 
          text-decoration-line-through">₹{Math.floor(product.price * 2)}</small> <span className="text-danger">50% off</span></h4>
          <div className=" d-flex text-align-start">
            <ListGroup variant="flush" className="my-3 ">
            <ListGroup.Item><strong>Available offers:</strong></ListGroup.Item>
            <ListGroup.Item>🎁 10% Cashback on SuperMoney UPI</ListGroup.Item>
            <ListGroup.Item>💳 ₹750 off on HDFC Credit Cards</ListGroup.Item>
            <ListGroup.Item>🔥 5% unlimited cashback on Flipkart Axis card</ListGroup.Item>
          </ListGroup>
          </div>
          <p className="text-muted d-flex text-align-start ">{product.desc}</p>
          <Row >
            {[...Array(4)].map((_, i) => (
              <Col key={i} xs={1}>
                <Image src={product.image} fluid className="border" style={{ height: "60px", objectFit: "contain" }}/>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default ViewProduct;

