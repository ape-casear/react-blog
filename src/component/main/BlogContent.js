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
import BreadcrumbCus from './comment/BreadcrumbCus';
 class BlogContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            title: `Ape-Caesar's SEXY HOUSE`
        }
       
    }
    componentDidMount(){
        window.scrollTo(0,0)
        console.log('BlogContent did mount')
        let id = this.props.match.params.blog;
        let { title } = qs.parse(this.props.location.search.replace('?',''))
        console.log(qs.parse)
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
                <BreadcrumbCus name="正文"/>
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