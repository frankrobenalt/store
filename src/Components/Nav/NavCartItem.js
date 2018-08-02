import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { removeFromCart } from '../../ducks/reducer';

class NavCartItem extends Component {

    removeItem(idx){
        let newCart = this.props.cart;
        newCart = newCart.filter(item => item.cart_id != idx);
        localStorage.setItem("cart", JSON.stringify(newCart));   
        this.props.removeFromCart(idx);
    }

    render(){
        console.log(this.props.item)
    return (
        <div className="cart-item-wrapper">
            <div className="nav-cart-remove" onClick={ ()=> this.removeItem(this.props.item.cart_id) }>x</div>
            <img src={ this.props.item.pic } alt={ this.props.item.product.product_name } />
            <div className="text-box">
            <div>
            { this.props.item.product.product_name } ({ this.props.item.line })
            </div>
            { this.props.item.line != 'coaster' &&
            <div>{ this.props.item.size }</div>
            }
            <div>
                ${ this.props.item.price }
            </div>
            </div>
        </div>
    )
}
}

export default withRouter(connect(state => state, { removeFromCart })(NavCartItem));