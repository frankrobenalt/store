import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {StripeProvider} from 'react-stripe-elements';
import './Checkout.css';
import CheckoutForm from './CheckoutForm';

class Checkout extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="main-container">
                <div className="section-header">Checkout</div>
                <StripeProvider apiKey="pk_test_nsPpZ7uzc2I7VUKB8NuHrcmv">
                    <CheckoutForm />
                </StripeProvider>
            </div>
        )
    }
}

export default withRouter(connect(state=>state, null)(Checkout));