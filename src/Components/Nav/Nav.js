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
            <div className="nav">
                <div className="logo-title">Crimson & Clover</div>
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
                    <Link to={'/products/hat'}>
                    <div className="menu-header-option"><b>hats</b></div>
                    </Link>
                <NavCart />
            </div>
        )
    }
}

