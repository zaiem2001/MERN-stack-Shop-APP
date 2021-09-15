import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";

import { TopProduct } from "../actions/productActions";
import Message from "./Message";
import Loader from "./Loader";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTop = useSelector((state) => state.productTop);
  const { loading, error, products } = productTop;

  useEffect(() => {
    dispatch(TopProduct());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark carousel">
      {products.map((p) => (
        <Carousel.Item key={p._id} className="carousel-item" interval="2500">
          <Link to={`/product/${p._id}`}>
            <Image src={p.image} alt={p.name} fluid className="img mobileImg" />
            <Carousel.Caption className="carousel-caption">
              <h2 className="mobileHeading">
                {p.name} ($ {p.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
