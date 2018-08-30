import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col, Nav, NavItem, NavLink, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,UncontrolledDropdown
} from 'reactstrap';
import classnames from 'classnames';
import FontAwesome from  'react-fontawesome';
 class RightBar extends Component{
    constructor() {
        super();
        this.state = {
            height: 0,
            activeTab: 0
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }
    render(){
        let tabs = ['fire','random','comments'].map((item, index)=>{
            return (
                <NavItem key={index}>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === index })}
                    onClick={() => { this.toggle(index); }}
                    >
                    <FontAwesome className="fa-fw" name={item} size="lg"/>&nbsp;
                    </NavLink> 
                </NavItem>
            )
        })
        return (
            <div className="right-bar" >
                <Nav tabs style={{justifyContent: 'center'}}>
                    {tabs}

                </Nav>
            </div>
        )
    }
 }
 function mapStateToProps(state){
    
    
    return {
        
        
    }
}   
 export default connect(mapStateToProps)(RightBar)