import React, { Component} from "react";
import { Link } from 'react-router-dom';

export default class TopButtons extends Component{
    render(){
        return (
            <div className="filter-container">
                <Link to={'/products/coaster'}>
                    <div className="btn-primary btn-margin">
                        coasters
                    </div>
                </Link>
                <Link to={'/products/tee'}>
                    <div className="btn-primary btn-margin">
                        tees
                    </div>
                </Link>
                <Link to={'/products/hoodie'}>
                    <div className="btn-primary btn-margin">
                        hoodies
                    </div>
                </Link>
            </div>
        )
    }
}