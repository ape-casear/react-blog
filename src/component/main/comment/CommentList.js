import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardImg, Modal, ModalHeader, ModalBody, ModalFooter, NavItem, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,Input,Label,FormGroup,Media
} from 'reactstrap';
import httpAction from '../../../util/ajax/httpAction';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';

import qs from 'qs';
class CommentList extends Component{
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    componentDidMount(){
        let id = this.props.bloglistid;
        this.props.dispatch(httpAction('/comment/'+id, 'get', null, (res)=>{
            this.props.dispatch({type:'GET_COMMENT_LIST', payload:{commentList: res.data.data}})
        }))
    }
   
   
    render(){
        return (
            <div className="comment-list">
                <p>{12}条评论</p>
                <hr style={{filter : "alpha(opacity=100,finishopacity=0,style=3)", margin: '0.3rem auto', width:"100%", borderTop:"1px solid #aaa"}} />
                {this.props.commentList.map((item,index)=>{
                    return (
                        <Media key={index}>
                            <Media left href="#">
                                <Media object src="http://www.weidongwei.com:88/img/expressImg/0104.jpg" alt="Generic placeholder image" />
                            </Media>
                            <Media body>
                                <Media heading>
                                {item.author}
                                </Media>
                                {item.comment}
                            </Media>
                        </Media>
                    )
                })}
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        blogList: state.mainIndex.blogList,
        commentList: state.mainIndex.commentList
    }
}   
 export default connect(mapStateToProps)(CommentList)