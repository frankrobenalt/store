import React, { Component} from "react";
import ProductCard from '../ProductCard/ProductCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import data from '../../../data/product.json';
import coasterData from '../../../data/coasters.json';

export default class Home extends Component{
    constructor(){
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount(){
        this.setState({
            products: data
        })
    }

  render(){
      const products = this.state.products.map( prod => {
          return (
              <ProductCard prod={prod} full={true} key={prod.id} />
          )
      });
      const coasterSets = coasterData.map( prod => {
          return (
              <ProductCard prod={prod} theme={true} key={prod.id} />
          )
      })
    return(
        <div className="main-container">
<div className="section-header">New Products</div>
        <div className="product-grid">
            { products }
        </div>
        <div className="section-header">Coaster Sets</div>
        <div className="product-grid">
            { coasterSets }
        </div>
        <div className="section-header">Tees &amp; Hoodies</div>
        <div className="product-grid">
     
        </div>
        <div className="section-header">Coloring Book</div>
        <div className="product-grid">
     
        </div>
        </div>
    )
}
}