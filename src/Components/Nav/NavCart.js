import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setCart } from '../../ducks/reducer';
import NavCartItem from './NavCartItem';

class NavCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            cartLength: this.props.cart.length,
            cart: [],
            recentItems: []
        }
    }

    componentDidMount(){
        let cart = JSON.parse(localStorage.getItem("cart"));
        if(cart){
            this.setState({
                cart,
                recentItems: this.getRecentItems(cart) 
        });
        }
        this.props.setCart(cart);
    }

    componentWillReceiveProps(nextProps){
            this.setState({
                cartLength: nextProps.cart.length,
                cart: nextProps.cart,
                recentItems: this.getRecentItems(nextProps.cart)
            })
    }
    
    getRecentItems(cart){
        let recentItems = cart;
        if (cart.length > 3){
            recentItems = cart.slice(cart.length - 3, cart.length);
        }
        return recentItems.reverse();
    }

    render(){
        const items = this.state.recentItems.map(item => {
            return (
                <NavCartItem item={item} key={Math.floor(Math.random() * Math.floor(100000))} />
            )
        })
        return (
            <div className="nav-cart-wrapper">
            <Link to={'/cart'}>
                <div className="menu-header">Cart ({ this.state.cartLength } items) </div>
            </Link>
            <div className="menu-sub">Recent Items</div>
            { items }
            <Link to={'/checkout'}>
                <div className="menu-header">Checkout</div>
            </Link>
            </div>
        )
    }
}

export default withRouter(connect(state=>state, { setCart })(NavCart));