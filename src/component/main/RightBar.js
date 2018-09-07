import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Nav, NavItem, NavLink, Media
} from 'reactstrap';
import classnames from 'classnames';
import FontAwesome from  'react-fontawesome';
import httpAction from '../../util/ajax/httpAction';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../config/base'
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
        this.props.dispatch(httpAction('/webinfo', 'get', null, (res)=>{
            this.props.dispatch({type: 'GET_SIDE_BAR_CONTENT', payload: {side_bar_content: res.data}})

            this.setState({
                activeContent : [
                    { id: 0, name: '热门', contents: res.data.data_hot.bloglist},
                    { id: 1, name: '随机', contents: res.data.data_time.bloglist},
                    { id: 2, name: '最新评论', contents: res.data.latest_comment},
                ],
                webinfo: [
                    {name:'文章篇数',icon_name:'file-text-o', count: res.data.blog_count},
                    {name:'评论数',icon_name:'comments-o', count: res.data.total_comment},
                    {name:'访问数',icon_name:'hand-pointer-o', count: res.data.visit_count},
                ]
            })
        }))
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
                        <Media left tag="div">
                            <Link to={"/bus?toUser="+item.author}>
                            <Media className="media-img" src={require('../../images/static_imgs/webPic003.jpeg')} alt="img" />
                            </Link>
                        </Media>
                        <Media body className="media-body">
                            <Media className="media-title">
                                {item.title}
                            </Media>
                            <div className="foot-box">
                                <div>
                                    <FontAwesome className="fa-fw" name="comment" />&nbsp;
                                    {item.comments||0}
                                </div>
                                <div>
                                    <FontAwesome className="fa-fw" name="eye" />&nbsp;
                                    {item.browse_count||0}
                                </div>
                            </div>
                        </Media>
                    </Media>)
                    else
                    return (
                        <Media key={index} className="media-box">
                        <Media left href="#">
                            <Link to={"/bus?toUser="+item.author}>
                            <Media className="media-img" object data-src={item.avatar} src={item.avatar||apiUrl+'/img/expressImg/0101.jpg'} alt="Generic placeholder image" />
                            </Link>
                        </Media>
                        <Media body className="media-body">
                            <Media className="media-title" >
                                {item.author}
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