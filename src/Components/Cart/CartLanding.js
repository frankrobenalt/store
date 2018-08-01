import React, { Component } from 'react';
import NavCartItem from '../Nav/NavCartItem';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { removeFromCart } from '../../ducks/reducer';
import './Cart.css';

class CartLanding extends Component {
    constructor(){
        super();

        this.state = {
            total: 0,
            cart: []
        }
    }

    componentDidMount(){
        let total = 0;
        if (this.props.cart) {
            this.props.cart.map(cur => {
                total += cur.price
            })
            this.setState({
                total,
                cart: this.props.cart
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props != nextProps){
            let total = 0;
            nextProps.cart.map(cur => {
                total += cur.price
            })
            this.setState({
                total,
                cart: nextProps.cart
            })
        }
    }
    
    removeItem(idx){
        let newCart = this.props.cart;
        newCart = newCart.filter(item => item.cart_id != idx);        
        localStorage.setItem("cart", JSON.stringify(newCart));   
        this.props.removeFromCart(idx);
    }

    render(){
        const items = this.state.cart.map((item, idx) => {
            return (
                <div className="cart-landing-item-wrapper" key={Math.floor(Math.random() * Math.floor(100000))}>
                    <div className="remove" onClick={ ()=> this.removeItem(item.cart_id) }>Remove</div>
                    <img src={ item.product.pic } alt="" />
                    <div className="cart-text-wrapper">
                        <div>
                            { item.product.product_name }
                        </div>
                        { item.line === 'coaster' ?
                        <div>
                            { item.line } 
                        </div>
                            :
                        <div>
                            { item.line } ({ item.size })
                        </div>
                        }
                        <div>
                            ${ item.price }
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div className="main-container">
                <div className="section-header">Cart</div>
                <div className="cart-container">
                    <div className="cart">
                        { items }
                    </div>
                    <div className="checkout">
                        <div>
                            Checkout
                        </div>
                        <div>
                            Subtotal: <span>${ this.state.total }</span>
                        </div>
                        <div>
                            *Excluding tax & shipping
                        </div>
                        <Link to={'/checkout'}>
                            <div className="checkout-btn">
                                Checkout
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(state=>state, { removeFromCart })(CartLanding));