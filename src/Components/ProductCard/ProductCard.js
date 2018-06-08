import React, { Component} from "react";
import axios from 'axios';

export default class ProductCard extends Component {
    constructor(props){
        super(props);

    }

    addToCart(id){
        console.log(id)
    }

    render(){
        const prod = this.props.prod;
        return (
            <div className="product-wrapper">
                <div className="image">
                    <div className="overlay">
                        <div>{ prod.product_name }</div>
                        <div>See More</div>
                    </div>
                    <img src={ prod.pic } alt={ prod.product_name } />
                </div>
                <div className="info-wrapper">
                    <div>{ prod.product_name }</div>
                    <div>${ prod.price }</div>
                    <div onClick={ ()=> this.addToCart(prod.id) }>Add To Cart</div>
                </div>
            </div>
        )
    }
}