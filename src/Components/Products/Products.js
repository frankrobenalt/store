import React, { Component} from "react";
import ProductCard from '../ProductCard/ProductCard';
// import CoasterPack from './CoasterPack';
import data from '../../../data/product.json';
import TopButtons from '../Home/TopButtons';
import Footer from '../Footer/Footer';

export default class Products extends Component{
    constructor(){
        super();
        this.state = {
        }
    }

    componentDidMount(){
        window.scrollTo(0,0);
        this.getProdInfo(this.props);
        //         let delay = 0;
        // let ducts = document.querySelectorAll('.product-grid');
        // setTimeout(() => {
        //     ducts.forEach(duct => {
        //         duct.childNodes.forEach(cur => {
        //             cur.style.transitionDelay = delay + 'ms';
        //             delay += 200;
        //         })
        //     })
        // }, 50);
        // setTimeout(() => {
        //     ducts.forEach(duct => {
        //         duct.childNodes.forEach(cur => {
        //             cur.classList.remove('b4-home-anim');
        //         })
        //     })
        // }, 100);
    }

    componentWillReceiveProps(nextProps){
            this.getProdInfo(nextProps)
    }

    getProdInfo(props){

    }

    render(){
        let theme = this.props.match.params.theme;
        const products = data.map(product => {
                return (
                    <ProductCard prod={product} filter={theme} full={false} key={product.id} />
            )
        })
        return (
            <div className="main-container">
                <TopButtons />
                {/* { this.props.match.params.theme === 'coaster' &&
                    <CoasterPack />
                } */}
                <div className="section-header">{ theme }s</div>
                <div className="product-grid">
                    { products }
                </div>
                <Footer />
            </div>
        )
    }
}