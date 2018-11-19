import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';
import { setCart } from '../../ducks/reducer';
import './Checkout.css';
import CheckoutForm from './CheckoutForm';

class Checkout extends Component {
    constructor(props){
        super(props);

        this.state = {
            checkingOut: true,
            success: false,
            failure: false,
            orderSummary: {
                cart: []
            }
        }
        this.setStatus = this.setStatus.bind(this);
    }



    setStatus(success, failure, info){
        window.scrollTo(0,0);
        if(success){
            this.setState({
                success: true,
                checkingOut: false,
                orderSummary: info
            })
            this.props.setCart([]);
            localStorage.setItem("cart", "[]");
        } else {
            this.setState({
                failure: true
            })
        }
    }

    render(){
        const items = this.state.orderSummary.cart.map((item, idx) => {
            return (
                <div className="cart-landing-item-wrapper" key={Math.floor(Math.random() * Math.floor(100000))}>
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
            <div className="main-container">
                { this.state.checkingOut 
                ?
                <div className="section-header">Checkout</div>
                :
                <div className="section-header">Order Summary</div>
                }
                { this.state.failure &&
                <div>
                    Something went wrong..
                </div>
                }
                { this.state.checkingOut &&
                <StripeProvider apiKey="pk_live_FIVTqDzKLd1i50yTNzRFhR1l">
                    <CheckoutForm setLoading={ this.setLoading } setStatus={ this.setStatus } />
                </StripeProvider>
                }
                { this.state.success &&
                <div className="post-pay-wrapper">
                    <div className="sub-header">
                        Thank you, { this.state.orderSummary.firstName }! You should recieve a confirmation email shortly.
                    </div>
                    <div className="sub-header">
                        Shipping Address:
                    </div>
                    <div>
                        { this.state.orderSummary.address }
                    </div>
                    <div className="sub-header">
                        Your order:
                    </div>
                    <div className="cart">
                        { items }
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default withRouter(connect(state=>state, { setCart })(Checkout));