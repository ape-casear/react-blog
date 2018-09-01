import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardImg, Modal, ModalHeader, ModalBody, ModalFooter, NavItem, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,Input,Label,FormGroup,Form
} from 'reactstrap';
import httpAction from '../../../util/ajax/httpAction';
import FontAwesome from  'react-fontawesome';
import { Link } from 'react-router-dom';
import { history } from '../../../store/configureStore';
import qs from 'qs';
class ReplyBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
           textInput:'',
           checkInput: false,
           modal: false
        }
        this.comment = this.comment.bind(this);
        this.bindTextInput = this.bindTextInput.bind(this);
        this.bindCheckInput = this.bindCheckInput.bind(this);
        this.toggle = this.toggle.bind(this);
        this.goLogin = this.goLogin.bind(this);
    }
    componentDidMount(){
        
    }
    comment(){
        if(this.state.checkInput){

        }else{
            if(document.cookie.indexOf('access_wdw_blog') >= 0){
                /* 评论api */
            }else{
                this.setState({
                    modal: true
                });
            }
        }

        console.log(this.state.checkInput)
    }
    bindTextInput(e){
        this.setState({
            textInput: e.target.value
        })
    }
    bindCheckInput(e){
        this.setState({
            checkInput: !this.state.checkInput
        })
    }
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }
    goLogin() {
        this.setState({
          modal: !this.state.modal
        });
        history.push('/login')
    }
    render(){
        return (
            <div className="reply-box">
                <p>发表评论</p>
                <Form>
                    <FormGroup>
                        <Label for="exampleText">评论<small style={{color:"red"}}>*</small></Label>
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
                        没登陆就想发言？我劝你还是对评论有点敬畏之心(点击游客发言也可)
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.goLogin} size="sm">好的 爷</Button>{' '}
                        <Button color="secondary" onClick={this.toggle} size="sm">去你的</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        blogList: state.mainIndex.blogList
    }
}   
 export default connect(mapStateToProps)(ReplyBox)