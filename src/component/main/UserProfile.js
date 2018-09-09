import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Input, Button} from 'reactstrap';
import httpAction from '../../util/ajax/httpAction';
import FontAwesome from  'react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
 class UserProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userProfile: {},
            self: false,
            mode: 1,            // 1:视图   0:编辑
            des_input: '',
            img_data: '',
            imgName: ''
        }
        this.edit = this.edit.bind(this)
        this.bindinput = this.bindinput.bind(this)
        this.imgLoad = this.imgLoad.bind(this)
    }
    componentDidMount(){
        let user = this.props.match.params.username
        this.props.dispatch(httpAction("/user/" + user, 'get', null, res=>{
            this.setState({
                userProfile: res.data.data,
                des_input: res.data.data.describe,
                img_data: res.data.data.avatar,
            })
        }))
    }
    edit(){
        /* 开启编辑 */
        if(this.state.mode === 1){
            this.setState({
                mode: 0
            })
        }else{
        /* 提交 */
            let data = { avatar: this.state.img_data, describe: this.state.des_input, name: this.state.imgName}
            this.props.dispatch(httpAction("/user/update-profile", 'post', data, res=>{
                this.setState({
                    userProfile: res.data.data,
                    des_input: res.data.data.describe,
                    mode: 1
                })
                toast.warn('编辑成功', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                    className: 'react-toastify'
                })
            }))
        }
    }
    bindinput(e){
        this.setState({
            des_input: e.target.value
        })
    }
    cancel(){
        this.setState({mode:1})
    }
    imgLoad(e){
        let file = e.target;
        let target = file.files[0];
        if(!target)return;
        console.log(target)
        if(target.size/1024 > 500){
            toast.warn('头像图片要小于500kb', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            })
            return;
        }
        if(target.type.indexOf('image') >= 0) {
            this.setState({
                imgName: target.name
            })
            let reader = new FileReader();
            let cb = this.setState.bind(this)
            reader.onload = function(){
                let imgUrl = this.result;
                cb({img_data: imgUrl})
            }   
            reader.readAsDataURL(target) 
        }else{
            toast.warn('要图片啊大哥！', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            })
        }
    }
    render(){
        let style_001 = {height: '100%',justifyContent: 'start'};
        return (
            <div className="main-card" style={style_001}>
                <Card className="user-profile" style={{}}> 
                    <div className="user-edit" style={this.state.userProfile.self?{}:{display: 'none'}}
                    onClick={this.edit}>{this.state.mode===0?'':'编辑'}</div>
                    <div className="img-box">
                        <img src={this.state.img_data}/>
                        <div className="user-tip">{
                            this.state.mode===0?(<span>
                                                    <span className="fileinput-button">
                                                        <span className="ch-text">
                                                        <FontAwesome name="edit"/>&nbsp;
                                                        编辑头像</span>
                                                        <input id="avatar" className="up-avatar" type="file" onChange={this.imgLoad}></input>
                                                    </span>
                                                </span>):''
                        }</div>
                    </div>
                    <div className="user-info-box">
                        <div className="user-username">
                        {this.state.userProfile.author}</div>
                        {(()=>{
                            if(this.state.mode){
                                return (
                                    <div className="user-describe">
                                    {this.state.userProfile.describe||'这个人很懒，什么都没写'}
                                    </div>
                                )
                            }else{
                                return (
                                    <div>
                                    <Input className="user-describe" type="textarea" value={this.state.des_input} onChange={this.bindinput}>
                                    </Input>
                                    <Button className="user-btn" color="primary" onClick={this.edit}>确定</Button>
                                    <Button className="user-btn" color="secondary" onClick={this.cancel.bind(this)}>取消</Button>
                                    </div>
                                )
                            }
                        })()}
                    </div>
                </Card>
                <ToastContainer/>
            </div>
        )
    }

}

function mapStateToProps(UserProfile){
    return {
        
    }
}   
 export default connect(mapStateToProps)(UserProfile)