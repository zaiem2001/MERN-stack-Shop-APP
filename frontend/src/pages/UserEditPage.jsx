import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormControl from "../components/FormControl";
import { getUserDetails, updateUser } from "../actions/userActions";

const UserEditPage = ({ match, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userId = match.params.id;

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUser,
    error: errorUser,
    success: successUser,
  } = userUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.replace("/");
    }

    if (errorUser) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }

    if (successUser) {
      dispatch({ type: "USER_UPDATE_RESET" });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [history, userInfo, user, dispatch, userId, successUser, errorUser]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
      })
    );
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormControl>
        <h1>Edit User</h1>
        {loadingUser && <Loader />}
        {errorUser && <Message variant="danger">{errorUser}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} style={{ color: "white" }}>
            <Form.Group controlId="name">
              <Form.Label>Name </Form.Label>
              <Form.Control
                style={{ color: "white" }}
                type="text"
                placeholder="Enter Name."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                style={{ color: "white" }}
                type="email"
                placeholder="Enter Email."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                style={{ color: "white" }}
                type="checkbox"
                label="Is Admin"
                value={isAdmin}
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
                }}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-3 w-100">
              Update
            </Button>
          </Form>
        )}
      </FormControl>
    </>
  );
};

export default UserEditPage;
