import React from 'react';
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './Form';

class CheckoutForm extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    );
  }
}

export default CheckoutForm;