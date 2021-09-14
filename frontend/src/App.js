import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import UsersListPage from "./pages/UsersListPage";
import UserEditPage from "./pages/UserEditPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductUpdatePage";
import OrdersListPage from "./pages/OrdersListPage";

const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Router>
      <Header />
      <main className="p-3">
        <Container>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/placeorder" component={PlaceOrderPage} />
            <Route path="/payment" component={PaymentMethodPage} />
            <Route path="/shipping" component={ShippingPage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route path="/order/:id" component={OrderPage} />
            <Route path="/admin/userlist" component={UsersListPage} />
            <Route path="/admin/orderlist" component={OrdersListPage} />
            <Route path="/admin/user/:id/edit" component={UserEditPage} />
            <Route
              path="/admin/productlist"
              component={ProductListPage}
              exact
            />
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductListPage}
              exact
            />
            <Route path="/admin/product/:id/edit" component={ProductEditPage} />
            {!userInfo && <Route path="/register" component={RegisterPage} />}
            <Route path="/profile" component={ProfilePage} />
            <Route path="/search/:keyword" component={HomePage} exact />
            <Route path="/page/:pageNumber" exact component={HomePage} />

            <Route
              path="/search/:keyword/page/:pageNumber"
              exact
              component={HomePage}
            />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
