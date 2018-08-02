import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//import components here
import Home from './components/Home/Home';
import ProductLanding from './components/ProductLanding/ProductLanding';
import Products from './components/Products/Products';
import CartLanding from './components/Cart/CartLanding';
import Checkout from './components/Checkout/Checkout';

export default (

        <Switch>
            <Route component={ Home } exact path="/" />
            <Route component={ ProductLanding } exact path="/product/:productid/:productLine?" />
            <Route component={ Products } exact path="/products/:theme?" />
            <Route component={ CartLanding } exact path="/cart" />
            <Route component={ Checkout } exact path="/checkout" />
            <Redirect to="/" />
        </Switch>

)
