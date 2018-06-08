import React, { Component} from "react";
import "./App.css";
import axios from 'axios';
import ProductCard from './Components/ProductCard/ProductCard';
import Nav from './Components/Nav/Nav';

class App extends Component{
    constructor(){
        super();
        this.state = {
            products: []
        }
    }

    
    componentDidMount(){
        // localStorage.setItem("test", "testies");
        // sessionStorage.setItem("test", "testies");
        console.log(sessionStorage)
        axios.get('http://localhost:4040/api/getProducts').then(response => {
            this.setState({
                products: response.data
            })
        }).catch(err => console.log(err))
    }

  render(){
      const products = this.state.products.map( prod => {
          return (
              <ProductCard prod={prod} key={prod.id} />
          )
      })
    return(
      <div>
        <Nav />
        <div className="main-container">
        <div className="section-header">New Products</div>
        <div className="product-grid">
            { products }
        </div>
        <div class="section-header">Coaster Sets</div>
        <div class="product-grid">
        <div class="product-wrapper">
                <div class="image">
                    <div class="overlay">Mantis Toboggan M.D.</div>
                    <img src="https://s3.amazonaws.com/usc-cache.salvationarmy.org/73d02411-c451-4b78-af59-08beae51fdc5_frank-reynolds-coaster.png" alt="frank reynolds" />
                </div>
                <div class="info-wrapper">
                    <div>Mantis Toboggan M.D.</div>
                    <div>$25</div>
                    <div>Buy Now</div>
                </div>
            </div>
        <div class="product-wrapper">
                <div class="image">
                    <div class="overlay">Mantis Toboggan M.D.</div>
                    <img src="https://s3.amazonaws.com/usc-cache.salvationarmy.org/73d02411-c451-4b78-af59-08beae51fdc5_frank-reynolds-coaster.png" alt="frank reynolds" />
                </div>
                <div class="info-wrapper">
                    <div>Mantis Toboggan M.D.</div>
                    <div>$25</div>
                    <div>Buy Now</div>
                </div>
            </div>
        <div class="product-wrapper">
                <div class="image">
                    <div class="overlay">Mantis Toboggan M.D.</div>
                    <img src="https://s3.amazonaws.com/usc-cache.salvationarmy.org/73d02411-c451-4b78-af59-08beae51fdc5_frank-reynolds-coaster.png" alt="frank reynolds" />
                </div>
                <div class="info-wrapper">
                    <div>Mantis Toboggan M.D.</div>
                    <div>$25</div>
                    <div>Buy Now</div>
                </div>
            </div>
        <div class="product-wrapper">
                <div class="image">
                    <div class="overlay">Mantis Toboggan M.D.</div>
                    <img src="https://s3.amazonaws.com/usc-cache.salvationarmy.org/73d02411-c451-4b78-af59-08beae51fdc5_frank-reynolds-coaster.png" alt="frank reynolds" />
                </div>
                <div class="info-wrapper">
                    <div>Mantis Toboggan M.D.</div>
                    <div>$25</div>
                    <div>Buy Now</div>
                </div>
            </div>
        </div>
        <div class="section-header">Tees &amp; Hoodies</div>
        <div class="product-grid">
     
        </div>
        </div>
      </div>
    );
  }
}

export default App;