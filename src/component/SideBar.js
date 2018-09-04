import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col, Nav, NavItem, NavLink, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,UncontrolledDropdown, UncontrolledCollapse
} from 'reactstrap';
import FontAwesome from  'react-fontawesome';
import UpInfo from './UpInfo';
import { side_bar } from '../config/layout-config';
import { history } from '../store/configureStore';
import { Link } from 'react-router-dom';
 class SideBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            active: 0
        }
        this.toggle = this.toggle.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
        this.closeSideBarForce = this.closeSideBarForce.bind(this)
        this.onBlur = this.onBlur.bind(this)
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
        if(window.innerWidth < 768){
            this.props.dispatch({type: 'switch sideOutIn', payload: { sidebar: 'off' }})
        }
    }
    closeSideBarForce(){
        if(window.innerWidth < 768){
            this.props.dispatch({type: 'switch sideOutIn', payload: { sidebar: 'off' }})
        }
    }
    onBlur(){
        console.log('blur')
    }
    render(){
        console.log(this.props.side_toggle)

        let list = side_bar.map(item=>{
            return (
                <NavItem key={item.id}>
                    <NavLink tag="span" className={item.link.className} id={item.link.id} href='#'
                    data-route={item.href} style={{color: '#a6a8b1'}}>
                        <FontAwesome className={item.icon.className} data-route={item.href} name={item.icon.name} ></FontAwesome>&nbsp;&nbsp;
                    {
                        (()=>{
                            if(item.href){
                                return (
                                    <Link to={"/"+item.href}
                                    onClick={this.closeSideBarForce}
                                    >{item.name}</Link>
                                )
                            }else{
                                return (
                                    <span>{item.name}</span>
                                )
                            }
                            
                        })()
                    }
                    </NavLink>
                    {
                        (()=>{
                            if(item.sub_link)
                                return (<UncontrolledCollapse toggler={'#'+item.link.id}>
                                    {item.sub_link.map(sub_item=>{
                                        return (<NavLink key={sub_item.id} className={sub_item.className} data-route={sub_item.name} href="#" onClick={this.navigateTo}>
                                        <FontAwesome className={sub_item.icon.className} data-route={sub_item.name} name={sub_item.icon.name} />&nbsp;&nbsp;
                                        {sub_item.name}</NavLink>)
                                    })}
                                    </UncontrolledCollapse>)
                        })()
                    }
                </NavItem>
            )
        })
        return (
            <div className={"navi-wrap scrollable side-toggle-"+ this.props.side_toggle } onBlur={this.onBlur}>
              <UpInfo></UpInfo>
              <Nav  vertical>
                    <NavItem onClick={this.closeSideBarForce}>
                        <Link to="/"><NavLink tag="div" >
                        <FontAwesome className="fa fa-fw" name="home" />&nbsp;&nbsp;
                        HOME</NavLink></Link>
                    </NavItem>
                    <NavItem  onClick={this.closeSideBarForce}>
                        <Link to="/aboutme"><NavLink tag="div" >
                        <FontAwesome className="fa fa-fw" name="user" />&nbsp;&nbsp;
                        ABOUT ME</NavLink></Link>
                    </NavItem>
                    
                    <hr style={{filter : "alpha(opacity=100,finishopacity=0,style=3)", margin: '0.3em auto', width:"80%", borderTop:"1px solid #a6a8b1"}} />
                    
                    {list}
                    <NavItem >
                        <NavLink href="#"  onClick={this.closeSideBarForce}>Another Link</NavLink>
                    </NavItem>
                    <NavItem >
                        <NavLink  href="#"  onClick={this.closeSideBarForce}>Disabled Link</NavLink>
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