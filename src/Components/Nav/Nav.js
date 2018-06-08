import React, { Component } from 'react';
import './Nav.css';

export default class Nav extends Component {

    appendProds(){
        const appendable = document.getElementsByClassName('menu-header');
        console.log(appendable)
        appendable[0].classList.add('active');

    }
    render(){
        return (
            <div className="nav">
                <div className="logo-title">Crimson & Clover</div>
                <div className="menu-header" onClick={()=>this.appendProds()}>Products</div>
                    <div className="menu-header-option"><b>Coasters</b></div>
                    <div className="menu-header-option"><b>Tees & Hoodies</b></div>
                    <div className="menu-header-option"><b>Hats</b></div>
                <div className="menu-header">Cart</div>
            </div>
        )
    }
}