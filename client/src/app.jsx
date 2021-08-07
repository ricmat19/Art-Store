import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./routes/home";
import About from "./routes/about";
import Product from "./routes/collection";
import Item from "./routes/itemDetails";
import Cart from "./routes/cart";
import Checkout from "./routes/checkout";
import Shipping from "./routes/shipping";
import Payment from "./routes/stripe";
import Contact from "./routes/contact";
import AdminHome from "./routes/admin/adminHome";
import AdminCollection from "./routes/admin/adminCollection";
import AdminCreate from "./routes/admin/adminCreate";
import AdminUpdate from "./routes/admin/adminUpdate";
import { CollectionContextProvider } from './context/collectionContext';



const App = () =>{
    return (
        <CollectionContextProvider>
            <div>
                <Router>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/collection/:product" component={Product}/>
                    <Route exact path="/collection/:product/:id" component={Item}/>
                    <Route export path="/cart" component={Cart}/>
                    <Route export path="/checkout" component={Checkout}/>
                    <Route export path="/shipping" component={Shipping}/>
                    <Route export path="/payment" component={Payment}/>
                    <Route exact path="/contact" component={Contact}/>
                    <Route exact path="/admin/home" component={AdminHome}/>
                    <Route exact path="/admin/collection/:product" component={AdminCollection}/>
                    <Route exact path="/admin/create" component={AdminCreate}/>
                    <Route exact path="/admin/update/:id" component={AdminUpdate}/>
                </Router>
            </div>
        </CollectionContextProvider>
    )
}

export default App;