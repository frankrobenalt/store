import React, { Component} from "react";
import ProductCard from '../ProductCard/ProductCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import data from '../../../data/product.json';
import TopButtons from "./TopButtons";
import Footer from '../Footer/Footer';
import AdBanner from "./AdBanner";

export default class Home extends Component{
    constructor(){
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount(){
        // localStorage.setItem("cart", "[]");
        window.scrollTo(0,0);
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
      let popularProducts = this.state.products.map( prod => {
          if(prod.popular){
              return (
                <ProductCard prod={prod} full={true} key={prod.id} />
              )
          }
      });
      let featuredProducts = this.state.products.map( prod => {
          if(prod.featured){
              return (
                <ProductCard prod={prod} full={true} key={prod.id} featured={true} />
              )
          }
      });
      
    return(
        <div className="main-container">
            <TopButtons />
            <AdBanner />
            <div className="section-header">featured products</div>
            <div className="product-grid">
                { featuredProducts }
            </div>
            <div className="section-header">popular designs</div>
            <div className="product-grid">
                { popularProducts }
            </div>
            <div className="section-header">all designs</div>
            <div className="product-grid">
                { products }
            </div>
            <Footer />
        </div>
    )
}
}