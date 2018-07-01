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
                    <div className="menu-header">Home</div>
                </Link>
                <div className="menu-header">Products</div>
                    <div className="menu-header-option"><b>Coasters</b></div>
                    <div className="menu-header-option"><b>Stickers</b></div>
                    <div className="menu-header-option"><b>Tees & Hoodies</b></div>
                    <div className="menu-header-option"><b>Hats</b></div>
                <NavCart />
            </div>
        )
    }
}

