import React, { Component} from "react";
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom'
import { addToCart } from '../../ducks/reducer';
import ProductLines from './ProductLines/ProductLines'
import {connect} from 'react-redux';


class ProductCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            normal: false,
            noSize: false,
            gender: 'mens'
        }
        this.handleProductChange = this.handleProductChange.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.updateSize = this.updateSize.bind(this);
        this.addToCart.bind(this);
        this.changeGender.bind(this);
        this.changeColor.bind(this);
    }

    componentDidMount(){
        this.setState({
            product: this.props.prod
        })
        if(this.props.featured){
            this.setState({
                pic: this.props.prod.featured_pic
            })
        }
        if(!this.props.featured && !this.props.filter){
            this.setState({
                normal: true,
                pic: this.props.prod.pic
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps != this.props){
            this.setState({
                product: nextProps.prod
            })
            if(nextProps.featured){
                this.setState({
                    pic: nextProps.prod.featured_pic
                })
            }
            if(!nextProps.featured && !nextProps.filter){
                this.setState({
                    normal: true
                })
            }
        }
    }

    addToCart(state, featured_line){
        if(!state.size){ 
            return this.setState({ noSize: true });
        }
        let line, size;
        if(this.props.filter){ line = this.props.filter };
        if(featured_line){ line = featured_line }
        if(state.size){ size = state.size }
        let newCart
        if (JSON.parse(localStorage.getItem("cart"))){
            newCart = JSON.parse(localStorage.getItem("cart"));
        } else {
            newCart = []
        }
        let id = JSON.parse(localStorage.getItem("cart_id"));
        let price;
        if(line === 'coaster'){ price = 5 }
        else if(line === 'tee'){ price = 25 }
        if(line === 'hoodie'){ price = 45 }
        const newProduct = {
            product: state.product,
            pic: state.pic,
            line,
            price,
            size,
            cart_id: id,
            gender: state.gender
        }
        newCart.push(newProduct);
        id++;
        localStorage.setItem("cart_id", JSON.stringify(id));
        localStorage.setItem("cart", JSON.stringify(newCart));
        this.props.addToCart(newProduct);
        this.setState({
            size: ''
        })
         let sizes = document.querySelectorAll('.size-box-container');
         sizes.forEach(cur => {
             cur.childNodes.forEach(size => {
                 size.classList.remove('selected-size')
             })
         })
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
            size: event.target.id,
            noSize: false
        })
        let sizes = event.target.parentNode.childNodes;
        sizes.forEach(cur => {
            if(cur.id === event.target.id){ cur.classList.add('selected-size') }
            else { cur.classList.remove('selected-size') }
        })
    }

    updateQuantity(event){
        this.setState({
            quantity: event.target.value
        })
    }

    changeGender(gender){
        this.setState({ 
            gender
        })
    }

    changeColor(color){
        let newPic = color + this.props.prod.featured_key;
        this.setState({
            pic: this.props.prod.colorPics[newPic]
        })
    }

    render(){
        const prod = this.props.prod;
        let filter_pic, colors;
        if(this.props.filter){
            filter_pic = prod.productLines.filter(cur => cur[this.props.filter] != undefined)[0][this.props.filter];
        }
        if(prod.colors){
            colors = prod.colors[prod.featured_key].map(color => {
                return (
                    <div className="color" style={{ background: color }} onClick={ ()=> this.changeColor(color) }></div>
            )
            });
        }   

        return (
            <div>
                { this.props.full &&
                <div>
                    { this.props.featured &&
                    <div className="product-wrapper">
                        <div className="image">
                            <Link to={`/product/${prod.id}/${prod.featured_key}`}>
                            <div className="overlay">
                                <div>{ prod.product_name }</div>
                                <div>see more</div>
                            </div>
                            </Link>
                            <img src={ this.state.pic } alt={ prod.product_name } />
                        </div>
                        <div className="product-card-info">
                        <div className="big product-info-div">{ prod.product_name }</div>
                        <div className="product-info-div big-text">{ prod.featured_key }</div>
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
                        { prod.featured_key !== 'coaster' &&
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
                        { prod.featured_key !== 'coaster' &&
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
                        <div className="pp-price product-info-div">
                            ${ prod.featured_key === 'coaster' && <span>5</span> }
                            { prod.featured_key === 'tee' && <span>25</span> }
                            { prod.featured_key === 'hoodie' && <span>45</span> }
                        </div>
                        <div className="btn" onClick={ () => this.addToCart(this.state, prod.featured_key) }>Add To Cart</div>
                    </div>
                    </div>
                    }
                    { this.state.normal &&
                        <div className="product-wrapper">
                        <div className="image">
                            <Link to={`/product/${prod.id}`}>
                            <div className="overlay">
                                <div>{ prod.product_name }</div>
                                <div>see more</div>
                            </div>
                            </Link>
                            <img src={ prod.pic } alt={ prod.product_name } />
                        </div>
                        <div className="info-wrapper">
                            <div className="big">{ prod.product_name }</div>
                            <Link to={`/product/${prod.id}`}>
                            <div className="link">see more</div>
                            </Link>
                        </div>
                        </div>
                    }
                </div>
                }
                { this.props.filter &&
                <div className="product-wrapper">
                    <div className="image">
                        <Link to={`/product/${prod.id}/${this.props.filter}`}>
                        <div className="overlay">
                            <div>{ prod.product_name }</div>
                            <div>see more</div>
                        </div>
                        </Link>
                        <img src={ filter_pic } alt={ prod.product_name } />
                    </div>
                    <div className="product-card-info">
                        <div className="big product-info-div">{ prod.product_name }</div>
                        <div className="product-info-div big-text">{ this.props.filter }</div>
                        <div className="size-container">
                        { this.props.filter !== 'coaster' &&
                        <div className="flex align-center">
                        <div>Size</div>
                        <div className="size-box-container">
                            <div onClick={ this.updateSize } id="small">s</div>
                            <div onClick={ this.updateSize } id="medium">m</div>
                            <div onClick={ this.updateSize } id="large">l</div>
                            <div onClick={ this.updateSize } id="xl">xl</div>
                        </div>
                        </div>
                        }
                        </div>
                        <div className="pp-price product-info-div">
                            ${ this.props.filter === 'coaster' && <span>5</span> }
                            { this.props.filter === 'tee' && <span>25</span> }
                            { this.props.filter === 'hoodie' && <span>45</span> }
                        </div>
                        <div className="btn" onClick={ () => this.addToCart(this.state) }>Add To Cart</div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default withRouter(connect(state=>state, { addToCart })(ProductCard));