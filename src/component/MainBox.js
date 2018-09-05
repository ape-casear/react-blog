import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { Button, Container, Row, Col, Nav, NavItem, NavLink, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,UncontrolledDropdown
} from 'reactstrap';
import MainIndex from './main/MainIndex';
import RightBar from './main/RightBar';
import BlogContent from './main/BlogContent';
import ZHScraper from './main/projects/ZHScraper';
import httpAction from '../util/ajax/httpAction';
 class MainBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
      
        }
       
    }
    componentDidMount(){
        
    }
    render(){
        return (
            <div className="main-box" 
            style={(this.props.window.innerWidth < 768 && this.props.side_toggle == 'on')?{height:(this.props.window.innerHeight-49)+"px", overflow:'hidden'}:{}}
            >
                <Row style={{marginRight: '-14px',marginLeft: '-14px'}}>
                    <Col className="main-box-left" xs="12" >
                        <Switch>
                            <Route exact path="/" name="index" component={MainIndex}></Route>
                            <Route path="/blog/:blog" name="index" component={BlogContent}></Route>
                            <Route path="/zhihu" name="zhihu" component={ZHScraper}></Route>
                            <Route path="/bloglist/:page" name="list" component={MainIndex}></Route>
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
        window: state.window,
        side_toggle: state.layout.sidebar
    }
}   
 export default connect(mapStateToProps)(MainBox)