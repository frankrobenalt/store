import React, { Component} from "react";
import "./App.css";
import axios from 'axios';
import Nav from './Components/Nav/Nav';
import router from './router';
import Home from './Components/Home/Home';

class App extends Component{

  render(){
    return(
      <div className="main-grid">
        <Nav />
            { router }
      </div>
    );
  }
}

export default App;