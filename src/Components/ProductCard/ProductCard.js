import React, { Component} from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import ProductLines from './ProductLines/ProductLines'

export default class ProductCard extends Component {
    constructor(props){
        super(props);

    }

    addToCart(prod){
        let newCart;
        if (localStorage.getItem('cart')){
            newCart = localStorage.getItem('cart');
        } else {
            localStorage.setItem('cart', JSON.stringify([]));        
        }
        newCart = JSON.parse(newCart)
        newCart.push(prod.id); 
        localStorage.setItem('cart', JSON.stringify(newCart));
    }

    render(){
        const prod = this.props.prod;
        return (
            <div className="product-wrapper">
                { this.props.full &&
                <div>
                    <div className="image">
                        <Link to={`/product/${prod.id}`}>
                        <div className="overlay">
                            <div>{ prod.product_name }</div>
                            <div>See More</div>
                        </div>
                        </Link>
                        <img src={ prod.pic } alt={ prod.product_name } />
                    </div>
                    <div className="info-wrapper">
                        <div className="big">{ prod.product_name }</div>
                        <div>Available as:</div> 
                        <ProductLines lines={ prod.productLines } id={ prod.id } />
                        <Link to={`/product/${prod.id}`}>
                        <div className="link">See More</div>
                        </Link>
                    </div>
                </div>
                }
                { this.props.theme &&
                <div>
                    <div className="image">
                        <Link to={`/products/${prod.theme}`}>
                        <div className="overlay">
                            <div>{ prod.theme }</div>
                            <div>See All</div>
                        </div>
                        </Link>
                        <img src={ prod.pic } alt={ prod.product_name } />
                    </div>
                    <div className="info-wrapper">
                        <div className="big">{ prod.theme }</div>
                        <Link to={`/products/${prod.theme}`}>
                        <div className="link">See All</div>
                        </Link>
                    </div>
                </div>
                }
            </div>
        )
    }
}