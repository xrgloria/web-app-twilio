import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import allTexts from "./components/allTexts";
import SendText from "./components/sendText";

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <header>
          <div className="container">
            <h1>Twilio App</h1>
            <nav>
              <ul className="nav">
                <li className="nav-item"><Link className="nav-link" to="/">Send Text</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/list">List Messages</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="content">
          <Route path="/" exact component={SendText} />
          <Route path="/list" component={allTexts} />
        </div>
      </Router>
    );
  }
}

export default App;
