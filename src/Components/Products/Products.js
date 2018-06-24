import React, { Component} from "react";
import ProductCard from '../ProductCard/ProductCard';
import data from '../../../data/product.json';

export default class Products extends Component{
    constructor(){
        super();
        this.state = {
        }
    }

    componentDidMount(){
        this.getProdInfo(this.props);
    }

    componentWillReceiveProps(nextProps){
            this.getProdInfo(nextProps)
    }

    getProdInfo(props){

    }

    render(){
        const theme = this.props.match.params.theme;
        const productsFiltered = data.filter( prod => prod.theme == theme);
        const products = productsFiltered.map(product => {
            return (
                <ProductCard prod={product} full={true} key={product.id} />
            )
        })
        return (
            <div className="main-container">
                <div className="pp-title">{ theme }</div>
                <div className="product-grid">
                    { products }
                </div>
            </div>
        )
    }
}