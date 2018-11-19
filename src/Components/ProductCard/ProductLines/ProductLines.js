import React, { Component} from "react";
import './ProductLines.css'
import { Link } from 'react-router-dom'

export default class ProductLines extends Component {
    constructor(props){
        super(props);
        this.changeProd = this.changeProd.bind(this);
    }

    componentDidMount(){
     
    }
    
    changeProd(line){
        this.props.changeProd(line);
        let prodLineRow = document.querySelector('.prod-line-row').childNodes;
        prodLineRow.forEach(cur => {
            cur.classList.remove('selected');
        })
        prodLineRow.forEach(cur => {
            if(cur.id === line){
                cur.classList.add('selected')
            }
        })
    }

    render(){
        const OGlines = this.props.lines;
        let lines = {};
        OGlines.map(cur => {
            for (var line in cur){
                lines[line] = cur[line]
            }
        })
        let unselected = "prod-container";
        let selected = "prod-container selected";
        return (
            <div>
                {
                    this.props.landing ?
                    <div className="prod-line-row landing-row">
                        { lines.coaster &&
                            <div className={ this.props.line === 'coaster' ? selected : unselected } id="coaster" onClick={()=>this.changeProd('coaster')}>
                                <img src={lines.coaster} alt="" />
                                <div className="prod-container-overlay"><b>Coaster</b></div>
                            </div>
                        }
                        { lines.tee &&
                            <div className={ this.props.line === 'tee' ? selected : unselected } id="tee" onClick={()=>this.changeProd('tee')}>
                                <img src={lines.tee} alt="" />
                                <div className="prod-container-overlay"><b>Tee</b></div>
                            </div>
                        }
                        { lines.hoodie &&
                            <div className={ this.props.line === 'hoodie' ? selected : unselected } id="hoodie" onClick={()=>this.changeProd('hoodie')}>
                                <img src={lines.hoodie} alt="" />
                                <div className="prod-container-overlay"><b>Hoodie</b></div>
                            </div>
                        }
                    </div>
                    :
                    <div className="prod-line-row">
                        { lines.coaster &&
                                <Link to={`/product/${this.props.id}/coaster`}>
                                <div className="prod-container">
                                    <img src={lines.coaster} alt="" />
                                    <div className="prod-container-overlay"><b>Coaster</b></div>
                                </div>
                                </Link>
                        }
                        { lines.tee &&
                                <Link to={`/product/${this.props.id}/tee`}>
                                <div className="prod-container">
                                    <img src={lines.tee} alt="" />
                                    <div className="prod-container-overlay"><b>Tee</b></div>
                                </div>
                                </Link>
                        }
                        { lines.hoodie &&
                                <Link to={`/product/${this.props.id}/hoodie`}>
                                <div className="prod-container">
                                    <img src={lines.hoodie} alt="" />
                                    <div className="prod-container-overlay"><b>Hoodie</b></div>
                                </div>
                                </Link>
                        }
                    </div>
               }
            </div>
        )
    }
}