import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//import components here
import Home from './components/Home/Home';
import ProductLanding from './components/ProductLanding/ProductLanding';
import Products from './components/Products/Products';

export default (

        <Switch>
            <Route component={ Home } exact path="/" />
            <Route component={ ProductLanding } exact path="/product/:productid/:productLine?" />
            <Route component={ Products } exact path="/products/:theme" />
            <Redirect to="/" />
        </Switch>

)
