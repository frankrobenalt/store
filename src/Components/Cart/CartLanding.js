import React, { Component } from 'react';
import NavCartItem from '../Nav/NavCartItem';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { removeFromCart } from '../../ducks/reducer';
import './Cart.css';
import Footer from '../Footer/Footer';

class CartLanding extends Component {
    constructor(){
        super();

        this.state = {
            total: 0,
            cart: []
        }
    }

    componentDidMount(){
        window.scrollTo(0,0);
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
        console.log(items)
        const items = this.state.cart.map((item, idx) => {
            return (
                <div className="cart-landing-item-wrapper" key={Math.floor(Math.random() * Math.floor(100000))}>
                    <div className="remove" onClick={ ()=> this.removeItem(item.cart_id) }>remove</div>
                    <img src={ item.pic } alt="" />
                    <div className="cart-text-wrapper">
                    { Array.isArray(item.product) ?
                        <div>
                            Coaster Set
                        </div>
                        :
                        <div>
                            { item.product.product_name }
                        </div>
                    }
                        { item.line === 'coaster' ?
                        <div>
                            { item.line } 
                        </div>
                            :
                        <div>
                            { item.line } ({ item.gender } - { item.size })
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
                <div className="section-header">cart</div>
                <div className="cart-container">
                    <div className="cart">
                        { items }
                    </div>
                    <div className="checkout">
                        <div>
                            checkout
                        </div>
                        <div>
                            subtotal: <span>${ this.state.total }</span>
                        </div>
                        <div>
                            *excluding tax & shipping
                        </div>
                        <Link to={'/checkout'}>
                            <div className="btn">
                                checkout
                            </div>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(state=>state, { removeFromCart })(CartLanding));