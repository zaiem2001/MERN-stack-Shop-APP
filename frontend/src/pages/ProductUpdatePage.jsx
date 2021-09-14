import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import Loader from "react-loader-spinner";
import Message from "../components/Message";
import FormControl from "../components/FormControl";
import { listProductDetail, updateProduct } from "../actions/productActions";

const ProductEditPage = ({ match, history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState(0);
  const [uploading, setuploading] = useState(false);

  const productId = match.params.id;

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingProduct,
    error: errorProduct,
    success: successProduct,
  } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProduct) {
      dispatch({ type: "PRODUCT_UPDATE_RESET" });
      history.push("/admin/productlist");
    }

    if (!userInfo || !userInfo.isAdmin) {
      history.replace("/");
    }

    if (!product?.name || product?._id !== productId) {
      dispatch(listProductDetail(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setBrand(product.brand);
      setDescription(product.description);
      setImage(product.image);
      setCountInStock(product.countInStock);
    }
  }, [history, userInfo, product, dispatch, productId, successProduct]);

  const submitHandler = (e) => {
    e.preventDefault();

    const sendData = {
      _id: productId,
      name,
      price,
      brand,
      image,
      countInStock,
      description,
      category,
    };

    dispatch(updateProduct(sendData));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    setuploading(true);

    try {
      const url = "/api/upload";

      const resp = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {},
      });

      const data = await resp.json();

      console.log(data);

      setImage(data);
      setuploading(false);
    } catch (error) {
      console.log(error);
      setuploading(false);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-outline-primary">
        Go Back
      </Link>
      <FormControl>
        <h1>Edit Product</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} style={{ color: "white" }}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Name </Form.Label>
                  <Form.Control
                    required
                    style={{ color: "white" }}
                    type="text"
                    placeholder="Enter Name."
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="price" className="my-3">
                  <Form.Label>Price </Form.Label>
                  <Form.Control
                    required
                    style={{ color: "white" }}
                    type="number"
                    placeholder="Enter Price."
                    value={price}
                    minLength="1"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="brand" className="my-3">
                  <Form.Label>Brand </Form.Label>
                  <Form.Control
                    required
                    style={{ color: "white" }}
                    type="text"
                    value={brand}
                    placeholder="Enter Brand"
                    onChange={(e) => {
                      setBrand(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    required
                    style={{ color: "white" }}
                    type="text"
                    placeholder="Enter Category"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="image">
                  <Form.Label>Image </Form.Label>
                  <Form.Control
                    required
                    style={{ color: "white" }}
                    type="text"
                    placeholder="Enter Image Url"
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                    }}
                  ></Form.Control>

                  <Form.File
                    className="my-2 mb-5"
                    id="image-file"
                    label="Choose File"
                    custom
                    onChange={uploadFileHandler}
                  ></Form.File>
                  {uploading && (
                    <Loader
                      type="Bars"
                      color="#8e44ad"
                      height={80}
                      width={80}
                      className="text-center"
                    />
                  )}
                </Form.Group>

                <Form.Group controlId="countInStock" className="my-3">
                  <Form.Label>Count In Stock </Form.Label>
                  <Form.Control
                    minLength="1"
                    style={{ color: "white" }}
                    type="number"
                    placeholder="Enter Count In Stock"
                    value={countInStock}
                    onChange={(e) => {
                      setCountInStock(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    style={{ color: "white" }}
                    type="text"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Button type="submit" variant="primary" className="my-3 w-100">
                Update
              </Button>
            </Row>
          </Form>
        )}
      </FormControl>
      {loadingProduct && <Loader className="text-center" />}
      {errorProduct && <Message variant="danger">{errorProduct}</Message>}
    </>
  );
};

export default ProductEditPage;
