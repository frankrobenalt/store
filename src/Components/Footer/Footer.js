import React, { Component} from "react";
import { Link } from 'react-router-dom';
import './Footer.css';

export default class Footer extends Component{
    render(){
        return (
            <div className="footer-container">
            &copy; At Ease Apparel LLC 2018
            </div>
        )
    }
}