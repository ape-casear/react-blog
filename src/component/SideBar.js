import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col, Nav, NavItem, NavLink, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,UncontrolledDropdown, UncontrolledCollapse
} from 'reactstrap';
import FontAwesome from  'react-fontawesome';
import UpInfo from './UpInfo';
 class SideBar extends Component{
    constructor() {
        super();
        this.state = {
            dropdownOpen: false,
            active: 0
        }
        this.toggle = this.toggle.bind(this);
        this.activeBar = this.activeBar.bind(this);
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    activeBar(num){
        this.setState({
            active: num
        })
    }
    render(){
        console.log(this.props.side_toggle)
        return (
            <div className={"navi-wrap side-toggle-"+ this.props.side_toggle }>
              <UpInfo></UpInfo>
              <Nav  vertical>
                    <NavItem active={true} onClick={()=>this.activeBar(1)}>
                        <NavLink href="#" >Link</NavLink>
                    </NavItem>
                    <Dropdown direction="right" nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle nav caret>
                        Dropdown
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem disabled>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <hr style={{filter : "alpha(opacity=100,finishopacity=0,style=3)", margin: '0.3em auto', width:"80%", borderTop:"1px solid #a6a8b1"}} />
                    <NavItem active={this.state.active == 2} onClick={()=>this.activeBar(2)}>
                        <NavLink caret className="afterRectangular" id="toggler1" href="">
                        <FontAwesome className="super-crazy-colors fa-fw" name="external-link-square" size="lg"/>Link</NavLink>
                        <UncontrolledCollapse toggler="#toggler1">
                            <NavLink className="subbar" href="#">sub Link</NavLink>
                            <NavLink className="subbar" href="#">sub Link</NavLink>
                            <NavLink className="subbar" href="#">sub Link</NavLink>
                        </UncontrolledCollapse>
                    </NavItem>
                    <NavItem active={this.state.active == 3} onClick={()=>this.activeBar(3)}>
                        
                        <NavLink caret className="afterRectangular" id="toggler2" href="">
                        <FontAwesome className="super-crazy-colors fa-fw" name="external-link-square" size="lg"></FontAwesome>Link
                        </NavLink>
                        <UncontrolledCollapse toggler="#toggler2">
                            <NavLink className="subbar" href="#">
                                <FontAwesome className="super-crazy-colors fa-fw" name="external-link-square" size="lg"/>
                            sub Link</NavLink>
                            <NavLink className="subbar" href="#">sub Link</NavLink>
                            <NavLink className="subbar" href="#">sub Link</NavLink>
                        </UncontrolledCollapse>
                    </NavItem>
                    <NavItem active={this.state.active == 4} onClick={()=>this.activeBar(4)}>
                        <NavLink caret className="afterRectangular" id="toggler3" href="">
                        <FontAwesome className="super-crazy-colors fa-fw" name="external-link-square" size="lg"/>Link</NavLink>
                        <UncontrolledCollapse toggler="#toggler3">
                            <NavLink className="subbar" href="#">sub Link</NavLink>
                            <NavLink className="subbar" href="#">sub Link</NavLink>
                            <NavLink className="subbar" href="#">sub Link</NavLink>
                        </UncontrolledCollapse>
                    </NavItem>
                    <NavItem active={this.state.active == 5} onClick={()=>this.activeBar(5)}>
                        <NavLink href="#">Another Link</NavLink>
                    </NavItem>
                    <NavItem active={this.state.active == 6} onClick={()=>this.activeBar(6)}>
                        <NavLink  href="#">Disabled Link</NavLink>
                    </NavItem>
                </Nav>
            </div>
        )
    }
 }
 function mapStateToProps(state){
    
    let { layout } = state;
    return {
        side_toggle: layout.sidebar
    }
}   
 export default connect(mapStateToProps)(SideBar)