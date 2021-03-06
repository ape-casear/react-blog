import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Route, Switch } from 'react-router';

import Head from './Head'; 
import SideBar from './SideBar'; 
import MainBox from './MainBox';
import FontAwesome from  'react-fontawesome';
import AboutMe from './AboutMe';
import LeaveMessage from './LeaveMessage';
import {stopEvent} from '../util/html-util/stopEvent';
import img_001 from '../images/static_imgs/kotori.png';
import img_002 from '../images/static_imgs/webPic.jpg';
import img_003 from '../images/gif/bear2.gif';
 class BigTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            waitImg: true,
        }
        this.click=this.click.bind(this)
        this.goTop=this.goTop.bind(this)
        this.stop=this.stop.bind(this)
    }
    click(e){
        
    }
    componentDidMount(){
        const myimg = new Image();
        myimg.src = img_002;
        // let timeout = 15;
        const that = this;
        myimg.onload = function () {
            setTimeout(() =>{
                that.setState({
                    waitImg: false,
                });
            }, 200)
        }
        /* const myinterval = window.setInterval(()=>{
            if (myimg.complete === true || timeout--  < 0) {
                window.clearInterval(myinterval);
                that.setState({
                    waitImg: false,
                });
            }
        }, 100) */
    }
    goTop(){
        window.scrollTo(0,0)
    }
    stop(e){
        console.log('mask stop')
        stopEvent(e)
    }
    render(){
        // this.props.window.innerHeight
        return (
            <div className="big-table" style={{}}
             onClick={this.click}>
                <Head></Head>
                <SideBar></SideBar>
                {
                    (()=>{
                        if(this.state.waitImg) {
                            return (
                                <div className="wait-Img" style={{height: this.props.window.innerHeight, width: this.props.window.innerWidth}}>
                                    {/* <img src={img_003}></img> */}
                                    <div><FontAwesome name="circle-o-notch" spin/>&nbsp;马上就加载好……</div>
                                </div>
                            )
                        }
                    })()
                }
                <div className="bg-img" style={{height: this.props.window.innerHeight, width: this.props.window.innerWidth}}></div>
                <div className="go-top" style={!this.props.window.goTop?{marginRight:"-50px", marginLeft: '-100px',marginBottom: '-100px'}:{}}
                onClick={this.goTop}>
                {(()=>{
                    if(this.props.window.innerWidth > 768){
                        return (
                            <img src={img_001}></img>
                        )
                    }else{
                        return (
                            <FontAwesome className="fa fa-fw" name="arrow-circle-up" />
                        )
                    }
                })()
                }
                </div>
                {(()=>{
                    if(this.props.window.innerWidth < 768 && this.props.side_toggle == 'on' ){
                        return (
                            <div className="mask" 
                            /*  onTouchMove={this.stop}
                            onTouchStart={this.stop}
                            onTouchEnd={this.stop}
                            onScroll={this.stop} */
                            style={this.props.side_toggle == 'on'?{height: this.props.window.innerHeight, width: this.props.window.innerWidth}:{display:'none'}}></div>
                        )
                    }
                    })()
                } 
                <Switch>
                    <Route path="/aboutme" name="about" component={AboutMe}></Route>
                    <Route path="/leavemessage" name="leavemessage" component={LeaveMessage}></Route>
                    <Route path="/" component={MainBox}
                   
                    ></Route>
                </Switch>
            </div>
        )
    }
 }
 function mapStateToProps(state){
    const { window, layout } = state
    
    return {
        window,
        side_toggle: layout.sidebar,
    }
}   
 export default connect(mapStateToProps)(BigTable)