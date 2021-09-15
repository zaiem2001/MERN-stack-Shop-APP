import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Form,
  Image,
  Button,
  Card,
} from "react-bootstrap";

import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

// ############################### FUNCTIONS OF CART --> ##############################

const CartPage = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productId = match.params.id;

  const query = location.search;
  let qty = query ? Number(query.split("=")[1]) : 1;

  const currentItem =
    cartItems.find((item) => item.product === productId) || {};

  if (currentItem) {
    qty = currentItem.countInStock < qty ? currentItem.countInStock : qty;
  }

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (!userInfo) {
      history.push("/login?redirect=shipping");
    } else {
      history.push("/shipping");
    }
  };

  // ################################# RETURN STATEMENT --> ##################################
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="warning">
            Your cart is empty proceed to :{" "}
            <Link to="/">
              {" "}
              <strong>STORE</strong>{" "}
            </Link>{" "}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.product}
                style={{ marginBottom: "10px" }}
              >
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    {" "}
                    $ <strong>{item.price}</strong>{" "}
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      style={{ color: "white" }}
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {" "}
                          {x + 1}{" "}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                      className="trash"
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {" "}
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Items
              </h2>{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>
                Total Amount : ${"\t"}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                variant="dark"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                {" "}
                Proceed to Checkout{" "}
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      {cartItems.length !== 0 && (
        <Button
          type="button"
          variant="light"
          className="btn btn-outline-success"
          style={{
            width: "200px",
            height: "50px",
            transform: "translateX(5%)",
          }}
        >
          <Link to="/" style={{ color: "black" }}>
            Go to Store
          </Link>
        </Button>
      )}
    </Row>
  );
};

export default CartPage;
