import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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

    render(){
        const subtotal = this.state.cart.reduce((acc, cur) => {
            return acc += cur.price
        }, 0);
        const taxes = Math.floor((subtotal * 0.06));
        let shipping = 6;
        if(subtotal > 100){
            shipping = 0;
        }
        return (
            <div className="order-summary-wrapper">
                <div className="order-summary-title">
                    Order Summary
                </div>
                <div className="summary-info">
                    <div>
                        Subtotal: ${ subtotal }
                    </div>
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

export default withRouter(connect(state=>state, null)(OrderSummary));