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
            size: '',
            productPic: '',
            noSize: false,
            gender: 'mens'
        }

        this.handleProductChange = this.handleProductChange.bind(this);
        this.updateSize = this.updateSize.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.changeGender.bind(this);
        this.changeColor.bind(this);
    }

    componentDidMount(){
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
            if(product.productLines[product.productLines.length - 1]['coaster']) line = 'coaster';
            if(product.productLines[product.productLines.length - 1]['tee']) line = 'tee';
            if(product.productLines[product.productLines.length - 1]['hoodie']) line = 'hoodie';
        }
        let color, productPic;
        if(product.featured_color){
            productPic = product.featured_pic;
            color = product.featured_color;
        } else {
            color = 'grey'
            productPic = this.getNewPic(product, line);
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
                size: '',
                price: newPrice,
                productPic,
                color
            })
        if(document.querySelector('.size-box-container')){
            let sizes = document.querySelector('.size-box-container').childNodes;
            sizes.forEach(cur => {
                cur.classList.remove('selected-size');
            })    
        }

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
        } else if (event === 'womenshoodie') {
            event = 'hoodie';
            newPrice = 45
            productPic = this.getNewPic(product, 'womenshoodie')
        }
        this.setState({
            line: event,
            price: newPrice,
            productPic,
            color: 'grey'
        })
        let domTextNodes = document.querySelector('.product-page-grid').childNodes[1].childNodes;
        setTimeout(() => {
            domTextNodes.forEach(node => {
                node.classList.remove('before-anim');
            })
        }, 10);
    }

    updateSize(event){
        this.setState({
            size: event.target.id,
            noSize: false
        })
        let sizes = document.querySelector('.size-box-container').childNodes;
        sizes.forEach(cur => {
            cur.classList.remove('selected-size');
        })
        document.getElementById(event.target.id).classList.add('selected-size');
    }

    updateQuantity(event){
        this.setState({
            quantity: event.target.value
        })
    }

    addToCart(state){
        if(!state.size && state.line !== 'coaster'){ 
            return this.setState({ noSize: true });
        }
        let pic;
        state.product.productLines.map(cur => {
            if(cur[state.line]){
                pic = cur[state.line];
            }
        })
        let newCart
        if (JSON.parse(localStorage.getItem("cart"))){
            newCart = JSON.parse(localStorage.getItem("cart"));
        } else {
            newCart = []
        }
        let id = JSON.parse(localStorage.getItem("cart_id"));
        const newProduct = {
            product: state.product,
            pic,
            line: state.line,
            price: state.price,
            size: state.size,
            color: state.color,
            cart_id: id
        }
        newCart.push(newProduct);
        id++;
        localStorage.setItem("cart_id", JSON.stringify(id));
        localStorage.setItem("cart", JSON.stringify(newCart));
        this.props.addToCart(newProduct);
    }

    editCartItem(item){

    }

    changeGender(gender){
        this.setState({ gender })
    }

    changeColor(color){
        let newPic = color + this.state.line;
        this.setState({
            color,
            productPic: this.state.product.colorPics[newPic]
        })
    }

    render(){
        const product = this.state.product;
        let productPic;

        const similarProductsHtml = data.map(product => {
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
        let colors;
        if(this.state.line && this.state.line !== 'coaster' && this.state.product.colors){
            colors = this.state.product.colors[this.state.line].map(color => {
                return (
                    <div className="color" style={{ background: color }} onClick={ ()=> this.changeColor(color) }></div>
            )
            });
        }
        return (
            <div className="main-container">
                <div className="product-page-grid">
                    <div className="grid-row">
                        <img className="product-page-grid-img" src={ this.state.productPic } alt={ product.product_name } />
                        <div className="product-info">
                            <div className="pp-info-title product-info-div">{ product.product_name } - { this.state.line }</div>
                            { this.state.noSize && 
                                <div className="red">*please choose a size</div>
                            }
                            { this.state.line !== 'coaster' &&
                            <div>
                                <div className="product-info-div big-text">colors</div>
                                <div className="colors-container">
                                    { colors }
                                </div>
                            </div>
                            }
                                { this.state.line !== 'coaster' &&
                                <div className="flex product-info-div align-center">
                                <div>Size</div>
                                <div className="size-box-container">
                                    <div onClick={ this.updateSize } id="small">s</div>
                                    <div onClick={ this.updateSize } id="medium">m</div>
                                    <div onClick={ this.updateSize } id="large">l</div>
                                    <div onClick={ this.updateSize } id="xl">xl</div>
                                    <div onClick={ this.updateSize } id="2xl">2xl</div>
                                </div>
                                </div>
                                }
                            <div className="pp-price product-info-div">$
                                { this.state.price }
                            </div>
                            { this.props.location.query ?
                            <div className="btn" onClick={ () => this.editCartItem(this.state) }>Update Item</div>
                            :
                            <div className="btn" onClick={ () => this.addToCart(this.state) }>Add To Cart</div>
                            }
                        </div>
                    </div>
                    <div>
                        <div className="product-info-div pp-info-title">products:</div>
                        { this.state.gender === 'mens' ?
                            <div className="gender-wrapper">
                                <div className="selected-gender" onClick={()=>this.changeGender('mens')}>mens</div>
                                <div onClick={()=>this.changeGender('womens')}>womens</div>
                            </div>
                            :
                            <div className="gender-wrapper">
                                <div onClick={()=>this.changeGender('mens')}>mens</div>
                                <div className="selected-gender" onClick={()=>this.changeGender('womens')}>womens</div>
                            </div>
                        }
                        <ProductLines lines={ product.productLines } gender={ this.state.gender } landing={true} id={ product.id } line={this.state.line} changeProd={this.handleProductChange} />
                    </div>
                </div>
                { !this.props.location.query &&
                <div>
                <div className="pp-title">products</div>
                <div className="product-grid">
                    { similarProductsHtml }
                </div>
                </div>
                }
            </div>
        )
    }
}

export default withRouter(connect(null, { addToCart })(ProductLanding));
