import React from "react";
import { useHistory } from "react-router";
import { NavLink, Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import classes from "./header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleClick = () => {
    history.push("/");
  };

  const logoutHandler = () => {
    // console.log("logout");
    dispatch(logout());
    window.location.reload();
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.left}>
        <h2 className={classes.branding} onClick={handleClick}>
          Zaiem shop
        </h2>
      </div>
      <div className={classes.middle}>
        <SearchBox />
      </div>

      <div className={classes.right}>
        <div className={classes.itemContainer}>
          <ul className={classes.items}>
            <li className={classes.cart}>
              <NavLink to="/cart" activeClassName="active">
                {" "}
                <i class="fas fa-shopping-cart"></i> Cart
              </NavLink>
            </li>

            {userInfo && userInfo.isAdmin && (
              <li>
                <NavDropdown title="Admin" id="admin">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </li>
            )}

            {userInfo ? (
              <li>
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item>
                    {" "}
                    <Link to="/profile">Profile</Link>{" "}
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
            ) : (
              <li>
                <NavLink to="/login" activeClassName="active">
                  <i class="fas fa-user"></i> Sign In
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
