import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, UncontrolledTooltip } from 'reactstrap';
import httpAction from '../../util/ajax/httpAction';

import MarkDown from 'react-markdown';
import { history } from '../../store/configureStore';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import qs from 'qs';
import Comments from './Comments';
import BreadcrumbCus from './comment/BreadcrumbCus';
import FontAwesome from  'react-fontawesome';
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
            /* 代码高亮 500ms 是在等待markown组件装载完毕 */
            setTimeout(()=>{
                let blocks = document.querySelectorAll('pre code');
                console.log(blocks.length)
                blocks.forEach((block) => {
                    hljs.highlightBlock(block)
                })
            }, 500)
        }))
    }
    componentWillUnmount(){
        //this.props.dispatch({type: "GET_BLOG_LIST_MAIN", payload: { currentBlog: -1}})
    }
    goNext(orientation){
        let search_str, flag = 0;
        let index = this.props.currentBlog;
        flag = orientation === 'pre'? -1: 1;
        let id = this.props.blogList[index + (flag)].id;
        let title = this.props.blogList[index + (flag)].title;
        this.props.dispatch({type: "GET_BLOG_LIST_MAIN", payload: {currentBlog: index + (flag)}})
        search_str = `${id}?title=${title}`
        history.push('/bus?toblog='+ search_str)
        /* this.props.dispatch({type: "GET_BLOG_LIST_MAIN", payload: { currentBlog: index}})
        history.push('/blog/'+ id + "?title=" + title) */
    }
    render(){
        let blogList = this.props.blogList
        let currentBlog = this.props.currentBlog
        return (
            <div className="main-card blog-box">
                <h2 className="font-white font-shadow">{this.state.title}</h2>
                <h6 className="font-white font-shadow">男性の変態は何が問題なのですか？</h6>
                <h6 className="font-white font-shadow">is there has any problem with man's lechery?</h6>
                <BreadcrumbCus name="正文"/>
                <Card className="blog">
                    <MarkDown source={this.state.content}></MarkDown>
                    <div style={{textAlign: 'right'}}>{currentBlog!=-1&&blogList[currentBlog].pub_datetime}</div>
                </Card>
                {(()=>{
                    if((currentBlog || currentBlog == 0) && currentBlog != -1){
                        return (
                            <div className="blog-nextBlog">
                                {currentBlog===0?'':(
                                <div id="blog-pre" className="blog-nextBlog-item" style={{float: 'left'}} onClick={this.goNext.bind(this,'pre')}>
                                <FontAwesome name="chevron-left"/>&nbsp;
                                上一篇
                                <UncontrolledTooltip placement="top" target="blog-pre">
                                    {blogList[currentBlog-1]&&blogList[currentBlog-1].title}
                                </UncontrolledTooltip>
                                </div>)}
                                {currentBlog===blogList.length-1?"":(
                                <div id="blog-next" className="blog-nextBlog-item" style={{float: 'right'}} 
                                onClick={this.goNext.bind(this, 'next')}>
                                下一篇&nbsp;<FontAwesome name="chevron-right"/>
                                <UncontrolledTooltip placement="top" target="blog-next">
                                    {blogList[currentBlog+1]&&blogList[currentBlog+1].title}
                                </UncontrolledTooltip>
                                </div>)}
                            </div>
                        )
                    }
                })()}
                <Comments bloglistid={this.props.match.params.blog}></Comments>
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        currentBlog: state.mainIndex.currentBlog,
        blogList: state.mainIndex.blogList
    }
}   
 export default connect(mapStateToProps)(BlogContent)