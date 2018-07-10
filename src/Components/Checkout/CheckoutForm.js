import React from 'react';
import {Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './Form';

class CheckoutForm extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm
            setStatus={ this.props.setStatus }
            setLoading={ this.props.setLoading }
        />
      </Elements>
    );
  }
}

export default CheckoutForm;