import React, { Component} from "react";
import data from '../../../data/product.json';
import {connect} from 'react-redux';
import { addToCart } from '../../ducks/reducer';
import { withRouter } from 'react-router-dom';

class CoasterPack extends Component{
    constructor(){
        super()
        this.state = {
            pack: [],
            total: 0,
            atMaximum: false
        }
        this.addToPack = this.addToPack.bind(this);
    }

    componentDidMount(){
        window.scrollTo(0,0);
    }
    
    addToPack(item){
        if(this.state.total === 8) { 
            this.setState({
                atMaximum: true
            })
            return; 
        }
        let newPack = this.state.pack;
        let newItem;
        let found = false;
        newPack.map(cur => {
            if(cur.item === item){
                found = true;
                cur.quantity++;
            }
        });
        if(!found){
            newItem = {
                item,
                quantity: 1
            }
            newPack.push(newItem);
        }
        let newTotal = this.state.total += 1;
        if(newTotal === 1){
            let coasterContainer = document.querySelector(".coaster-pack-container");
            coasterContainer.style.position = 'fixed';
            coasterContainer.style.top = '80px';
        }
        this.setState({
            pack: newPack,
            total: newTotal
        })
        this.packScrollLeft();
    }

    packScrollLeft(){
        setTimeout(() => {
            document.querySelector(".coaster-pack-grid").scrollLeft += 1000;
        }, 300);
    }
    
    removeFromPack(item){
        let newPack = [];
        let oldPack = this.state.pack;
        oldPack.map(cur => {
            if(cur.item === item.item){
                if(cur.quantity > 1){ 
                    cur.quantity -= 1;
                    newPack.push(cur);
                }
            } else {
                newPack.push(cur);
            }
        });
        let newTotal = this.state.total -= 1;
        if(newTotal === 0){
            let coasterContainer = document.querySelector(".coaster-pack-container");
            coasterContainer.style.position = 'initial';
        }
        this.setState({
            pack: newPack,
            total: newTotal
        })
    }

    addToCart(pack){
        let newCart
        if (JSON.parse(localStorage.getItem("cart"))){
            newCart = JSON.parse(localStorage.getItem("cart"));
        } else {
            newCart = []
        }
        let id = JSON.parse(localStorage.getItem("cart_id"));
        const newProduct = {
            product: pack,
            cart_id: id,
            line: 'coaster',
            price: 25,
            pic: pack[0].item.productLines[0].coaster
        }
        newCart.push(newProduct);
        id++;
        localStorage.setItem("cart_id", JSON.stringify(id));
        localStorage.setItem("cart", JSON.stringify(newCart));
        this.props.addToCart(newProduct);
        this.setState({
            pack: [],
            total: 0,
            atMaximum: false
        })
    }

    render(){
        let coasters = data.filter(cur => cur.productLines[0].coaster);
        coasters = coasters.map(cur => {
            return (
                <div className="coaster-pack-wrapper" onClick={()=>this.addToPack(cur)}>
                    <div className="image">
                        <img src={cur.productLines[0].coaster} alt={cur.product_name} />
                    </div>
                    <div className="product-info">
                    <div className="big product-info-div">
                        { cur.product_name }
                    </div>
                    </div>
                </div>
            )
        })
        let tinyCoasters = this.state.pack.map(cur => {
            return (
                <div className="tiny-product-wrapper">
                    <div className="nav-cart-remove" onClick={()=>this.removeFromPack(cur)}>x</div>
                    <img src={ cur.item.productLines[0].coaster } alt={ cur.product_name } />
                    <div className="quantity">{ cur.quantity }</div>
                </div>
            )
        })
        return (
            <div className="coaster-rel-container">
                <div className="section-header">Build your own coaster pack</div>
                <div className="margin text-center">Pick 8 below for the price of 5(save $15)</div>
                <div className="margin text-center">or scroll to the bottom and add individually</div>
                <div className="coaster-pack-container">
                    <div className="pp-title">Your Pack ({ this.state.total }/8)</div>
                    <div className="coaster-pack-grid">
                        { tinyCoasters }
                    </div>
                    { this.state.atMaximum &&
                        <div className="center margin">
                            *you've reached 8 coasters. click add to cart and make another!
                        </div>
                    }
                    { this.state.total === 8 ?
                    <div className="center">
                        <div className="btn" onClick={()=>this.addToCart(this.state.pack)}>add to cart</div>
                    </div>
                    :
                    <div className="center">
                        <div className="fake-button invalid">add to cart</div>
                    </div>
                    }
                </div>
                <div className="product-grid">
                    { coasters }
                </div>
            </div>
        )
    }
}

export default withRouter(connect(null, { addToCart })(CoasterPack));