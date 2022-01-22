import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Home from "./routes/home";
import About from "./routes/about";
import Product from "./routes/products";
import Item from "./routes/productDetails";
import Cart from "./routes/cart";
import Checkout from "./routes/checkout";
import Shipping from "./routes/shipping";
import Payment from "./routes/stripe";
import Contact from "./routes/contact";
import AdminHome from "./routes/admin/home";
import AdminProducts from "./routes/admin/products";

const App = () => {
  return (
      <div>
        <Router>
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/" component={Product} />
          <Route exact path="/about" component={About} />
          {/* <Route exact path="/products/:product" component={Product} /> */}
          <Route exact path="/products/:product/:id" component={Item} />
          <Route export path="/cart" component={Cart} />
          <Route export path="/checkout" component={Checkout} />
          <Route export path="/shipping" component={Shipping} />
          <Route export path="/payment" component={Payment} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/admin/home" component={AdminHome} />
          <Route
            exact
            path="/admin/products/:product"
            component={AdminProducts}
          />
        </Router>
      </div>
  );
};

export default App;
