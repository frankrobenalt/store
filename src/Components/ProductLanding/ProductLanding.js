import React, { Component} from "react";
import axios from 'axios';
import './ProductLanding.css';
import ProductCard from '../ProductCard/ProductCard';
import ProductLines from '../ProductCard/ProductLines/ProductLines'
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
            size: 'small',
            productPic: ''
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
        window.scrollTo(0,0);
        const id = Number(props.match.params.productid);
        const product = data.filter(prod => prod.id == id)[0];
        let line;
        if (props.match.params.productLine){
            line = props.match.params.productLine;
        } else {
            if(product.productLines[0]['coaster']) line = 'coaster';
            if(product.productLines[0]['tee']) line = 'tee';
            if(product.productLines[0]['hoodie']) line = 'hoodie';
        }
        let productPic = this.getNewPic(product, line);
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
                price: newPrice,
                productPic
            })
    }

    getNewPic(product, line){
        let newPic = product.productLines.filter(cur => cur[line])[0];
        return newPic[line];
    }

    handleProductChange(event){
        let newPrice;
        let productPic;
        let product = this.state.product;
        if (event === 'coaster') {
            newPrice = 5
            productPic = this.getNewPic(product, 'coaster');
        } else if (event === 'tee') {
            newPrice = 25
            productPic = this.getNewPic(product, 'tee');
        } else if (event === 'hoodie') {
            newPrice = 45
            productPic = this.getNewPic(product, 'hoodie');
        }
        this.setState({
            line: event,
            price: newPrice,
            productPic
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
        let pic;
        state.product.productLines.map(cur => {
            if(cur[state.line]){
                pic = cur[state.line];
            }
        })
        let newCart = JSON.parse(localStorage.getItem("cart"));
        let id = JSON.parse(localStorage.getItem("cart_id"));
        const newProduct = {
            product: state.product,
            pic,
            line: state.line,
            price: state.price,
            size: state.size,
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
        let productPic;

        const similarProductsHtml = this.state.similarProducts.map(product => {
            return (
                <ProductCard prod={product} full={true} key={product.id} />
            )
        })
        const optionsArray = [];
        this.state.product.productLines.map(cur => {
            for (var line in cur){
                optionsArray.push(line);
            }
        })
        const options = optionsArray.map((cur, idx) => {
            let num = idx;
            return (
                <option value={ cur } key={ num }>{ cur }</option>
            )
        })
        return (
            <div className="main-container">
                <div className="product-page-grid">
                    <img src={ this.state.productPic } alt={ product.product_name } />
                    <div className="product-info">
                        <div className="pp-title product-info-div">{ product.product_name }</div>
                        <div className="product-info-div">Products:</div>
                        <ProductLines lines={ product.productLines } landing={true} id={ product.id } line={this.state.line} changeProd={this.handleProductChange} />
                        <div className="product-info-div big-text">{ this.state.line }</div>
                        { this.state.line !== 'coaster' &&
                        <div className="flex product-info-div align-center">
                        <div>Size</div>
                        <select name="size" id="size" onChange={ this.updateSize }>
                            <option value="small">small</option>
                            <option value="medium">medium</option>
                            <option value="large">large</option>
                            <option value="XL">XL</option>
                        </select>
                        </div>
                        }
                        <div className="pp-price product-info-div">$
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
