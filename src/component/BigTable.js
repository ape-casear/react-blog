import React, { Component } from 'react';

import { Button, Container, Row, Col, Nav, NavItem, NavLink, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,UncontrolledDropdown
} from 'reactstrap';
import Head from './Head'; 
import SideBar from './SideBar'; 

 class BigTable extends Component{
    constructor() {
        super();
        this.state = {
      
        }
       
    }
    render(){
        return (
            <div>
                <Head></Head>
                <SideBar></SideBar>
            </div>
        )
    }
 }
 export default BigTable