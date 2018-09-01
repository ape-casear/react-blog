import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardImg, CardTitle, CardSubtitle, Card, Nav, CardBody, NavItem, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,BreadcrumbItem,Breadcrumb
} from 'reactstrap';
import httpAction from '../../util/ajax/httpAction';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import MarkDown from 'react-markdown';
import { MD } from '../../config/test';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import qs from 'qs';
import Comments from './Comments';
 class BlogContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            title: `Ape-Caesar's SEXY HOUSE`
        }
       
    }
    componentDidMount(){
        let id = this.props.match.params.blog;
        let { title } = qs.parse(this.props.location.search.replace('?',''))
        this.setState({
            title
        })
        this.props.dispatch(httpAction('/blog?bloglistid='+id, 'get', null, (res)=>{
            this.setState({
                content: res.data.data.blog
            })
            setTimeout(()=>{
                let blocks = document.querySelectorAll('pre code');
                console.log(blocks.length)
                blocks.forEach((block) => {
                    hljs.highlightBlock(block)
                })
            }, 500)
        }))
    }
    render(){
        return (
            <div className="main-card blog-box">
                <h2 className="font-white font-shadow">{this.state.title}</h2>
                <h6 className="font-white font-shadow">男性の変態は何が問題なのですか？</h6>
                <h6 className="font-white font-shadow">is there has any problem with man's lechery?</h6>
                <div style={{width: "100%"}}>
                
                <Breadcrumb tag="nav">
                    <BreadcrumbItem tag="div" href=""><Link to="/">
                    <FontAwesome name="home" className="fa-fw"/>
                    Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active tag="span">正文</BreadcrumbItem>

                    <div className="share" >分享到:
                    <FontAwesome name="weibo" className="fa-fw"/>
                    </div>
                </Breadcrumb>
                </div>
                <Card className="blog">
                    <MarkDown source={this.state.content}></MarkDown>
                </Card>
                <Comments bloglistid={this.props.match.params.blog}></Comments>
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        blogList: state.mainIndex.blogList
    }
}   
 export default connect(mapStateToProps)(BlogContent)