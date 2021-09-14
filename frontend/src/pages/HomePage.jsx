import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { listProduct } from "../actions/productActions";
import Product from "../components/Product";
import "../index.css";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomePage = ({ match }) => {
  const dispatch = useDispatch();

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
    // eslint-disable-next-line
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword && <ProductCarousel />}
      {!loading && products.length === 0 && (
        <>
          <Message variant="danger"> No Product Found </Message>
          <Link to="/">
            {" "}
            <Button className="w-25">Go Back</Button>{" "}
          </Link>
        </>
      )}
      {products.length !== 0 && (
        <>
          <h1 className="p-3">Latest products</h1>
          <Paginate
            pages={pages}
            keyword={keyword ? keyword : ""}
            page={page}
          />
        </>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((p) => (
              <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={p} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            keyword={keyword ? keyword : ""}
            page={page}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
