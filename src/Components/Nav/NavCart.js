import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setCart } from '../../ducks/reducer';

class NavCart extends Component {
    constructor(props){
        super(props);
        this.state = {
            cartLength: this.props.cart.length,
            cart: []
        }
    }

    componentDidMount(){
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if(cart){
            this.setState({ cart });
        }
        this.props.setCart(cart)
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.cart)
            this.setState({
                cartLength: nextProps.cart.length
            })
    }
    

    render(){
        return (
            <div>
            <div className="menu-header">Cart ({ this.state.cartLength }) </div>
            </div>
        )
    }
}

export default withRouter(connect(state=>state, { setCart })(NavCart));