import coasters from '../../../data/coasters.json';
import React, { Component} from "react";
import { Link } from 'react-router-dom';

let count = 0;
let translateAmount = 0;
let slider;
function coasterSlider (){
    let container = document.querySelector('.slider-container');
    let containerNodes = container.childNodes;
    let newImgContainer = document.createElement('div');
    newImgContainer.classList.add('inactive');
    newImgContainer.classList.add('slider-container-img-container');
    let newImg = document.createElement('img');
    newImg.src = containerNodes[count].childNodes[0].src;
    newImg.alt = 'coaster';
    newImgContainer.appendChild(newImg)
    container.appendChild(newImgContainer);
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
                    <div className="slider-container-img-container">
                    <img src={coasters[0]} alt="coaster"/>
                    </div>
                    <div className="slider-container-img-container inactive">
                    <img src={coasters[1]} alt="coaster"/>
                    </div>
                    <div className="slider-container-img-container inactive">
                    <img src={coasters[2]} alt="coaster"/>
                    </div>
                    <div className="slider-container-img-container inactive">
                    <img src={coasters[3]} alt="coaster"/>
                    </div>
                    <div className="slider-container-img-container inactive">
                    <img src={coasters[4]} alt="coaster"/>
                    </div>
                    <div className="slider-container-img-container inactive">
                    <img src={coasters[5]} alt="coaster"/>
                    </div>
                    <div className="slider-container-img-container inactive">
                    <img src={coasters[6]} alt="coaster"/>
                    </div>
                    <div className="slider-container-img-container inactive">
                    <img src={coasters[7]} alt="coaster"/>
                    </div>
                    <div className="slider-container-img-container inactive">
                    <img src={coasters[8]} alt="coaster"/>
                    </div>
                    <div className="slider-container-img-container inactive">
                    <img src={coasters[9]} alt="coaster"/>
                    </div>
                </div>
                <div className="banner-text">stock<br />those<br /><span>mf</span><br />stockings</div>
                <Link to={'/sales'}>
                <div className="btn-primary">shop best sellers</div>
                </Link>
            </div>
        )
    }
}