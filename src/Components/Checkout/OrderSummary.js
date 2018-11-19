import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { removeFromCart } from '../../ducks/reducer';

class OrderSummary extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            cart: []
        }
    }

    componentDidMount(){
        window.scrollTo(0,0);                
        this.setState({
            cart: this.props.cart
        })
    }

    componentWillReceiveProps(nextProps){
        if(this.props != nextProps){
            this.setState({
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
        const subtotal = this.state.cart.reduce((acc, cur) => {
            return acc += cur.price
        }, 0);
        const taxes = Math.floor((subtotal * 0.06));
        let shipping = 6;
        if(subtotal > 100){
            shipping = 0;
        }
        const items = this.state.cart.map((item, idx) => {
            return (
                <div className="cart-landing-item-wrapper" key={Math.floor(Math.random() * Math.floor(100000))}>
                    <div className="remove" onClick={ ()=> this.removeItem(item.cart_id) }>Remove</div>
                    <img src={ item.pic } alt="" />
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
            <div className="order-summary-wrapper">
                <div className="order-summary-title">
                    Order Summary
                </div>
                { items }
                <div className="summary-info">
                    <div>
                        Subtotal: ${ subtotal }
                    </div>
                    { subtotal <= 100 &&
                        <div className="alert-box flex-column align-center">
                            <div>*free shipping on orders over $100</div>
                            <Link to={'/'}>
                            continue shopping
                            </Link>
                        </div>
                    }
                    <div>
                        Tax: ${ taxes }
                    </div>
                    <div>
                        Shipping: ${ shipping }
                    </div>
                    <div className="line"></div>
                    <div className="order-total">
                        Total: ${ subtotal + taxes + shipping }
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(state=>state, { removeFromCart })(OrderSummary));