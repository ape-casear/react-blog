import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Media} from 'reactstrap';
import httpAction from '../../../util/ajax/httpAction';
import { Link } from 'react-router-dom';
import ReplyBox from './ReplyBox';
import PaginationCus from './PaginationCus';
class CommentList extends Component{
    constructor(props) {
        super(props);
        this.state = {
           comment_length: 0,       // 评论数
           replyIndex: -1           // 用于指定打开哪条评论回复框   -1 为没有
        }
        this.reply = this.reply.bind(this)
        this.cancel = this.cancel.bind(this)
        this.cb = this.cb.bind(this)
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
            if(this.props.mode){
                parents.reverse()
            }
            let onePage = parents.slice(0, 5)
            this.props.dispatch({type:'GET_COMMENT_LIST', payload:{
                commentList: onePage,
                totalComments: parents,
                comPageNum: 1,
                comTotalPages: 
                Math.ceil(parents.length/5) >8? [1,2,3,4,5,6,7,8]: new Array(Math.ceil(parents.length/5)).fill(1).map((item,index)=>{
                    return item+index
                })
            }})
        }))
    }
    componentWillReceiveProps(nextProps){
        console.log('old props',this.props.work)
        console.log('new props',nextProps.work)
    }
    reply(e){
        let id = e.target.dataset.parent;
       this.setState({
           replyIndex: id
       })
    }
    cancel(){
        let id = this.props.bloglistid;
        this.setState({
            replyIndex: -1
        })
    }
    cb(page){
        let list;
        let totalPage = Math.ceil(this.props.totalComments.length/5)
        if(page*5> this.props.totalComments.length){
            list = this.props.totalComments.slice((page-1)*5)
        }else{
            list = this.props.totalComments.slice((page-1)*5, (page)*5)
        }
        if(totalPage > 8){
            let comTotalPages = [1,2,3,4,5,6,7,8]
            if(page > 3 && page < totalPage - 3){
                comTotalPages = comTotalPages.fill(page-3).map((item,index)=>{
                    return item+index
                })
            }else if(page >= totalPage - 3){
                comTotalPages = comTotalPages.fill(totalPage).map((item,index)=>{
                    return item-index
                }).reverse()
            }
            this.props.dispatch({type:'GET_COMMENT_LIST', payload:{
                commentList: list,
                comPageNum: page,
                comTotalPages
            }})
        }else{
            this.props.dispatch({type:'GET_COMMENT_LIST', payload:{
                commentList: list,
                comPageNum: page,
            }})
        }
    }
    render(){
        return (
            <div className="comment-list">
                <p style={{fontSize:'16px'}}>{this.state.comment_length}条{this.props.mode||'评论'}
                &nbsp;&nbsp;&nbsp;
                {this.props.totalComments.length}楼</p>
                <hr style={{filter : "alpha(opacity=100,finishopacity=0,style=3)", margin: '0.3rem auto', width:"100%", borderTop:"1px solid #aaa"}} />
                {this.props.commentList.map((item,index)=>{
                    return (
                        <Media key={item.id}>
                            <Media left tag="div">
                                <Link to={"/user/"+item.author}>
                                <Media object src={item.avatar} alt="image" />
                                </Link>
                            </Media>
                            <Media body>
                                <Media heading>
                                {item.author}
                                <span className="com-floor" style={(this.props.mode)?{display:'none'}:{}}>#{(this.props.comPageNum-1)*5+index+1}楼</span>
                                </Media>
                                <div className="media-time">{item.comment_datetime}</div>
                                {item.comment}
                                <Button className="reply-btn" data-parent={item.id} 
                                    onClick={this.reply}>回复</Button>
                                {item.sub_comment.map((sub_item, index)=>{
                                    return (<Media key={index}>
                                        <Media left tag="div">
                                            <Link to={"/user/"+sub_item.author}>
                                            <Media object src={sub_item.avatar} alt="image" />
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
                                        <ReplyBox title="回复评论" callback={this.cancel} bloglistid={this.props.bloglistid} id={item.id}/>
                                        <Button color="secondary" size="sm" onClick={this.cancel}>取消</Button>
                                        </div>
                                    )
                                }
                            })()}
                        </Media>
                    )
                })}
                <PaginationCus callback={this.cb} list={this.props.comTotalPages} index={this.props.comPageNum} maxPage={Math.ceil(this.props.totalComments.length/5)}/>
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        commentList: state.mainIndex.commentList,
        totalComments: state.mainIndex.totalComments,
        comTotalPages: state.mainIndex.comTotalPages,
        comPageNum: state.mainIndex.comPageNum,
    }
}   
 export default connect(mapStateToProps)(CommentList)