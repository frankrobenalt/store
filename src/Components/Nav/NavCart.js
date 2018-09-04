import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setCart } from '../../ducks/reducer';
import NavCartItem from './NavCartItem';

class NavCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            cart: [],
            recentItems: []
        }
    }

    componentDidMount(){
        let cart;
        if(JSON.parse(localStorage.getItem("cart"))){
            cart = JSON.parse(localStorage.getItem("cart"));
        } else {
            cart = []
        } 
        this.setState({
            cart,
            recentItems: this.getRecentItems(cart) 
        });
        this.props.setCart(cart);
    }

    componentWillReceiveProps(nextProps){
            this.setState({
                cart: nextProps.cart,
                recentItems: this.getRecentItems(nextProps.cart)
            })
    }
    
    getRecentItems(cart){
        let recentItems = cart;
        if (cart.length > 3){
            recentItems = cart.slice(0, 3);
        }
        return recentItems;
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
                <div className="menu-header">Cart ({ this.state.cart.length } items) </div>
            </Link>
            { this.state.cart.length > 0 &&
            <div className="menu-sub">recent items</div>
            }
            { items }
            </div>
        )
    }
}

export default withRouter(connect(state=>state, { setCart })(NavCart));