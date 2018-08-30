import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { Button, Container, Row, Col, Nav, NavItem, NavLink, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,UncontrolledDropdown
} from 'reactstrap';
import Head from './Head'; 
import SideBar from './SideBar'; 
import MainBox from './MainBox';
 class BigTable extends Component{
    constructor() {
        super();
        this.state = {
            height: 0,
        }
        this.click=this.click.bind(this)
    }
    click(e){
        console.log(e.target)
    }
    render(){
        // this.props.window.innerHeight
        return (
            <div className="big-table" style={{}}
             onClick={this.click}>
                <Head></Head>
                <SideBar></SideBar>
                <div className="bg-img" style={{height: this.props.window.innerHeight, width: this.props.window.innerWidth}}></div>
                <Switch>
                    <Route path="/" component={MainBox}></Route>
                </Switch>
            </div>
        )
    }
 }
 function mapStateToProps(state){
    const { window } = state
    
    return {
        window
    }
}   
 export default connect(mapStateToProps)(BigTable)