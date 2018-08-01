import React from 'react';
import {injectStripe} from 'react-stripe-elements';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import AddressSection from './AddressSection';
import CardSection from './CardSection';
import OrderSummary from './OrderSummary';

class CheckoutForm extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            address: '',
            firstName: '',
            lastName: '',
            email: '',
            cart: [],
            total: 0,
            inValidForm: true,
            validForm: false,
            loading: false
        }
    }

    componentDidMount(){
        this.setTotal(this.props.cart);
        this.setState({
            cart: this.props.cart
        })
    }
    
    componentWillReceiveProps(nextProps){
        if(this.props != nextProps){
            this.setTotal(nextProps.cart);
            this.setState({
                cart: nextProps.cart
            })
        }
    }

    setTotal(cart){
        let subtotal = cart.reduce((acc, cur) => {
            return acc += cur.price
        }, 0);
        let taxes = Math.floor((subtotal * 0.06));
        let shipping = 6;
        if(subtotal > 100){
            shipping = 0;
        }
        this.setState({
            total: subtotal + taxes + shipping
        })
    }

    handleSubmit(ev){
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    this.setState({
        loading: true,
        validForm: false
    });
    console.log('info:', ev.target)
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: `${this.state.firstName} ${this.state.lastName}`}).then(({token}) => {
      console.log('Received Stripe token:', token);
      axios.post('http://localhost:4040/api/payment', {
          token,
          info: this.state
        }).then(response => {
            if (response.data === 'success'){
              this.props.setStatus(true, null, this.state);
            } else {
              this.props.setStatus(null, true);  
            }
      })
    });

    // However, this line of code will do the same thing:
    //
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe.createSource({type: 'card', name: 'Jenny Rosen'});
  };

  updateAddress(address){
      this.setState({ address })
  }

  handleFirstNameChange(event){
      this.setState({
          firstName: event.target.value
      })
  }
 
  handleLastNameChange(event){
      this.setState({
          lastName: event.target.value
      })
  }
 
  handleEmailChange(event){
      this.setState({
          email: event.target.value
      })
  }

  render() {
    return (
    <div className="checkout-wrapper">
        <OrderSummary />
        <div className="address-form">
            <div className="form-row">
                <div className="med-form-cell">
                    <div className="address-header">
                        First Name
                    </div>
                    <input type="text" name="firstName" id="firstName" onChange={this.handleFirstNameChange.bind(this)} />
                </div>
                <div className="med-form-cell">
                    <div className="address-header">
                        Last Name
                    </div>
                    <input type="text" name="lastName" id="lastName" onChange={this.handleLastNameChange.bind(this)} />
                </div>
            </div>
            <div className="address-header">
                Email
            </div>
            <input className="email" type="email" name="email" id="email" onChange={this.handleEmailChange.bind(this)} />
        </div>
      <form onSubmit={this.handleSubmit}>
        <AddressSection
            updateAddress={this.updateAddress.bind(this)}
        />
        <CardSection />
        { (this.state.firstName && this.state.lastName && this.state.address && this.state.email) 
        ?
            <div className="center">
            <button>Confirm order</button>
            </div>
        :
            <div className="center">
            <div className="fake-button invalid">Confirm order</div>
            </div>
        }
      </form>
    </div>
    );
  }
}

export default withRouter(connect(state=>state, null)(injectStripe(CheckoutForm)));