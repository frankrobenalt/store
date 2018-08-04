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
                    { this.props.featured ?
                        <div className="image">
                            <Link to={`/product/${prod.id}/${prod.featured_key}`}>
                            <div className="overlay">
                                <div>{ prod.product_name }</div>
                                <div>see more</div>
                            </div>
                            </Link>
                            <img src={ prod.productLines[prod.featured_idx][prod.featured_key] } alt={ prod.product_name } />
                        </div>
                        :
                        <div className="image">
                            <Link to={`/product/${prod.id}`}>
                            <div className="overlay">
                                <div>{ prod.product_name }</div>
                                <div>see more</div>
                            </div>
                            </Link>
                            <img src={ prod.pic } alt={ prod.product_name } />
                        </div>
                    }
                    <div className="info-wrapper">
                        <div className="big">{ prod.product_name }</div>
                        <div>products:</div> 
                        <ProductLines lines={ prod.productLines } id={ prod.id } />
                        <Link to={`/product/${prod.id}`}>
                        <div className="link">see more</div>
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
                        <div className="link">see all</div>
                        </Link>
                    </div>
                </div>
                }
            </div>
        )
    }
}