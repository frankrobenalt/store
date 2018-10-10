import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { removeFromCart } from '../../ducks/reducer';

class NavCartItem extends Component {
    constructor(){
        super();
        this.state = {
            editMode: false
        }
    }

    removeItem(idx){
        document.getElementById(idx).classList.add('before-anim');
        let newCart = this.props.cart;
        newCart = newCart.filter(item => item.cart_id != idx);
        localStorage.setItem("cart", JSON.stringify(newCart));   
        setTimeout(() => {
            this.props.removeFromCart(idx);
        }, 301);
    }

    editItem(item){
        this.setState({ editMode: true })
    }

    render(){
    return (
        <div className="cart-item-wrapper" id={ this.props.item.cart_id }>
            {/* <Link to={{ pathname: `/editProduct/${ this.props.item.cart_id }`, query: { size: this.props.item.size } }}>
            <div className="nav-cart-edit">edit</div>
            </Link> */}
            <div className="nav-cart-remove" onClick={ ()=> this.removeItem(this.props.item.cart_id) }>x</div>
            <img src={ this.props.item.pic } alt={ this.props.item.product.product_name } />
            <div className="text-box">
            { Array.isArray(this.props.item.product) ?
                <div>
                    Coaster Set
                </div>
                :
                <div>
                { this.props.item.product.product_name } ({ this.props.item.line })
                </div>
            }
            { this.props.item.line != 'coaster' &&
            <div>{ this.props.item.size }</div>
            }
            <div>
                ${ this.props.item.price }
            </div>
            </div>
        </div>
    )
}
}

export default withRouter(connect(state => state, { removeFromCart })(NavCartItem));