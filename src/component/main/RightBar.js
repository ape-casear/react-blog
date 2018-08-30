import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col, Nav, NavItem, NavLink, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,UncontrolledDropdown
} from 'reactstrap';

 class RightBar extends Component{
    constructor() {
        super();
        this.state = {
            height: 0,
        }
    }
    render(){
        
        return (
            <div className="right-bar" >
                
            </div>
        )
    }
 }
 function mapStateToProps(state){
    
    
    return {
        
        
    }
}   
 export default connect(mapStateToProps)(RightBar)