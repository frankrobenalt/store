import React, { Component } from 'react';
import NavCartItem from '../Nav/NavCartItem';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { setCart } from '../../ducks/reducer';
import './Cart.css';

class CartLanding extends Component {
    constructor(){
        super();

        this.state = {
            total: 0
        }
    }

    componentDidMount(){
        let total = 0;
        if (this.props.cart) {
            this.props.cart.map(cur => {
                total += cur.price
            })
            this.setState({
                total
            })
        }
    }

    render(){
        console.log(this.props)
        const items = this.props.cart.map(item => {
            return (
                <div className="cart-landing-item-wrapper" key={Math.floor(Math.random() * Math.floor(100000))}>
                    <img src={ item.product.pic } alt="" />
                    <div className="cart-text-wrapper">
                        <div>
                            { item.product.product_name }
                        </div>
                        <div>
                            { item.line } ({ item.size })
                        </div>
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

export default withRouter(connect(state=>state, { setCart })(CartLanding));