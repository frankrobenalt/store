import coasters from '../../../data/coasters.json';
import React, { Component} from "react";
import { Link } from 'react-router-dom';

let count = 0;
let translateAmount = 0;
let slider;
function coasterSlider (){
    let container = document.querySelector('.slider-container');
    let containerNodes = container.childNodes;
    let newImg = document.createElement('img');
    newImg.classList.add('inactive');
    newImg.src = containerNodes[count].src;
    newImg.alt = 'coaster';
    container.appendChild(newImg);
    if(window.innerWidth < 600){
        translateAmount -= 150;
    } else {
        translateAmount -= 350;
    }
    document.querySelector('.slider-container').style.transform = 'translateX(' + translateAmount + 'px)';
    containerNodes[count].classList.add('inactive');
    count++;
    containerNodes[count].classList.remove('inactive');
}
 
export default class AdBanner extends Component {

    componentDidMount(){
        slider = setInterval(coasterSlider, 3000);
    }
    componentWillUnmount(){
        count = 0;
        translateAmount = 0;
        slider = clearInterval(slider);
    }
    render(){
        return (
            <div className="ad-banner-container">
                <div className="slider-container">
                    <img src={coasters[0]} alt="coaster"/>
                    <img src={coasters[1]} className="inactive" alt="coaster"/>
                    <img src={coasters[2]} className="inactive" alt="coaster"/>
                    <img src={coasters[3]} className="inactive" alt="coaster"/>
                    <img src={coasters[4]} className="inactive" alt="coaster"/>
                    <img src={coasters[5]} className="inactive" alt="coaster"/>
                    <img src={coasters[6]} className="inactive" alt="coaster"/>
                    <img src={coasters[7]} className="inactive" alt="coaster"/>
                    <img src={coasters[8]} className="inactive" alt="coaster"/>
                </div>
                <div className="banner-text">stock<br />those<br /><span>mf</span><br />stockings</div>
                <Link to={'/products/coaster'}>
                <div className="btn-primary">shop coasters</div>
                </Link>
            </div>
        )
    }
}