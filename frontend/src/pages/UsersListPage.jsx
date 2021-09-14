import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Loader from "react-loader-spinner";

import Message from "../components/Message";
import { getUsersList, deleteUser } from "../actions/userActions";

const UsersListPage = ({ history }) => {
  const dispatch = useDispatch();

  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;

  let sortedUsers;
  if (users) {
    sortedUsers = users.sort((x, y) => {
      return x.isAdmin === y.isAdmin ? 0 : x.isAdmin ? -1 : 0;
    });
  }

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    success: successDelete,
    error: successError,
    loading: successLoading,
  } = userDelete;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.replace("/");
    }

    dispatch(getUsersList());
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  {" "}
                  <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
                </td>
                <td>
                  {user.isAdmin ? (
                    <i
                      className="fas fa-check-circle"
                      style={{ color: "green" }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-times-circle"
                      style={{ color: "red" }}
                    ></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-3 adminTrash">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    className="btn-sm adminTrash"
                    variant="danger"
                    onClick={() => {
                      deleteHandler(user._id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {successLoading && (
        <Loader
          type="Grid"
          color="#8e44ad"
          height={80}
          width={80}
          className="text-center"
        />
      )}
      {successError && <Message variant="danger">{successError}</Message>}
    </>
  );
};

export default UsersListPage;
