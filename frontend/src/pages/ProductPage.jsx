import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";

import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

import Rating from "../components/Rating";
import "../index.css";
import { listProductDetail, reviewProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

// ###### COMPONENT ---->

const ProductPage = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const productReview = useSelector((state) => state.productReview);
  let {
    success: successReview,
    error: errorReview,
    loading: loadingReview,
  } = productReview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const id = match.params.id;

  useEffect(() => {
    if (successReview) {
      setRating(0);
      setComment("");
      dispatch({ type: "PRODUCT_REVIEW_RESET" });
    }

    dispatch(listProductDetail(id));
  }, [dispatch, id, successReview]);

  const handleSelect = (e) => {
    setQty(e.target.value);
  };

  const addToCartHandler = () => {
    const url = `/cart/${id}?qty=${qty}`;
    history.push(url);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      reviewProduct(id, {
        rating,
        comment,
      })
    );
  };

  // ########## RETURN STATEMENT ----->

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varinat="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Link className="btn btn-dark my-3" to="/">
            GO BACK
          </Link>
          <Row>
            <Col md={4}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item variant="dark">
                  <h4 style={{ color: "black" }}>{product.name}</h4>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>

                <ListGroup.Item>
                  Price: <strong> ${product.price}</strong>
                </ListGroup.Item>

                <ListGroup.Item>
                  Description: <h6>{product.description}</h6>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price :</Col>
                      <Col>
                        <strong> {product.price} </strong>{" "}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status :</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty :</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={handleSelect}
                            style={{ color: "white", cursor: "pointer" }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn btn-dark btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2 className="my-1">Reviews</h2>
              {product.reviews.length !== 0 ? (
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating
                        value={review.rating}
                        color={review.rating >= 3 ? "#0be881" : "#ff5e57"}
                      />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p
                        style={{
                          margin: "0",
                          color: review.rating >= 3 ? "#05c46b" : "#ff5e57",
                        }}
                      >
                        {review.comment}
                      </p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Message variant="info">No Reviews Found</Message>
              )}
            </Col>

            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item style={{ marginTop: "34px" }}>
                  <h2 className="text-center reviewBorder">Write A Review</h2>
                  {userInfo ? (
                    <Form onSubmit={reviewSubmitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          style={{
                            color: "white",
                            maxWidth: "200px",
                          }}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className="my-1">
                        <Form.Label controlId="comment">Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          style={{ color: "white" }}
                          rows="2"
                        ></Form.Control>
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="dark"
                        className="my-1 mb-2 w-25"
                      >
                        Submit
                      </Button>
                      {loadingReview && <Loader />}
                      {errorReview && (
                        <Message variant="danger">{errorReview}</Message>
                      )}
                    </Form>
                  ) : (
                    <Message variant="info">
                      Please{" "}
                      <Link
                        to={`/login?redirect=/product/${product._id}`}
                        style={{
                          textDecoration: "none",
                          color: "#1e272e",
                        }}
                      >
                        <strong> Log In </strong>
                      </Link>
                      to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Fragment>
  );
};

export default ProductPage;
