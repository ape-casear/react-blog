import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { Card, Container, Row, Col, Nav, NavItem, NavLink, Dropdown,ListGroupItem, DropdownMenu,DropdownItem,
    ListGroup,Jumbotron,Button,Collapse,UncontrolledDropdown
} from 'reactstrap';
import FontAwesome from  'react-fontawesome';
import CommentList from './main/comment/CommentList';
import ReplyBox from './main/comment/ReplyBox';
import saying from '../config/saying';
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
            <div className="main-box l-message-box"
            style={(this.props.window.innerWidth < 768 && this.props.side_toggle == 'on')?{height:(this.props.window.innerHeight-49)+"px", overflow:'hidden'}:{}}
            >
                <div className="l-message-small-box" style={{}}>
                <img src={require('../images/static_imgs/pixiv004.jpg')} style={{width: '100%'}}></img>
                <Card className="l-message">
                    <p style={{fontSize:'16px'}}>想说啥就<strong color="#333">说</strong>吧!</p>
                    {saying.map((item,index)=>{
                        return (
                            <div key={index} style={{borderBottom: '1px dotted #555',paddingBottom:'0.2rem'}}>
                                <p style={{marginBottom: '0px'}}>{item.saying}</p>
                                <div style={{textAlign: 'right'}}>{item.name}</div>
                            </div>
                        )
                    })}
                    <div style={{margin: '1rem 0px'}}></div>
                    <CommentList bloglistid="15" mode="留言"/>
                    <ReplyBox bloglistid="15" mode="留言" title="留下足迹"/>
                </Card>
                </div>
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