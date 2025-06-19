import { useSelector, useDispatch} from "react-redux";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import {removeFromCartAsync,decrementQtyAsync,incrementQtyAsync,fetchCartAsync} from "../Services/Action/CartAction";
import emptyCart from '../assets/Images/empty.webp'
import "../App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
const Cart = () => {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const navigate= useNavigate();
  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const totalDiscount = cartItems.reduce(
    (acc, item) => acc + item.qty * 100,
    0
  );
  const platformFee = 4;
  const finalAmount = totalAmount - totalDiscount + platformFee;
  return (
   <div className="cart-container py-5">
      <Container>
        <Row>
          {cartItems.length > 0 ? (
            <>
              <Col md={8}>
                {cartItems.map((item) => (
                  <Card className="cart-horizontal mb-3 shadow-sm" key={item.id}>
                    <Row className="g-0 align-items-center">
                      <Col md={4}>
                        <Image src={item.image} fluid className="p-3" />
                      </Col>
                      <Col md={5}>
                        <Card.Body className="text-start">
                          <Card.Title className="fw-semibold">{item.title}</Card.Title>
                          <Card.Text className="text-muted">Seller: RetailMart</Card.Text>
                          <Card.Text className="text-success fw-bold fs-5">
                            ₹{item.price * item.qty}
                          </Card.Text>
                          <Card.Text className="text-muted">Delivery by Jun 25</Card.Text>
                        </Card.Body>
                      </Col>
                      <Col md={6} className="text-center my-3">
                        <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
                          <Button variant="outline-secondary" size="sm" onClick={() => dispatch(decrementQtyAsync(item.id))}>
                            -
                          </Button>
                          <span className="fw-bold">{item.qty}</span>
                          <Button variant="outline-secondary" size="sm" onClick={() => dispatch(incrementQtyAsync(item.id))}>
                            +
                          </Button>
                          <Button variant="link" className="text-decoration-none text-dark fw-bold">
                            SAVE FOR LATER
                          </Button>
                          <Button variant="link" className="text-decoration-none text-dark fw-bold" 
                          onClick={() => dispatch(removeFromCartAsync(item.id))}>
                            REMOVE
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Col>
              <Col md={4}>
                <Card className="p-3 shadow-sm">
                  <h5 className="mb-3">PRICE DETAILS</h5>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span>
                      Price ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
                    </span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Discount</span>
                    <span>- ₹{totalDiscount}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold mb-3">
                    <span>Total Amount</span>
                    <span>₹{finalAmount}</span>
                  </div>
                  <p className="text-success">
                    You will save ₹{totalDiscount - platformFee} on this order
                  </p>
                  <Button className="w-100 bg-warning border-0 text-white fw-bold">
                    PLACE ORDER
                  </Button>
                </Card>
              </Col>
            </>
          ) : (
            <Col md={12}>
              <div className="empty-cart-wrapper d-flex flex-column justify-content-center align-items-center ">
                <Image src={emptyCart} alt="Empty cart" className="emptycart-img" />
                <h3 className="mt-2 fw-semibold">Your cart is empty!</h3>
                <p className="text-muted mb-4">Add items to it now.</p>
                <Button variant="primary" className="px-5 py-2 fw-semibold" onClick={() => navigate("/")}>
                  Shop now
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};
export default Cart;




