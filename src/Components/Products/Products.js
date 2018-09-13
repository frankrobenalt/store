import React, { Component} from "react";
import ProductCard from '../ProductCard/ProductCard';
import CoasterPack from './CoasterPack';
import data from '../../../data/product.json';

export default class Products extends Component{
    constructor(){
        super();
        this.state = {
        }
    }

    componentDidMount(){
        window.scrollTo(0,0);
        this.getProdInfo(this.props);
    }

    componentWillReceiveProps(nextProps){
            this.getProdInfo(nextProps)
    }

    getProdInfo(props){

    }

    render(){
        let theme = '';
        let productsFiltered = [];
        if(this.props.match.params.theme){
            theme = this.props.match.params.theme;
            productsFiltered = [];
            data.forEach(item => {
                item.productLines.map(cur => {
                    for (var key in cur){
                        if(key === theme){
                            productsFiltered.push(item);
                        }
                    }
                })
            }, this);
        } else {
            theme = 'Product';
            productsFiltered = data;
        }
        const products = productsFiltered.map(product => {
        if(this.props.match.params.theme){
                return (
                    <ProductCard prod={product} filter={theme} full={false} key={product.id} />
            )
        } else {
            return (
                    <ProductCard prod={product} full={true} key={product.id} />
            )
        }
        })
        return (
            <div className="main-container">
                { this.props.match.params.theme === 'coaster' &&
                    <CoasterPack />
                }
                <div className="section-header">{ theme }s</div>
                <div className="product-grid">
                    { products }
                </div>
            </div>
        )
    }
}