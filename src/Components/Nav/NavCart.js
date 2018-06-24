import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCart } from '../../ducks/reducer';
import NavCartItem from './NavCartItem';

class NavCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            cartLength: this.props.cart.length,
            cart: []
        }
    }

    componentDidMount(){
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if(cart){
            this.setState({ cart });
        }
        this.props.setCart(cart)
    }

    componentWillReceiveProps(nextProps){
            this.setState({
                cartLength: nextProps.cart.length,
                cart: nextProps.cart
            })
    }
    

    render(){
        let recentItems = this.state.cart;
        if (this.state.cart.length > 3){
            recentItems = this.state.cart.slice(0, 3);
        }
        const items = recentItems.map(item => {
            return (
                <NavCartItem item={item} key={item.product.id} />
            )
        })
        return (
            <div>
            <div className="menu-header">Cart ({ this.state.cartLength }) </div>
            { items }
            </div>
        )
    }
}

export default withRouter(connect(state=>state, { setCart })(NavCart));