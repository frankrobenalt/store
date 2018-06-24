import React, { Component} from "react";
import './ProductLines.css'
import { Link } from 'react-router-dom'

export default class ProductLines extends Component {
    constructor(props){
        super(props);

    }

    render(){
        const lines = this.props.lines;
        return (
            <div className="prod-line-row">
               { lines.includes('coaster') &&
                    <Link to={`/product/${this.props.id}/coaster`}>
                    <div className="prod-container">
                        <img src="http://www.hobbycraft.co.uk/supplyimages/615073_1000_1_800.jpg" alt="" />
                        <div className="prod-container-overlay"><b>Coaster</b></div>
                    </div>
                    </Link>
               }
               { lines.includes('tee') &&
                    <Link to={`/product/${this.props.id}/tee`}>
                    <div className="prod-container">
                        <img src="https://images-na.ssl-images-amazon.com/images/I/61PMeqcupSL._UX385_.jpg" alt="" />
                        <div className="prod-container-overlay"><b>Tee</b></div>
                    </div>
                    </Link>
               }
               { lines.includes('hoodie') &&
                    <Link to={`/product/${this.props.id}/hoodie`}>
                    <div className="prod-container">
                        <img src="https://i.ebayimg.com/images/i/141321059161-0-1/s-l1000.jpg" alt="" />
                        <div className="prod-container-overlay"><b>Hoodie</b></div>
                    </div>
                    </Link>
               }
            </div>
        )
    }
}