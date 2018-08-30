import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { Button, Container, Row, Col, Nav, NavItem, NavLink, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,UncontrolledDropdown
} from 'reactstrap';
import MainIndex from './main/MainIndex';
import RightBar from './main/RightBar';
 class MainBox extends Component{
    constructor() {
        super();
        this.state = {
      
        }
       
    }
    render(){
        return (
            <div className="main-box">
                <Row >
                    <Col className="main-box-left" xs="12" >
                        <Switch>
                            <Route path="/" name="index" component={MainIndex}></Route>
                        </Switch>
                    </Col>
                    <Col className="main-box-right" xs="12">
                        <RightBar></RightBar>
                    </Col>
                </Row>
            </div>
        )
    }
 }
 function mapStateToProps(state){
    
    
    return {
        
        
    }
}   
 export default connect(mapStateToProps)(MainBox)