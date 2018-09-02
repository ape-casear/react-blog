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
            <div className="main-box">
                <CommentList bloglistid="15"/>
                <ReplyBox bloglistid="15"/>
            </div>
        )
    }
 }
 function mapStateToProps(state){
    
    
    return {
        
        
    }
}   
 export default connect(mapStateToProps)(LeaveMessage)