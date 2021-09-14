import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

import FormControl from "../components/FormControl";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const {
    shippingAddress: {
      address: add,
      city: cit,
      postalCode: pCode,
      country: count,
    },
  } = cart;

  const [address, setAddress] = useState(add);
  const [city, setCity] = useState(cit);
  const [postalCode, setPostalCode] = useState(pCode);
  const [country, setCountry] = useState(count);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );

    history.push("/payment");
  };

  return (
    <FormControl>
      <CheckoutSteps step1 step2 />
      <h1>Shipping Address</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            style={{ color: "white" }}
            type="text"
            placeholder="Enter Your Address."
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city" className="my-1">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            style={{ color: "white" }}
            type="text"
            placeholder="Enter Your City."
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            required
            style={{ color: "white" }}
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            style={{ color: "white" }}
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormControl>
  );
};

export default ShippingPage;
