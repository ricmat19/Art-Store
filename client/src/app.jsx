import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./routes/home";
import About from "./routes/about";
import Product from "./routes/collection";
import Item from "./routes/itemDetails";
import Contact from "./routes/contact";
import AdminCollection from "./routes/adminCollection";
import AdminCreate from "./routes/adminCreate";
import AdminUpdate from "./routes/adminUpdate";
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
                    <Route exact path="/contact" component={Contact}/>
                    <Route exact path="/admin/collection" component={AdminCollection}/>
                    <Route exact path="/admin/create" component={AdminCreate}/>
                    <Route exact path="/admin/update/:id" component={AdminUpdate}/>
                </Router>
            </div>
        </CollectionContextProvider>
    )
}

export default App;