import React, { Component } from 'react';
import './Nav.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import NavCart from './NavCart';

function windowClickToggleMenu(e){
    let menu = document.querySelector(".products-sub-menu");
    if(e.target.classList.contains('products-menu') || e.target.innerText === 'coasters' || e.target.innerText === 'tees' || e.target.innerText === 'hoodies'){ return }
    else { menu.style.display = 'none' } 
}

class Nav extends Component {
    constructor(){
        super();

    }

    toggleMobileNav(){
        let menu = document.querySelector(".products-sub-menu");
        if (menu.style.display === "initial"){
            menu.style.display = 'none';
            window.removeEventListener("click", windowClickToggleMenu)
            window.removeEventListener("touchend", windowClickToggleMenu)
        } else {
            menu.style.display = 'initial';
            window.addEventListener("click", windowClickToggleMenu)
            window.addEventListener("touchend", windowClickToggleMenu)
        };
    }

    render(){
        return (
            <div className="nav-container">
            <div className="nav">
                <div className="flex-column align-center">
                <img  className="logo-img" src="https://s3.amazonaws.com/usc-cache.salvationarmy.org/7507ac77-9e7d-4b62-8bb4-e51a535dcf0e_crane.png" alt="logo" />
                <div className="logo-title">yawa</div>
                </div>
                <Link to={'/'}>
                    <div className="menu-header">home</div>
                </Link>
                <Link to={'/products'}>
                <div className="menu-header">products</div>
                </Link>
                    <Link to={'/products/coaster'}>
                    <div className="menu-header-option"><b>coasters</b></div>
                    </Link>
                    <Link to={'/products/tee'}>
                    <div className="menu-header-option"><b>tees</b></div>
                    </Link>
                    <Link to={'/products/hoodie'}>
                    <div className="menu-header-option"><b>Hoodies</b></div>
                    </Link>
                    {/* <Link to={'/products/hat'}>
                    <div className="menu-header-option"><b>hats</b></div>
                    </Link> */}
                <NavCart />
                <Link to={'/checkout'}>
                    <div className="menu-header">checkout</div>
                </Link>
            </div>

            <div className="mobile-nav">
                <div className="flex-column align-center">
                    <img  className="logo-img" src="https://s3.amazonaws.com/usc-cache.salvationarmy.org/7507ac77-9e7d-4b62-8bb4-e51a535dcf0e_crane.png" alt="logo" />
                    <div className="logo-title">yawa</div>
                </div>  
                <Link to={'/'}>
                    <div className="mobile-nav-header">home</div>
                </Link>
                <div className="products-menu-container">
                    <div className="mobile-nav-header products-menu" onClick={()=>this.toggleMobileNav()}>products</div>
                    <div className="products-sub-menu">
                        <Link to={'/products/coaster'}>
                        <div className="mobile-nav-sub" onClick={()=>this.toggleMobileNav()}><b>coasters</b></div>
                        </Link>
                        <Link to={'/products/tee'}>
                        <div className="mobile-nav-sub" onClick={()=>this.toggleMobileNav()}><b>tees</b></div>
                        </Link>
                        <Link to={'/products/hoodie'}>
                        <div className="mobile-nav-sub" onClick={()=>this.toggleMobileNav()}><b>Hoodies</b></div>
                        </Link>
                    </div>
                </div>
                <Link to={'/cart'}>
                    <div className="mobile-nav-header">cart
                        { this.props.cart.length > 0 &&
                            <b>{ this.props.cart.length }</b>
                        }
                    </div>
                </Link>
                <Link to={'/checkout'}>
                    <div className="mobile-nav-header">checkout</div>
                </Link>
            </div>
            </div>
        )
    }
}

export default withRouter(connect(state=>state, null)(Nav));