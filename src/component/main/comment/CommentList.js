import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardImg, Modal, ModalHeader, ModalBody, ModalFooter, NavItem, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,Input,Label,FormGroup,Media
} from 'reactstrap';
import httpAction from '../../../util/ajax/httpAction';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import ReplyBox from './ReplyBox';
import qs from 'qs';
class CommentList extends Component{
    constructor(props) {
        super(props);
        this.state = {
           comment_length: 0,       // 评论数
           replyIndex: -1           // 用于指定打开哪条评论回复框   -1 为没有
        }
        this.reply = this.reply.bind(this)
        this.cancel = this.cancel.bind(this)
    }
    componentDidMount(){
        let id = this.props.bloglistid;
        // 评论list 由store控制
        this.props.dispatch(httpAction('/comment/'+id, 'get', null, (res)=>{
            this.setState({
                comment_length: res.data.data.length
            })
            let parents = [];
            for(let ele of res.data.data){
                if(ele.parent != 0){
                for(let parent of parents){
                    if(parent.id == ele.parent){
                    parent.sub_comment.push(ele)
                    }
                }
                }else{
                ele.sub_comment = [];
                parents.push(ele)
                }
            }
            this.props.dispatch({type:'GET_COMMENT_LIST', payload:{commentList: parents}})
        }))
    }
    reply(e){
        let id = e.target.dataset.parent;
        /*  this.$ajax.post('http://www.weidongwei.com:88/comment/addcomment', 
             { bloglistid: data.bloglistid, comment: data.comment, author: data.author, parent: 0 },
             {
                transformRequest: [function (data) {
                  data = qs.stringify(data);
                  return data;
                }],     
              } */
       this.setState({
           replyIndex: id
       })
    }
    cancel(){
        this.setState({
            replyIndex: -1
        })
    }
    render(){
        return (
            <div className="comment-list">
                <p style={{fontSize:'16px'}}>{this.state.comment_length}条{this.props.mode||'评论'}</p>
                <hr style={{filter : "alpha(opacity=100,finishopacity=0,style=3)", margin: '0.3rem auto', width:"100%", borderTop:"1px solid #aaa"}} />
                {this.props.commentList.map((item,index)=>{
                    return (
                        <Media key={item.id}>
                            <Media left tag="div">
                                <Link to={"/user/"+item.author}>
                                <Media object src="http://120.79.233.201:88/img/expressImg/0104.jpg" alt="image" />
                                </Link>
                            </Media>
                            <Media body>
                                <Media heading>
                                {item.author}
                                
                                </Media>
                                <div className="media-time">{item.comment_datetime}</div>
                                {item.comment}我是一个粉刷匠粉刷本领强我是一个粉刷匠粉刷本领强我是一个粉刷匠粉刷本领强
                                <Button className="reply-btn" data-parent={item.id} 
                                    onClick={this.reply}>回复</Button>
                                {item.sub_comment.map((sub_item, index)=>{
                                    return (<Media key={index}>
                                        <Media left tag="div">
                                            <Link to={"/user/"+sub_item.author}>
                                            <Media object src="http://120.79.233.201:88/img/expressImg/0104.jpg" alt="image" />
                                            </Link>
                                        </Media>
                                        <Media body>
                                            <Media heading>
                                            {sub_item.author}
                                            </Media>
                                            <div className="media-time">{sub_item.comment_datetime}</div>
                                            {sub_item.comment}
                                            <Button className="reply-btn" data-parent={item.id}
                                                onClick={this.reply}>回复</Button>
                                        </Media>
                                    </Media>)
                                })}
                            </Media>
                            {(()=>{
                                if(this.state.replyIndex == item.id){
                                    return (
                                        <div className="sub-reply-box">
                                        <ReplyBox title="回复评论" bloglistid={this.props.bloglistid} id={item.id}/>
                                        <Button color="secondary" size="sm" onClick={this.cancel}>取消</Button>
                                        </div>
                                    )
                                }
                            })()}
                        </Media>
                    )
                })}
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        
        commentList: state.mainIndex.commentList
    }
}   
 export default connect(mapStateToProps)(CommentList)