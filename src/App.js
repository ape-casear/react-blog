import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './component/Card';

class App extends Component {
  constructor(){
    super();
    this.state = {

    }
    this.gotoTest = this.gotoTest.bind(this)
  }
  gotoTest(){
    console.log(this.props)
  }
  render() {
    let style = {
      color:'red',
      'fontSize': '30px',
    }
    let test1 = <div style={style}>test1</div>
    function JOJO(){
      return <div style={style}>JOJO</div>
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" onClick={this.gotoTest}/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {test1}
       
      </div>
    );
  }
}

export default App;
