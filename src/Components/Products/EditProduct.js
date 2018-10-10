import React, { Component} from "react";
import ProductLines from '../ProductCard/ProductLines/ProductLines'
import data from '../../../data/product.json';
import { connect } from 'react-redux';
import { addToCart } from '../../ducks/reducer';
import { withRouter } from 'react-router-dom';

class EditProduct extends Component{

    render(){
        return (
            <div>sup diddy</div>
        )
    }
}

export default withRouter(connect(null, { addToCart })(EditProduct));