import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col, Nav, NavItem, NavLink, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,Media
} from 'reactstrap';
import classnames from 'classnames';
import FontAwesome from  'react-fontawesome';
import httpAction from '../../util/ajax/httpAction';

 class RightBar extends Component{
    constructor() {
        super();
        this.state = {
            height: 0,
            activeTab: 0,
            activeContent: []
        }
        this.toggle = this.toggle.bind(this);
        this.composeContent = this.composeContent.bind(this);
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }
    componentDidMount(){
        /* this.props.dispatch(httpAction('/complex/side-bar', 'get', null, (res)=>{
            this.props.dispatch({type: 'GET_SIDE_BAR_CONTENT', payload: {side_bar_content: res.data.data}})
        })) */
        this.setState({
            activeContent : [
                { id: 0, name: '热门', contents: [
                    {avatar: 'http://www.weidongwei.com:88/img/expressImg/0101.jpg', title: '搅拌摩擦焊的热熔机理探究', comments: 99, views: 999 },
                    {avatar: 'https://avatar.csdn.net/5/2/2/3_russle.jpg', title: '搅拌摩擦焊的热熔机理探究', comments: 99, views: 999 },
                    {avatar: 'https://avatar.csdn.net/5/2/2/3_russle.jpg', title: '搅拌摩擦焊的热熔机理探究', comments: 99, views: 999 },
                    {avatar: 'https://avatar.csdn.net/5/2/2/3_russle.jpg', title: '搅拌摩擦焊的热熔机理探究', comments: 99, views: 999 },
                    {avatar: 'https://avatar.csdn.net/5/2/2/3_russle.jpg', title: '搅拌摩擦焊的热熔机理探究', comments: 99, views: 999 },
                ]},
                { id: 1, name: '随机', contents: [
                    {avatar: '', title: '', comments: 0, views: 0 },
                    {avatar: '', title: '', comments: 0, views: 0 },
                    {avatar: '', title: '', comments: 0, views: 0 },
                    {avatar: '', title: '', comments: 0, views: 0 },
                    {avatar: '', title: '', comments: 0, views: 0 },
                ]},
                { id: 2, name: '最新评论', contents: [
                    {avatar: '', username: '', comment: '' },
                    {avatar: '', username: '', comment: '' },
                    {avatar: '', username: '', comment: '' },
                    {avatar: '', username: '', comment: '' },
                    {avatar: '', username: '', comment: '' },
                ]},
            ]
        })
    }
    composeContent(content){
        return (
            <div>
                <div style={{padding:"1rem 1rem 0.25rem 1rem"}}>{content.name}</div>
                {content.contents.map((item,index)=>{
                    return (<Media key={index} className="media-box">
                        <Media left href="#">
                            <Media className="media-img" object data-src={item.avatar} src={item.avatar} alt="Generic placeholder image" />
                        </Media>
                        <Media body className="media-body">
                            <Media className="media-title">
                                {item.title}
                            </Media>
                            <div className="foot-box">
                                <div>
                                    <FontAwesome className="fa-fw" name="comment" size="lg"/>&nbsp;
                                    {item.comments}
                                </div>
                                <div>
                                    <FontAwesome className="fa-fw" name="eye" size="lg"/>&nbsp;
                                    {item.views}
                                </div>
                            </div>
                        </Media>
                    </Media>)
                })}
            </div>
        )
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
        let content;
        console.log(this.state)
        if(this.state.activeTab === 0){
            content = this.state.activeContent[0]&&this.composeContent(this.state.activeContent[0]);
        }
         
        return (
            <div className="right-bar" >
                <Nav tabs style={{justifyContent: 'center'}}>
                    {tabs}
                </Nav>
                {content}
            </div>
        )
    }
 }
 function mapStateToProps(state){
    
    
    return {
        
        
    }
}   
 export default connect(mapStateToProps)(RightBar)