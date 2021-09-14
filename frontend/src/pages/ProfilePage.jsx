import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Form, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "react-loader-spinner";

// import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { getUserOrders } from "../actions/orderActions";

const ProfilePage = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [customError, setCustomError] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userOrders = useSelector((state) => state.userOrders);
  const { orders, loading: loadingOrders, error: errorOrders } = userOrders;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success,
    loading: updateLoading,
    error: updateError,
  } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(getUserOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, history, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email.trim() && !password.trim() && !name.trim()) {
      setCustomError("Fill in the below fields, They cannot be empty.");
    } else if (password !== confirmPassword) {
      setCustomError("Passwords do not match");
    } else {
      setCustomError(null);
      // Dispatch action

      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          oldPassword,
          newPassword: password,
        })
      );
    }
  };

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Row>
      <Col md={4}>
        <h2>Profile</h2>
        {updateLoading && (
          <Loader type="Rings" color="#8e44ad" height={80} width={80} />
        )}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && (
          <Loader type="Rings" color="#8e44ad" height={80} width={80} />
        )}
        {updateError && <Message variant="danger">{updateError}</Message>}
        {error ? (
          <Message variant="danger">
            {customError ? customError : error}
          </Message>
        ) : (
          customError && (
            <Message variant="danger">
              {customError ? customError : error}
            </Message>
          )
        )}

        <Form onSubmit={submitHandler} style={{ color: "white" }}>
          <Form.Group controlId="name">
            <Form.Label>Name </Form.Label>
            <Form.Control
              autoComplete="true"
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

          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              autoComplete="true"
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

          <Form.Group controlId="password">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              autoComplete="true"
              style={{ color: "white" }}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Old Password."
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
                setCustomError(null);
              }}
            ></Form.Control>
            <i
              className={
                showPassword ? "fas fa-eye my-1" : "fas fa-eye-slash my-1"
              }
              style={{ cursor: "pointer" }}
              onClick={showPasswordHandler}
            ></i>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              autoComplete="true"
              style={{ color: "white" }}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your New Password."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setCustomError(null);
              }}
            ></Form.Control>
            <i
              className={
                showPassword ? "fas fa-eye my-1" : "fas fa-eye-slash my-1"
              }
              style={{ cursor: "pointer" }}
              onClick={showPasswordHandler}
            ></i>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              autoComplete="true"
              style={{ color: "white" }}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your New Password."
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setCustomError(null);
              }}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="my-3"
            style={{ width: "200px" }}
          >
            Update
          </Button>
        </Form>
      </Col>

      <Col md={8}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader type="ThreeDots" color="#8e44ad" height={80} width={80} />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substr(0, 10)}</td>
                  <td>$ {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substr(0, 10)
                    ) : (
                      <i
                        className="fas fa-times-circle"
                        style={{ color: "#8e44ad" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substr(0, 10)
                    ) : (
                      <i
                        className="fas fa-times-circle"
                        style={{ color: "#8e44ad" }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="dark" className="btn-sm w-100">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
