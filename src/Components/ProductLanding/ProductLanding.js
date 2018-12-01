import React, { Component} from "react";
import axios from 'axios';
import './ProductLanding.css';
import ProductCard from '../ProductCard/ProductCard';
import ProductLines from '../ProductCard/ProductLines/ProductLines'
import data from '../../../data/product.json';
import {connect} from 'react-redux';
import { addToCart } from '../../ducks/reducer';
import { withRouter } from 'react-router-dom';
import Footer from '../Footer/Footer';

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
            productLines: [],
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
        let line, gender;
        if (props.match.params.gender === 'womens'){ gender = 'womens' } else { gender = 'mens' }
        let productLines = product[gender].productLines
        if (props.match.params.productLine){
            line = props.match.params.productLine;
        } else if (product.featured_key) {
            line = product.featured_key;
        } else {
            line = 'hoodie';
        }
        let color, productPic;
        if(product.featured_color && gender === product.featured_gender && line === product.featured_key){
            productPic = product.featured_pic;
            color = product.featured_color;
            line = product.featured_key
        } else {
            color = product[gender].colors[line][0]
            productPic = this.getNewPic(product, line, gender);
        }
        let newPrice;
        if (line === 'coaster') newPrice = 6
        else if (line === 'tee') newPrice = 30
        else if (line === 'hoodie') newPrice = 50
            this.setState({
                product,
                line,
                size: '',
                price: newPrice,
                productPic,
                productLines,
                color,
                gender
            })
        if(document.querySelector('.size-box-container')){
            let sizes = document.querySelector('.size-box-container').childNodes;
            sizes.forEach(cur => {
                cur.classList.remove('selected-size');
            })    
        }

    }

    getNewPic(product, line, gender){
        if (!gender) { gender = this.state.gender }
        let newPic = product[gender].productLines.filter(cur => cur[line])[0];
        return newPic[line];
    }

    handleProductChange(event){
        let newPrice;
        let productPic;
        let product = this.state.product;
        let color;
        if (event === 'coaster') {
            color = 'color'
        } else {
            color = this.state.product[this.state.gender].colors[event][0]
        }
        if (event === 'coaster') {
            newPrice = 6;
            productPic = this.getNewPic(product, 'coaster');
            color = 'coaster';
        } else if (event === 'tee') {
            newPrice = 30
            productPic = this.getNewPic(product, 'tee');
        } else if (event === 'hoodie') {
            newPrice = 50
            productPic = this.getNewPic(product, 'hoodie');
        } 
        this.setState({
            line: event,
            price: newPrice,
            productPic,
            color
        })
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
        let newCart;
        if (JSON.parse(localStorage.getItem("cart"))){
            newCart = JSON.parse(localStorage.getItem("cart"));
        } else {
            newCart = []
        }
        let id = JSON.parse(localStorage.getItem("cart_id"));
        const newProduct = {
            product: state.product,
            pic: state.productPic,
            line: state.line,
            price: state.price,
            size: state.size,
            color: state.color,
            cart_id: id,
            gender: state.gender
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
        this.setState({ 
            gender,
            productLines: this.state.product[gender].productLines,
            productPic: this.state.product[gender].productLines.filter(line => line[this.state.line])[0][this.state.line]
        })
    }

    changeColor(color){
        let newPic = color + this.state.line;
        this.setState({
            color,
            productPic: this.state.product[this.state.gender].colorPics[newPic]
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
        let colors;
        if(this.state.line && this.state.line !== 'coaster'){
            let border;
            colors = this.state.product[this.state.gender].colors[this.state.line].map(color => {
                color === 'white' ? border = '2px solid black' : border = 'none';
                return (
                    <div className="color" style={{ background: color, border: border }} onClick={ ()=> this.changeColor(color) }></div>
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
                            { this.state.line !== 'coaster' &&
                            <div>
                                <div className="product-info-div big-text">colors</div>
                                <div className="colors-container">
                                    { colors }
                                </div>
                            </div>
                            }
                            { this.state.noSize && 
                                <div className="red">*please choose a size</div>
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
                        <ProductLines lines={ this.state.productLines } landing={true} id={ product.id } line={this.state.line} changeProd={this.handleProductChange} />
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
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(null, { addToCart })(ProductLanding));
