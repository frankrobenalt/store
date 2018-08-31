import React, { Component } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import NavCart from './NavCart';

export default class Nav extends Component {
    constructor(){
        super();

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
                    <div className="menu-header-option"><b>hoodies</b></div>
                    </Link>
                    {/* <Link to={'/products/hat'}>
                    <div className="menu-header-option"><b>hats</b></div>
                    </Link> */}
                <NavCart />
                <Link to={'/checkout'}>
                <div className="menu-header">checkout</div>
            </Link>
            </div>
            </div>
        )
    }
}

