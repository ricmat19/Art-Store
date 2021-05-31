import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./routes/home";
import About from "./routes/about";
import Collection from "./routes/collection";
import ItemDetails from "./routes/itemDetails";
import Contact from "./routes/contact";
import AdminCreate from "./routes/adminCreate";
import AdminUpdate from "./routes/adminUpdate";
import { CollectionContextProvider } from './context/collectionContext';



const App = () =>{
    return (
        <CollectionContextProvider>
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/collection/:productCollection" component={Collection}/>
                        <Route exact path="/collection/:productCollection/:id" component={ItemDetails}/>
                        <Route exact path="/contact" component={Contact}/>
                        <Route exact path="/admin/create" component={AdminCreate}/>
                        <Route exact path="/admin/update/:id" component={AdminUpdate}/>
                    </Switch>
                </Router>
            </div>
        </CollectionContextProvider>
    )
}

export default App;