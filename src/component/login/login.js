import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, FormFeedback,FormGroup,Button,Label,Input} from 'reactstrap';
import FontAwesome from  'react-fontawesome';
import httpAction from '../../util/ajax/httpAction';
import { history } from '../../store/configureStore';
import { ToastContainer, toast } from 'react-toastify';
const  jsSHA = require("../../lib/jsSHA/src/sha.js");
class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            emailInput:'',
            passwordInput: '',
            checkPassword: '',
            emailMessage: '',
            passMessage: '',
            valid: false,
            invalid: false,
            title: '',
            mode: 0                     //  0:登录   1:注册
        }
        this.bindEmailInput = this.bindEmailInput.bind(this)
        this.bindPasswordInput = this.bindPasswordInput.bind(this)
        this.bindCheckPassword = this.bindCheckPassword.bind(this)
        this.submit = this.submit.bind(this)
        this.check = this.check.bind(this)
        this.goBack = this.goBack.bind(this)
        this.registry = this.registry.bind(this)
        this.checkPass = this.checkPass.bind(this)
    }
    componentDidMount(){

    }
    bindEmailInput(e){
        this.setState({
            emailInput: e.target.value,
            invalid : false,
            valid: false,
            c_invalid: false,
        })
    }
    bindPasswordInput(e){
        this.setState({
            passwordInput: e.target.value,
            invalid : false,
            valid: false,
            c_invalid: false,
        })
    }
    bindCheckPassword(e){
        this.setState({
            checkPassword: e.target.value,
            invalid : false,
            valid: false,
            c_invalid: false,
        })
    }
    check(){
        let that = this;
        this.props.dispatch(httpAction('/user/checkname', 'post', {author: this.state.emailInput}, (res)=>{
            if(this.state.mode == 0){
                if(res.data.code == 400){
                    that.setState({
                        valid : true
                    })
                }else{
                    that.setState({
                        emailMessage: '没有此账号',
                        invalid : true
                    })
                }
            }else{
                if(res.data.code == 0){
                    that.setState({
                        valid : true
                    })
                }else{
                    that.setState({
                        emailMessage: '用户名已注册',
                        invalid : true
                    })
                }
            }
        }))
    }
    
    submit(){
        if(this.state.emailInput == '' || this.state.passwordInput == ''){
            this.setState({
                emailMessage: '用户名和密码不能为空',
                invalid : true
            })
            return;
        }
        if(!/^\w{6,20}$/.test(this.state.passwordInput)){
            this.setState({
                emailMessage: '密码为6-20位字母数字下划线',
                invalid : true
            })
            return;
        }
        let shaObj = new jsSHA("SHA-256","TEXT");
        shaObj.update(this.state.passwordInput+'wdwblog')
        //console.log(this.state.passwordInput+'wdwblog')
        let password = shaObj.getHash("HEX");
        console.log(password)

        if(this.state.mode == 0){
            /* 登录 */
            this.props.dispatch(httpAction('/user/login', 'post', {author: this.state.emailInput, password }, (res)=>{
                if(res.data.code == 0){
                    localStorage.ACCESS_TOKEN = JSON.stringify(res.data.data);
                    localStorage.author = this.state.emailInput;
                    
                    toast.info("登录成功!", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                        className: 'react-toastify'
                    });
                    setTimeout(history.goBack, 1500)
                   
                }else{
                    this.setState({
                        emailMessage: '用户名或密码错误',
                        invalid : true
                    })
                }
            }))
        }else if(this.state.mode == 1){
            /* 注册 */
            this.props.dispatch(httpAction('/user/', 'post', {author: this.state.emailInput, password }, (res)=>{
                if(res.data.code == 0){
                    localStorage.ACCESS_TOKEN = JSON.stringify(res.data.data);
                    localStorage.author = this.state.emailInput;
                    toast.info("注册成功!", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 1500,
                        className: 'react-toastify'
                    });
                    setTimeout(history.goBack, 1500)
                }else{
                    this.setState({
                        emailMessage: '注册失败',
                        invalid : true
                    })
                }
            }))
        }
    }
    goBack(){
        history.goBack()
    }
    registry(){
        this.setState({
            title: 'REGISTRY',
            mode: 1
        })
    }
    checkPass(){
        if(this.state.passwordInput !== this.state.checkPassword){
            this.setState({
                c_invalid: true,
                c_passMessage: '两次密码不一致'
            })
        }
    }
    render(){
        return (
            <div className="login-bg" style={{minHeight: this.props.window.innerHeight, minWidth: this.props.window.innerWidth}}>
                <Card className="login-box">
                <h4>{this.state.title||'LOGIN'}</h4>
                <FormGroup>
                    <Label for="exampleEmail">
                    <FontAwesome name="envelope-open"/>&nbsp;&nbsp;
                    UserName</Label>
                    <Input type="email" name="email" value={this.state.emailInput}  valid={this.state.valid} invalid={this.state.invalid}
                    id="exampleEmail" placeholder="username" onChange={this.bindEmailInput} onBlur={this.check}/>
                    <FormFeedback tooltip>{this.state.emailMessage}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">
                    <FontAwesome name="key"/>&nbsp;&nbsp;
                    Password</Label>
                    <Input type="password" name="password" value={this.state.passwordInput} 
                    id="examplePassword" placeholder="password" onChange={this.bindPasswordInput}/>
                </FormGroup>
                {(()=>{
                if(this.state.mode == 1)
                    return (<FormGroup >
                                <Label for="checkPassword">
                                <FontAwesome name="key"/>&nbsp;&nbsp;
                                CheckPassword</Label>
                                <Input type="password" name="password" value={this.state.checkPassword} invalid={this.state.c_invalid}
                                id="checkPassword" placeholder="checkPassword" onChange={this.bindCheckPassword} onBlur={this.checkPass}/>
                                <FormFeedback tooltip>{this.state.c_passMessage}</FormFeedback>
                            </FormGroup>)
                })()
                }
                <Button color="secondary" onClick={this.submit}>submit</Button>
                {
                    (()=>{
                        if(this.state.mode == 1){
                            return (
                                <div className="option-box">
                                <div onClick={this.goBack}>
                                <FontAwesome name="chevron-left"/>&nbsp;&nbsp;返回
                                </div>
                                </div>
                            )
                        }else if(this.state.mode == 0){
                            return (
                                <div className="option-box">
                                <div onClick={this.goBack}>
                                <FontAwesome name="chevron-left"/>&nbsp;&nbsp;返回
                                </div>
                                <div onClick={this.registry}>
                                注册&nbsp;&nbsp;<FontAwesome name="chevron-right"/>
                                </div>
                                </div>
                            )
                        }
                    })()
                }
                </Card>
                <ToastContainer/>
            </div>
        )
    }
}
function mapStateToProps(state){
    
    
    return {
        window : state.window
        
    }
}   
 export default connect(mapStateToProps)(Login)