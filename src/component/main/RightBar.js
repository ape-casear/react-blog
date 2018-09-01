import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col, Nav, NavItem, NavLink, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,Media
} from 'reactstrap';
import classnames from 'classnames';
import FontAwesome from  'react-fontawesome';
import httpAction from '../../util/ajax/httpAction';
import qs from 'qs';
 class RightBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            activeTab: 0,
            activeContent: [],
            webinfo:[],
            show: false
        }
        this.toggle = this.toggle.bind(this);
        this.composeContent = this.composeContent.bind(this);
        this.getWebInfo = this.getWebInfo.bind(this);
    }
    getWebInfo(){
        return (
            <div className="webinfo-box">
                <p style={{padding:"1rem 0rem 0.25rem 0rem"}}>博客信息</p>
                <div className="webinfo-item-box">
                    {this.state.webinfo.map((item, index)=>{
                        return (
                            <div className="line-item" key={index}>
                                <div>
                                <FontAwesome className="fa-fw" name={item.icon_name} />&nbsp;
                                {item.name}
                                </div>
                                <div>{item.count}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
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
                    {avatar: 'http://www.weidongwei.com:88/img/expressImg/0102.jpg', title: '搅拌摩擦焊的热熔机理探究', comments: 99, views: 999 },
                    {avatar: 'http://www.weidongwei.com:88/img/expressImg/0103.jpg', title: '搅拌摩擦焊的热熔机理探究', comments: 99, views: 999 },
                    {avatar: 'http://www.weidongwei.com:88/img/expressImg/0104.jpg', title: '搅拌摩擦焊的热熔机理探究', comments: 99, views: 999 },
                    {avatar: 'http://www.weidongwei.com:88/img/expressImg/0201.jpg', title: '搅拌摩擦焊的热熔机理探究', comments: 99, views: 999 },
                ]},
                { id: 1, name: '随机', contents: [
                    {avatar: 'http://www.weidongwei.com:88/img/expressImg/0101.jpg', title: '搅拌摩擦焊的热熔机理探究', comments: 99, views: 999 },
                    {avatar: 'http://www.weidongwei.com:88/img/expressImg/0101.jpg', title: '搅拌摩擦焊的热熔机理探究', comments: 99, views: 999 },
                    {avatar: 'http://www.weidongwei.com:88/img/expressImg/0101.jpg', title: '搅拌摩擦焊的热熔机理探究', comments: 99, views: 999 },
                    {avatar: 'http://www.weidongwei.com:88/img/expressImg/0101.jpg', title: '搅拌摩擦焊的热熔机理探究', comments: 99, views: 999 },
                    {avatar: 'http://www.weidongwei.com:88/img/expressImg/0101.jpg', title: '搅拌摩擦焊的热熔机理探究', comments: 99, views: 999 },
                ]},
                { id: 2, name: '最新评论', contents: [
                    {avatar: 'http://www.weidongwei.com:88/img/expressImg/0101.jpg', username: 'KING', comment: 'up主你的博客好好看' },
                    {avatar: 'http://www.weidongwei.com:88/img/expressImg/0101.jpg', username: 'KING', comment: 'up主你的博客好好看' },
                    {avatar: 'http://www.weidongwei.com:88/img/expressImg/0101.jpg', username: 'KING', comment: 'up主你的博客好好看' },
                    {avatar: 'http://www.weidongwei.com:88/img/expressImg/0101.jpg', username: 'KING', comment: 'up主你的博客好好看' },
                    {avatar: 'http://www.weidongwei.com:88/img/expressImg/0101.jpg', username: 'KING', comment: 'up主你的博客好好看' },
                ]},
            ],
            webinfo: [
                {name:'文章篇数',icon_name:'file-text-o', count:9},
                {name:'评论数',icon_name:'comments-o', count:99},
                {name:'访问数',icon_name:'hand-pointer-o', count:999},
            ]
        })
        window.onscroll = ()=>{
            if(window.scrollY > 800){
                !this.props.goTop&&this.props.dispatch({type: 'TOGGLE_GO_TOP', payload: {goTop: true}})
            }else{
                this.props.goTop&&this.props.dispatch({type: 'TOGGLE_GO_TOP', payload: {goTop: false}})
            }
            let webinfo_box = document.querySelector('.webinfo-box')
            if(!webinfo_box)return;
            let length = webinfo_box.scrollHeight + webinfo_box.offsetTop
            if(window.scrollY > length){
                !this.state.show&&this.setState({show: true})
            }else{
                this.state.show&&this.setState({show: false})
            }
        }
    }
    composeContent(content){
        return (
            <div>
                <div style={{padding:"1rem 1rem 0.25rem 1rem"}}>{content.name}</div>
                {content.contents.map((item,index)=>{
                    if(item.title)
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
                                    <FontAwesome className="fa-fw" name="comment" />&nbsp;
                                    {item.comments}
                                </div>
                                <div>
                                    <FontAwesome className="fa-fw" name="eye" />&nbsp;
                                    {item.views}
                                </div>
                            </div>
                        </Media>
                    </Media>)
                    else
                    return (
                        <Media key={index} className="media-box">
                        <Media left href="#">
                            <Media className="media-img" object data-src={item.avatar} src={item.avatar} alt="Generic placeholder image" />
                        </Media>
                        <Media body className="media-body">
                            <Media className="media-title" >
                                {item.username}
                            </Media>
                            <div className="foot-box">
                                {item.comment}
                            </div>
                            </Media>
                        </Media>
                    )
                })}
            </div>
        )
    }
    render(){
        /* right-bar 的几个块 */
        /* 1. tabs 选项块 */
        let tabs = ['fire','random','comments'].map((item, index)=>{ 
            return (
                <NavItem key={index}>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === index })}
                    onClick={() => { this.toggle(index); }}
                    >
                    <FontAwesome className="fa-fw" name={item} />&nbsp;
                    </NavLink> 
                </NavItem>
            )
        })
        /* 2. 选项块下的内容 */
        let content;
        let index = this.state.activeTab
        content = this.state.activeContent[index]&&this.composeContent(this.state.activeContent[index]);
        /* 3. 网站信息 如访问数 博客篇数等 */
        let webinfo = this.getWebInfo()
        return (
            <div className={"right-bar  "+ (this.state.show?"tran-background-color":"")} >
                <Nav tabs style={{justifyContent: 'center'}}>
                    {tabs}
                </Nav>
                {content}
                {webinfo}
            </div>
        )
    }
 }
 function mapStateToProps(state){
    
    
    return {
        goTop:state.window.goTop
        
    }
}   
 export default connect(mapStateToProps)(RightBar)