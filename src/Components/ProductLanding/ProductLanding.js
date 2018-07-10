import React, { Component} from "react";
import axios from 'axios';
import './ProductLanding.css';
import ProductCard from '../ProductCard/ProductCard';
import data from '../../../data/product.json';
import {connect} from 'react-redux';
import { addToCart } from '../../ducks/reducer';
import { withRouter } from 'react-router-dom';

class ProductLanding extends Component{
    constructor(){
        super();

        this.state = {
            product: {
                product_name: '',
                pic: '',
                productLines: []
            },
            similarProducts: [],
            line: '',
            price: 0,
            size: 'small'
        }

        this.handleProductChange = this.handleProductChange.bind(this);
        this.updateSize = this.updateSize.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
    }

    componentDidMount(){
        window.scrollTo(0,0);
        this.getProdInfo(this.props);
        
    }

    componentWillReceiveProps(nextProps){
            this.getProdInfo(nextProps)
    }

    getProdInfo(props){
        const id = Number(props.match.params.productid);
        const product = data.filter(prod => prod.id == id)[0];
        let line;
        if (props.match.params.productLine){
            line = props.match.params.productLine;
        } else {
            line = product.productLines[0];
        }
        let newPrice;
        if (line === 'coaster') newPrice = 5
        else if (line === 'tee') newPrice = 25
        else if (line === 'hoodie') newPrice = 45
        const theme = product.theme;
        const similarProducts = data.filter(prod => prod.theme === theme && prod.id != id);  
            this.setState({
                product,
                similarProducts,
                line,
                price: newPrice
            })
    }

    handleProductChange(event){
        let newPrice;
        if (event.target.value === 'coaster') newPrice = 5
        else if (event.target.value === 'tee') newPrice = 25
        else if (event.target.value === 'hoodie') newPrice = 45
        this.setState({
            line: event.target.value,
            price: newPrice
        })
    }

    updateSize(event){
        this.setState({
            size: event.target.value
        })
    }

    updateQuantity(event){
        this.setState({
            quantity: event.target.value
        })
    }

    addToCart(state){
        let newCart = JSON.parse(localStorage.getItem("cart"));
        let id = JSON.parse(localStorage.getItem("cart_id"));
        const newProduct = {
            product: state.product,
            line: state.line,
            price: state.price,
            size: state.size,
            quantity: state.quantity,
            cart_id: id
        }
        newCart.push(newProduct);
        id++;
        localStorage.setItem("cart_id", JSON.stringify(id));
        localStorage.setItem("cart", JSON.stringify(newCart));
        this.props.addToCart(newProduct);
    }

    render(){
        const product = this.state.product;
        const similarProductsHtml = this.state.similarProducts.map(product => {
            return (
                <ProductCard prod={product} full={true} key={product.id} />
            )
        })
        const options = this.state.product.productLines.map((cur, idx) => {
            let num = idx;
            return (
                <option value={ cur } key={ num }>{ cur }</option>
            )
        })
        return (
            <div className="main-container">
                <div className="product-page-grid">
                    <img src={ product.pic } alt={ product.product_name } />
                    <div className="product-info">
                        <div className="pp-title">{ product.product_name }</div>
                        <div>Products:</div>
                        <select name="Product" id="prodLines" value={ this.state.line } onChange={ this.handleProductChange }>
                            { options }
                        </select>
                        { this.state.line !== 'coaster' &&
                        <div>
                        <div>Size</div>
                        <select name="size" id="size" onChange={ this.updateSize }>
                            <option value="small">small</option>
                            <option value="medium">medium</option>
                            <option value="large">large</option>
                            <option value="XL">XL</option>
                        </select>
                        </div>
                        }
                        <div className="pp-price">$
                            { this.state.price }
                        </div>
                        <div className="add-to-cart" onClick={ () => this.addToCart(this.state) }>Add To Cart</div>
                    </div>
                </div>
                <div className="pp-title">Similar Products</div>
                <div className="product-grid">
                    { similarProductsHtml }
                </div>
            </div>
        )
    }
}

export default withRouter(connect(state=>state, { addToCart })(ProductLanding));
