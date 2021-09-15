import React, { useState } from "react";
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

  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleClick = () => {
    setToggle(false);
    history.push("/");
  };

  const logoutHandler = () => {
    // console.log("logout");
    setToggle(false);
    dispatch(logout());
    window.location.reload();
  };

  return (
    <nav className={classes.navbar}>
      <div
        className={classes.mobile}
        onClick={() => setToggle((prev) => !prev)}
      >
        <span
          style={{ backgroundColor: toggle && "#ff4757" }}
          className={toggle ? `${classes.toggle}` : null}
        ></span>
        <span></span>
        <span
          style={{ backgroundColor: toggle && "#ff4757" }}
          className={toggle && `${classes.toggleB}`}
        ></span>
      </div>
      <div className={classes.left}>
        <h2 className={classes.branding} onClick={handleClick}>
          Zaiem shop
        </h2>
      </div>
      <div className={classes.middle}>
        <SearchBox set={setToggle} />
      </div>

      <div className={classes.right}>
        <div
          className={
            toggle
              ? `${classes.itemContainer} ${classes.active}`
              : `${classes.itemContainer}`
          }
        >
          <ul className={classes.items}>
            <li className={classes.cart} onClick={() => setToggle(false)}>
              <NavLink to="/cart" activeClassName="active">
                {" "}
                <i class="fas fa-shopping-cart"></i> Cart
              </NavLink>
            </li>

            {userInfo && userInfo.isAdmin && (
              <li>
                <NavDropdown title="Admin" id="admin">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item onClick={() => setToggle(false)}>
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item onClick={() => setToggle(false)}>
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item onClick={() => setToggle(false)}>
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </li>
            )}

            {userInfo ? (
              <li>
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item onClick={() => setToggle(false)}>
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
