import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../actions/userActions";
import FormControl from "../components/FormControl";

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [customError, setCustomError] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search.split("=")[1] || "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setCustomError("Fill in the below fields, They cannot be empty.");
    } else {
      setCustomError(null);
      // Dispatch action
      dispatch(login(email, password));
    }
  };

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormControl>
      <h1>Sign In</h1>
      {loading && <Loader />}
      {error ? (
        <Message variant="danger">{customError ? customError : error}</Message>
      ) : (
        customError && (
          <Message variant="danger">
            {customError ? customError : error}
          </Message>
        )
      )}

      <Form onSubmit={submitHandler} style={{ color: "white" }}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            style={{ color: "white" }}
            type="email"
            placeholder="Enter Your Email."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setCustomError(null);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            style={{ color: "white" }}
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setCustomError(null);
            }}
          ></Form.Control>
          <i
            className={
              showPassword ? "fas fa-eye my-3" : "fas fa-eye-slash my-3"
            }
            style={{ cursor: "pointer" }}
            onClick={showPasswordHandler}
          ></i>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3 w-100">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Here?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register Now
          </Link>
        </Col>
      </Row>
    </FormControl>
  );
};

export default LoginPage;
