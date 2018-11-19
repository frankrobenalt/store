import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import components here
import Home from './Components/Home/Home';
import ProductLanding from './Components/ProductLanding/ProductLanding';
import Products from './Components/Products/Products';
import EditProduct from './Components/Products/EditProduct';
import CartLanding from './Components/Cart/CartLanding';
import Checkout from './Components/Checkout/Checkout';

export default (

        <Switch>
            <Route component={ Home } exact path="/" />
            <Route component={ ProductLanding } exact path="/product/:productid/:productLine?/:gender?" />
            <Route component={ Products } exact path="/products/:theme?" />
            <Route component={ EditProduct } exact path="/editProduct/:cartid" />
            <Route component={ CartLanding } exact path="/cart" />
            <Route component={ Checkout } exact path="/checkout" />
        </Switch>

)
