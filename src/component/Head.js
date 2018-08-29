import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col, Nav, NavItem, NavLink, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,UncontrolledDropdown
} from 'reactstrap';
import FontAwesome from  'react-fontawesome';

 class Head extends Component{
    constructor(){
        super();
        this.state = {
            isOpen : false,
            orientation: 'expand'
        }
        this.toggle = this.toggle.bind(this)
        this.closeSideBar = this.closeSideBar.bind(this)
    }
    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    closeSideBar(e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        let type = this.props.side_toggle == 'on'? 'off': 'on';
        this.setState({
            orientation: this.state.orientation == 'expand'? 'compress':'expand'
        })
        this.props.dispatch({type: 'switch sideOutIn', payload: { sidebar: type }})
    }
    
    render(){
        window.onresize = ()=>{
            if(window.innerWidth > 768){
                this.props.dispatch({type: 'switch sideOutIn', payload: { sidebar: 'on' }})
            }else if(window.innerWidth <= 768){
                this.props.dispatch({type: 'switch sideOutIn', payload: { sidebar: 'off' }})
            }
        };
        return (
            <Navbar color="light" light expand="md">
            <NavbarBrand href="/">
            <FontAwesome  style={{fontSize: '1em', marginLeft: '8px'}} name="home" size="lg"/>
            &nbsp;WDW-React
                <FontAwesome className="adapt-visible" style={{fontSize: '1.33rem', marginLeft: '8px'}} name={this.state.orientation} size="lg"
                    onClick={this.closeSideBar}>
                </FontAwesome>
            </NavbarBrand>
            
         
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/components/">
                    <FontAwesome className="fa-fw" name="shield" size="lg" spin>
                    </FontAwesome>
                    Components
                </NavLink>
                </NavItem>
                <NavItem>
                    
                    <NavLink href="https://github.com/reactstrap/reactstrap">
                    <FontAwesome className="fa-fw" name="github-square" size="lg">
                    </FontAwesome>
                    GitHub</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                    <FontAwesome className="fa-fw" name="cog" size="lg">
                    </FontAwesome>
                    Options
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem>
                        Option 1
                    </DropdownItem>
                    <DropdownItem>
                        Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        Reset
                    </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                </Nav>
            </Collapse>
            </Navbar>
            
        )
    }
 }

 function mapStateToProps(state){
    
    let { color, layout} = state;
    return {
        color: color.color,
        side_toggle: layout.sidebar
    }
}   

export default connect(mapStateToProps)(Head)