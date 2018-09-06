import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './component/Card';
import { history } from './store/configureStore';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
    this.gotoTest = this.gotoTest.bind(this)
  }
  gotoTest(){
   
  }
  componentDidMount(){
    console.log('app:',this.props)
    if(this.props.location.search){
      let str = this.props.location.search.replace('category','type')
      str =str.replace('未分类','unclassify')
      history.replace('/'+str)
    }else{
      history.replace('/')
    }
  }
  render() {

   

    return (
      <div className="App">

       
      </div>
    );
  }
}

export default App;
