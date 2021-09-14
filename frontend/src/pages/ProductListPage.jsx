import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import Loader from "react-loader-spinner";

import Paginate from "../components/Paginate";
import Message from "../components/Message";
import {
  listProduct,
  deleteProduct,
  createProduct,
} from "../actions/productActions";

// COMPONENT --->

const ProductListPage = ({ history, match }) => {
  const [sort, setSort] = useState("low");

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  let sortedProducts;

  if (products) {
    sortedProducts = products.sort((a, b) => {
      if (sort === "low") {
        return a.price > b.price ? 0 : -1;
      } else {
        return a.price > b.price ? -1 : 0;
      }
    });
  }

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: "PRODUCT_CREATE_RESET" });

    if (!userInfo.isAdmin) {
      history.replace("/");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProduct("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = (product) => {
    dispatch(createProduct());
  };

  return (
    <>
      {!loading && products.length === 0 ? (
        <Message variant="info">No Product Found.</Message>
      ) : (
        <>
          <Row className="align-items-center">
            <Col>
              <h1>Products</h1>
            </Col>
            <Col style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button className="my-3" onClick={createProductHandler}>
                <i className="fas fa-plus-circle"></i> Create Product
              </Button>
            </Col>
          </Row>
          {loadingDelete && (
            <Loader
              type="Bars"
              color="#8e44ad"
              height={80}
              width={80}
              className="text-center"
            />
          )}

          {loadingCreate && (
            <Loader
              type="Bars"
              color="#8e44ad"
              height={80}
              width={80}
              className="text-center"
            />
          )}

          {errorCreate && <Message variant="danger">{errorCreate}</Message>}

          {errorDelete && <Message variant="danger">{errorDelete}</Message>}

          {loading ? (
            <Loader
              type="Bars"
              color="#8e44ad"
              height={80}
              width={80}
              className="text-center"
            />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Table
                striped
                bordered
                hover
                responsive
                className="table-sm text-center"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {sortedProducts.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>$ {product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit`}
                        >
                          <Button
                            variant="light"
                            className="btn-sm mx-3 adminTrash"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>

                        <Button
                          className="btn-sm adminTrash"
                          variant="danger"
                          onClick={() => {
                            deleteHandler(product._id);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Paginate page={page} pages={pages} isAdmin={true} />
            </>
          )}

          <h2 className="my-3">Sort Price By :-</h2>

          <Form.Control
            style={{ color: "white", width: "200px" }}
            as="select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </Form.Control>
        </>
      )}
    </>
  );
};

export default ProductListPage;
