import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { Card, Container, Row, Col, Nav, NavItem, NavLink, Dropdown,ListGroupItem, DropdownMenu,DropdownItem,
    ListGroup,Jumbotron,Button,Collapse,UncontrolledDropdown
} from 'reactstrap';
import FontAwesome from  'react-fontawesome';
import CommentList from './main/comment/CommentList';
import ReplyBox from './main/comment/ReplyBox';
 class LeaveMessage extends Component{
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
                <Card className="l-message">
                    <CommentList bloglistid="15"/>
                    <ReplyBox bloglistid="15"/>
                </Card>
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
 export default connect(mapStateToProps)(LeaveMessage)