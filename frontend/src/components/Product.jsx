import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card
      className="my-3 p-3 rounded card"
      style={{ minHeight: "420px", maxHeight: "420px" }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          alt={product.name}
          variant="top"
          style={{ objectFit: "cover", maxHeight: "210px" }}
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>

        <Card.Text
          as="p"
          style={{
            textOverflow: "ellipsis",
            width: "230px",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {product.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
