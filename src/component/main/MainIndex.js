import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardImg, CardTitle, CardSubtitle, Card, Nav, CardBody, NavItem, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,PaginationLink,PaginationItem,Pagination
} from 'reactstrap';
import httpAction from '../../util/ajax/httpAction';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { history } from '../../store/configureStore';
import PaginationCus from './comment/PaginationCus';
 class MainIndex extends Component{
    constructor(props) {
        super(props);
        this.state = {
      
        }
        this.toBlog = this.toBlog.bind(this);
        this.cb = this.cb.bind(this);
    }
    componentDidMount(){
        window.scrollTo(0,0)
        console.log(this.props)
        this.props.dispatch(httpAction('/bloglist/0','get',null, (res)=>{
            this.props.dispatch({type:'GET_BLOG_LIST_MAIN', payload: {
                    blogList: res.data.data.bloglist,
                    pageNum: 0,
                    totalPages: Math.ceil(res.data.data.total_page/5)
                } 
            })
        }))
    }
    toBlog(e){
        console.log(e.target.dataset)
        history.push('/blog/'+e.target.dataset.id + "?title=" + e.target.dataset.title)
    }
    cb(page){
        this.props.dispatch(httpAction('/bloglist/'+page, 'get', null, res=>{
            this.props.dispatch({type:'GET_BLOG_LIST_MAIN', payload: {
                    blogList: res.data.data.bloglist,
                    pageNum: page,
                    totalPages: Math.ceil(res.data.data.total_page/5)
                } 
            })
        }))
    }
    render(){
        let blogList = this.props.blogList;
        let list = blogList.map((item, index)=>{
            return (
                <Card className="card-item" key={index}>
                    <div className="card-img" key="3" onClick={this.toBlog} data-id={item.id} 
                    data-title={item.title} style={
                    {backgroundImage: "url(" + ((item.img_url)?item.img_url: require('../../images/static_imgs/webPic.jpg')) + ")" }}/>
                    <CardBody className="card-body">
                        <CardTitle tag="h4" data-id={item.id} onClick={this.toBlog}
                        data-title={item.title}>{item.title}</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <hr style={{filter : "alpha(opacity=100,finishopacity=0,style=3)", margin: '0.5em auto', width:"100%"}} />
                        <Nav style={{fontSize: '14px', fontWeight: '300'}}>
                            <NavItem style={{marginRight: "5px"}}>
                            <FontAwesome className="fa-fw" name="user" />&nbsp;{item.author}
                            </NavItem>
                            <NavItem style={{marginRight: "5px"}}>
                            <FontAwesome className="fa-fw" name="clock-o" />&nbsp;{item.pub_datetime}
                            </NavItem>
                            <NavItem style={{marginRight: "5px"}}>
                            <FontAwesome className="fa-fw" name="comments-o" />&nbsp;{item.comments||0}
                            </NavItem>
                        </Nav>
                    </CardBody>
                </Card>
            )
        })
        return (
            <div className="main-card">
                <h2 className="font-white font-shadow">Ape-Caesar's SEXY HOUSE</h2>
                <h6 className="font-white font-shadow">男性の変態は何が問題なのですか？</h6>
                <h6 className="font-white font-shadow">is there has any problem with man's lechery?</h6>
                {list}
                <PaginationCus callback={this.cb} list={this.props.totalPages} index={this.props.pageNum}/>
            </div>
        )
    }
 }
 function mapStateToProps(state){
    return {
        blogList: state.mainIndex.blogList,
        pageNum: state.mainIndex.pageNum,
        totalPages: state.mainIndex.totalPages
    }
}   
 export default connect(mapStateToProps)(MainIndex)