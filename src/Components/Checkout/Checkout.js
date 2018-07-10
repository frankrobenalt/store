import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';
import './Checkout.css';
import CheckoutForm from './CheckoutForm';

class Checkout extends Component {
    constructor(props){
        super(props);

        this.state = {
            checkingOut: true,
            success: false,
            failure: false
        }
        this.setStatus = this.setStatus.bind(this);
    }

    setStatus(success, failure){
        if(success){
            this.setState({
                success: true,
                checkingOut: false
            })
        } else {
            this.setState({
                failure: true
            })
        }
    }

    render(){
        return (
            <div className="main-container">
                <div className="section-header">Checkout</div>
                { this.state.checkingOut &&
                <StripeProvider apiKey="pk_test_nsPpZ7uzc2I7VUKB8NuHrcmv">
                    <CheckoutForm setLoading={ this.setLoading } setStatus={ this.setStatus } />
                </StripeProvider>
                }
                { this.state.success &&
                <div>
                    Success!
                </div>
                }
                { this.state.failure &&
                <div>
                    Something went wrong..
                </div>
                }
            </div>
        )
    }
}

export default withRouter(connect(state=>state, null)(Checkout));