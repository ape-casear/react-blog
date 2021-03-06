import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input,Label,FormGroup,Form
} from 'reactstrap';
import httpAction from '../../../util/ajax/httpAction';

import { history } from '../../../store/configureStore';
import { ToastContainer, toast } from 'react-toastify';
class ReplyBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            textInput:'',
            checkInput: false,
            modal: false,
            message: '',
            show: true,
            title: '发表评论'
        }
        this.comment = this.comment.bind(this);
        this.bindTextInput = this.bindTextInput.bind(this);
        this.bindCheckInput = this.bindCheckInput.bind(this);
        this.toggle = this.toggle.bind(this);
        this.goLogin = this.goLogin.bind(this);
        this.callback = this.callback.bind(this);
    }
    componentDidMount(){
        if(this.props.title){
            this.setState({title: this.props.title})
        }
        console.log('id:',this.props.id)
    }
    callback(res){
        console.log('this callback work')
        toast.info('评论成功：）',{
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
            className: 'react-toastify'
        })
        this.setState({textInput: ''})
        /* 判断是回复评论 还是评论文章 将新评论添加到评论列表*/
        let newComment = res.data.data;
        newComment.sub_comment = [];
        if(this.props.id){
            let new_commentList = this.props.commentList.map(item=>{
                if(item.id == this.props.id){
                    if(item.sub_comment){
                        item.sub_comment.push(
                            newComment
                        )
                    }else{
                        item.sub_comment = [newComment]
                    }
                }
                return item;
            })
            this.props.dispatch({type:'GET_COMMENT_LIST', payload:{commentList: new_commentList}})
        }else{
            console.log('add comment:',this.props.id)
            let new_commentList = [...this.props.commentList, newComment];
           
            this.props.dispatch({type:'GET_COMMENT_LIST', payload:{commentList: new_commentList}})
        }
        this.props.callback&&setTimeout(this.props.callback,1500)
    }
    /* 提交评论 */
    comment(){
        if(this.state.textInput == ''){
            this.setState({
                modal: true,
                message: '评论不能为空，你是傻子？',
                show: false
            });
            return;
        }
        /* 匿名评论 */
        if(this.state.checkInput){
            this.props.dispatch(httpAction('/comment/addcomment', 'post', 
            { bloglistid: this.props.bloglistid, comment: this.state.textInput, author: 'anonymous', parent: this.props.id || 0 }, this.callback))
        /* 正常评论 */
        }else{
            if(document.cookie.indexOf('ACCESS_TOKEN') >= 0 || localStorage.getItem('ACCESS_TOKEN')){
                /* 评论api */
                this.props.dispatch(httpAction('/comment/addcomment', 'post', 
                { bloglistid: this.props.bloglistid, comment: this.state.textInput, author: null, parent: this.props.id || 0 }, this.callback))
            }else{

                this.setState({
                    modal: true,
                    message: '没登陆就想发言？我劝你还是对评论有点敬畏之心(点击游客发言也可)',
                    show: true
                });
            }
        }

        console.log(this.state.checkInput)
    }
    /* 输入绑定 */
    bindTextInput(e){
        this.setState({
            textInput: e.target.value
        })
    }
    /* 输入绑定 */
    bindCheckInput(e){
        this.setState({
            checkInput: !this.state.checkInput
        })
    }
    /* 弹窗控制 */
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }
    /* 前往登录页 */
    goLogin() {
        this.setState({
          modal: !this.state.modal
        });
        history.push('/login')
    }
    render(){
        return (
            <div className="reply-box">
                <p style={{fontSize:'16px'}}>{this.state.title}</p>
                <Form>
                    <FormGroup>
                        <Label for="exampleText">{this.props.mode||'评论'}<small style={{color:"red"}}>*</small></Label>
                        <Input type="textarea" name="text" id="exampleText" placeholder="公子～来玩儿啊～"
                            value={this.state.textInput} onChange={this.bindTextInput}/>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="visit" value={this.state.checkInput}
                            onClick={this.bindCheckInput}/>{' '}
                            游客发言
                        </Label>
                    </FormGroup>
                    <Button onClick={this.comment} color="primary" size="sm">Submit</Button>
                </Form>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>MESSAGE</ModalHeader>
                    <ModalBody>
                        {this.state.message}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" style={this.state.show?{}:{display:'none'}} onClick={this.goLogin} size="sm">好的 爷</Button>{' '}
                        <Button color="secondary" onClick={this.toggle} size="sm">去你的</Button>
                    </ModalFooter>
                </Modal>
                <ToastContainer/>
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
 export default connect(mapStateToProps)(ReplyBox)