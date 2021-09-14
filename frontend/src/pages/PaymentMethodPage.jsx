import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";

import { savePaymentMethod } from "../actions/cartActions";
import FormControl from "../components/FormControl";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentMethodPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) {
    history.push("/login?redirect=payment");
  }

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));

    history.push("/placeorder");
  };

  return (
    <FormControl>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              className="my-2"
              type="radio"
              label="Stripe (soon)"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              disabled
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              className="my-2"
              type="radio"
              label="Google Pay (soon)"
              id="GPay"
              name="paymentMethod"
              value="GooglePay"
              disabled
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              className="my-2"
              type="radio"
              label="Cash On Delivery (soon)"
              id="COD"
              name="paymentMethod"
              value="COD"
              disabled
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormControl>
  );
};

export default PaymentMethodPage;
