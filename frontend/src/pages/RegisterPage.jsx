import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { register } from "../actions/userActions";
import FormControl from "../components/FormControl";

const RegisterPage = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [customError, setCustomError] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

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
    } else if (password !== confirmPassword) {
      setCustomError("Passwords do not match");
    } else {
      setCustomError(null);
      // Dispatch action
      dispatch(register(name, email, password));
    }
  };

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormControl>
      <h1>Sign Up</h1>
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
        <Row>
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Name </Form.Label>
              <Form.Control
                style={{ color: "white" }}
                type="text"
                placeholder="Enter Your Name."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setCustomError(null);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="my-5">
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
          </Col>

          <Col md={6}>
            <Form.Group controlId="password">
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

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                style={{ color: "white" }}
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your Password."
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
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
          </Col>
        </Row>

        <Button
          type="submit"
          variant="primary"
          className="my-3"
          style={{ width: "200px" }}
        >
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormControl>
  );
};

export default RegisterPage;
