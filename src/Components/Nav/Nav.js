import React, { Component } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import NavCart from './NavCart';

export default class Nav extends Component {
    constructor(){
        super();

    }

    appendProds(){
        const appendable = document.getElementsByClassName('menu-header');
        console.log(appendable)
        appendable[0].classList.add('active');

    }
    render(){
        return (
            <div className="nav">
                <div className="logo-title">Crimson & Clover</div>
                <Link to={'/'}>
                    <div className="menu-header">Home</div>
                </Link>
                <div className="menu-header" onClick={()=>this.appendProds()}>Products</div>
                    <div className="menu-header-option"><b>Coasters</b></div>
                    <div className="menu-header-option"><b>Stickers</b></div>
                    <div className="menu-header-option"><b>Tees & Hoodies</b></div>
                    <div className="menu-header-option"><b>Hats</b></div>
                <NavCart />
            </div>
        )
    }
}

