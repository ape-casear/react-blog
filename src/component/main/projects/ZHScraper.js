import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardImg, Modal, ModalHeader, ModalBody, ModalFooter, NavItem, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,Collapse,ListGroup,ListGroupItem
} from 'reactstrap';
import httpAction from '../../../util/ajax/httpAction';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import qs from 'qs';
import BreadcrumbCus from '../comment/BreadcrumbCus';
class ZHScraper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: [],
            openArr: new Set(),
            openComArr: new Set()
        }
        this.open = this.open.bind(this)
        this.close = this.close.bind(this)
        this.toggle = this.toggle.bind(this)
    }
    componentDidMount(){
       this.props.dispatch(httpAction('/zhihu', 'get', null, (res)=>{
           this.setState({
                contents: res.data
           })
       }))
    }
    open(e){
        console.log(e.target.dataset.index)
        let index = parseInt(e.target.dataset.index);
        let openArr = this.state.openArr;
        !openArr.has(index) && openArr.add(index)
        console.log(openArr)
        this.setState({
            openArr
        })
    }
    close(e){
        let index = parseInt(e.target.dataset.index);
        let openArr = this.state.openArr;
        openArr.has(index) && openArr.delete(index);
        let openComArr = this.state.openComArr;
        if(openComArr.has(index)){
            openComArr.delete(index);
            this.setState({
                openComArr,
                openArr
            })
        }else{
            this.setState({
                openArr
            })
        }
    }
    toggle(e){
        let index = parseInt(e.target.dataset.index);
        console.log(index)
        let openComArr = this.state.openComArr;
        if(openComArr.has(index)){
            openComArr.delete(index);
        }else{
            openComArr.add(index);
        }
        console.log(openComArr)
        this.setState({
            openComArr
        })
    }
    render(){
        return (
            <div className="project-box">
                <div>
                    <BreadcrumbCus name="知乎爬虫"/>
                    <div className="readMe">通过puppeteer爬虫爬取的知乎问答，比较入门级的爬虫，其实很适合新手学习，具体教程请看
                    <Link to={'blog/15?title=puppeteer爬知乎'} style={{textDecoration: 'underline', color: '#666'}}>'知乎爬虫'</Link>
                    </div>
                    <ListGroup>
                        
                        
                        {(()=>{
                            return this.state.contents.map((item, index)=>{
                                return (
                                <ListGroupItem key={index}>
                                    <div className="ZH-title">{item.title}</div>
                                    <div className="ZH-info-box">
                                        <div className="ZH-info">
                                            <div>
                                            <FontAwesome className="fa-fw" name="user-o" />&nbsp;
                                            {item.author}</div>
                                        </div>
                                        <div className="ZH-agree">
                                        <FontAwesome name="caret-up"/>&nbsp;
                                        赞同&nbsp;{item.like}</div>
                                    </div>
                                    <div className="content-crl" style={(this.state.openArr.has(index))?{display:'none'}:{}}
                                    onClick={this.open} data-index={index}>
                                    展开 <FontAwesome className="fa-fw" name="chevron-down" data-index={index}/>&nbsp;</div>
                                    <div className={'ZH-content '+ ((this.state.openArr.has(index))?"zh-open":"zh-close")}
                                    dangerouslySetInnerHTML={{__html: item.content}}
                                    >
                                    </div>
                                    <div className="content-crl" style={(!this.state.openArr.has(index))?{display:'none'}:{}}>
                                    <span onClick={this.close} data-index={index}>收起 <FontAwesome className="fa-fw" name="chevron-up" data-index={index}/>&nbsp;</span>
                                    &nbsp;&nbsp;&nbsp;
                                    <span onClick={this.toggle} data-index={index}>{item.comments.length}条热门评论<FontAwesome className="fa-fw" 
                                    name={'chevron-'+(this.state.openComArr.has(index)?'up':'down')} data-index={index}/>&nbsp;</span>
                                    </div>
                                    <Collapse isOpen={this.state.openComArr.has(index)}>
                                        <ListGroup>
                                            {item.comments.map((item,index)=>{
                                                return (
                                                    <ListGroupItem key={index} style={{padding: '0.3rem 0.7rem'}}>
                                                        <div className="ZH-info-box">
                                                        <div>{item.name}</div>
                                                        <div style={{color:'#3b9efa'}}>{item.like}
                                                        <FontAwesome className="fa-fw" name="thumbs-up"/>&nbsp;
                                                        </div>
                                                        </div>
                                                        <div>{item.content}</div>
                                                    </ListGroupItem>
                                                )
                                            })}
                                        </ListGroup>
                                    </Collapse>
                                </ListGroupItem>
                                )
                            })
                        })()}
                    </ListGroup>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        
        commentList: state.mainIndex.commentList
    }
}   
 export default connect(mapStateToProps)(ZHScraper)