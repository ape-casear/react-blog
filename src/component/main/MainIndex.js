import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  CardTitle, CardSubtitle, Card, Nav, CardBody, NavItem
} from 'reactstrap';
import httpAction from '../../util/ajax/httpAction';
import FontAwesome from  'react-fontawesome';
import qs from 'qs';
import { history } from '../../store/configureStore';
import PaginationCus from './comment/PaginationCus';

 class MainIndex extends Component{
    constructor(props) {
        super(props);
        this.state = {
            totalPage: 0,
            title: `Ape-Caesar's SEXY HOUSE`,
            query: []
        }
        this.toBlog = this.toBlog.bind(this);
        this.cb = this.cb.bind(this);
    }
    componentDidMount(){
        console.log(this.props)
        let query, _query = this.state.query;
        if(this.props.location.search){
            query = qs.parse(this.props.location.search.replace('?',''));
            _query = Object.entries(query)
            this.setState({query: _query})
        }
        this.props.dispatch(httpAction('/bloglist/0' + this.props.location.search,'get',null, (res)=>{
            let blogList = res.data.data.bloglist;
            let totalPage = Math.ceil(res.data.data.total_page/5);
            this.setState({totalPage})
            this.props.dispatch({type:'GET_BLOG_LIST_MAIN', payload: {
                    blogList,
                    pageNum: 1,
                    totalPages:
                    totalPage > 8? [1,2,3,4,5,6,7,8]:new Array(totalPage).fill(1).map((item,index)=>{
                        return index+item;
                    })
                } 
            })
        }))
    }
    componentWillUpdate(nextProps, nextState){

    }
    toBlog(index, title, id){
        console.log('goto blog work')
        this.props.dispatch({type: "GET_BLOG_LIST_MAIN", payload: { currentBlog: index}})
        history.push('/blog/'+ id + "?title=" + title)
    }
    cb(page){
        let query = '?'; 
        this.state.query.forEach(item=>{
            query = query + item[0] + "=" + item[1] + "&"
        })
        this.props.dispatch(httpAction('/bloglist/'+(page-1)+ query, 'get', null, res=>{
            let totalPage = this.state.totalPage;
            if(totalPage > 8){
                let totalPages = [1,2,3,4,5,6,7,8];
                if(page > 3 && page < totalPage - 3){
                    totalPages = totalPages.fill(page-3).map((item,index)=>{
                        return item+index
                    })
                }else if(page >= totalPage - 3){
                    totalPages = totalPages.fill(totalPage).map((item,index)=>{
                        return item-index
                    }).reverse()
                }
                this.props.dispatch({type:'GET_BLOG_LIST_MAIN', payload: {
                        blogList: res.data.data.bloglist,
                        pageNum: page,
                        totalPages
                    } 
                })
            }else{
                this.props.dispatch({type:'GET_BLOG_LIST_MAIN', payload: {
                        blogList: res.data.data.bloglist,
                        pageNum: page,
                    } 
                })
            }
        }))
    }
    render(){
        let blogList = this.props.blogList;
        let list = blogList.map((item, index)=>{
            return (
                <Card className="card-item" key={index}>
                    <div className="card-img" key="3" onClick={this.toBlog.bind(this, index, item.title, item.id)}  
                     style={
                    {backgroundImage: "url(" + ((item.img_url)?item.img_url: require('../../images/static_imgs/webPic.jpg')) + ")" }}/>
                    <CardBody className="card-body" onClick={this.toBlog.bind(this, index, item.title, item.id)} >
                        <CardTitle tag="h4"  onClick={this.toBlog.bind(this, index, item.title, item.id)}>{item.title}</CardTitle>
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
                <PaginationCus callback={this.cb} list={this.props.totalPages} index={this.props.pageNum} maxPage={this.state.totalPage}/>
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