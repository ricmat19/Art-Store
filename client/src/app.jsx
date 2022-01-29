import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Home from "./routes/home";
import About from "./routes/about";
import Product from "./routes/products";
import Item from "./routes/productDetails";
import Cart from "./routes/cart";
import Checkout from "./routes/stripe";
// import Shipping from "./routes/shipping";
// import Payment from "./routes/stripe";
import Contact from "./routes/contact";
import PageNotFound from "./routes/pageNotFound";
import AdminHome from "./routes/admin/home";
import AdminProducts from "./routes/admin/products";

const App = () => {
  const [disclaimerModal, setDisclaimerModal] = useState(
    "disclaimer-bg disclaimer-active"
  );

  const closeDisclaimer = (e) => {
    e.preventDefault();
    setDisclaimerModal("disclaimer-bg");
  };

  return (
    <div>
      {/* Disclaimer Modal */}
      <div className={disclaimerModal}>
        <form>
          <div className="disclaimer-content">
            <h1 className="disclaimer-header">welcome to Art Store</h1>
            <div>
              Art Store is a full-stack E-commerce application built using
              React.js, Node/Express, PostgreSQL, an AWS S3 Bucket. This
              application is strictly for demonstrative purposes.
              <hr className="disclaimer-hr" />
              By clicking the button below, you are acceptig that no real
              purchases will be made, no payments will be processed, and no
              personal information, such as: names, addresses, and credit card
              information will be used.
            </div>
            <div>
              <button onClick={(e) => closeDisclaimer(e)}>i accept</button>
            </div>
          </div>
        </form>
      </div>
      <Router>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/" component={Product} />
          <Route exact path="/about" component={About} />
          {/* <Route exact path="/products/:product" component={Product} /> */}
          <Route exact path="/products/:product/:id" component={Item} />
          <Route export path="/cart" component={Cart} />
          <Route export path="/checkout" component={Checkout} />
          {/* <Route export path="/shipping" component={Shipping} />
          <Route export path="/payment" component={Payment} /> */}
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/admin/home" component={AdminHome} />
          <Route
            exact
            path="/admin/products/:product"
            component={AdminProducts}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
