import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col, Nav, NavItem, NavLink, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,UncontrolledDropdown, UncontrolledCollapse
} from 'reactstrap';
import FontAwesome from  'react-fontawesome';
import UpInfo from './UpInfo';
import { side_bar } from '../config/layout-config';
import { history } from '../store/configureStore';
 class SideBar extends Component{
    constructor() {
        super();
        this.state = {
            dropdownOpen: false,
            active: 0
        }
        this.toggle = this.toggle.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    navigateTo(e){
        if(e.target.dataset.route){
            console.log('navigateTo')
            history.push('/'+ e.target.dataset.route)
        }
    }
    render(){
        console.log(this.props.side_toggle)

        let list = side_bar.map(item=>{
            return (
                <NavItem key={item.id}>
                    <NavLink className={item.link.className} id={item.link.id} href='#'
                    onClick={this.navigateTo} data-route={item.href}>
                        <FontAwesome className={item.icon.className} data-route={item.href} name={item.icon.name} size="lg"></FontAwesome>
                    {item.name}
                    </NavLink>
                    {
                        (()=>{
                            if(item.sub_link)
                                return (<UncontrolledCollapse toggler={'#'+item.link.id}>
                                    {item.sub_link.map(sub_item=>{
                                        return (<NavLink key={sub_item.id} className={sub_item.className} data-route={sub_item.name} href="#" onClick={this.navigateTo}>
                                        <FontAwesome className={sub_item.icon.className} data-route={sub_item.name} name={sub_item.icon.name} size="lg"/>
                                        {sub_item.name}</NavLink>)
                                    })}
                                    </UncontrolledCollapse>)
                        })()
                    }
                </NavItem>
            )
        })
        return (
            <div className={"navi-wrap scrollable side-toggle-"+ this.props.side_toggle }>
              <UpInfo></UpInfo>
              <Nav  vertical>
                    <NavItem active={true} onClick={()=>this.activeBar(1)}>
                        <NavLink href="#" >Link</NavLink>
                    </NavItem>
                    <Dropdown direction="up" nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
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
                    
                    {list}
                    <NavItem >
                        <NavLink href="#">Another Link</NavLink>
                    </NavItem>
                    <NavItem >
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
        side_toggle: layout.sidebar,
    }
}   
 export default connect(mapStateToProps)(SideBar)