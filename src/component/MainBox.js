import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Route, Switch } from 'react-router';
import { Row, Col
} from 'reactstrap';
import MainIndex from './main/MainIndex';
import RightBar from './main/RightBar';
import BlogContent from './main/BlogContent';
import UserProfile from './main/UserProfile';
import ZHScraper from './main/projects/ZHScraper';
import Bus from '../App';
 class MainBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
      
        }
       
    }
    componentDidMount(){
        
    }
    render(){
        return (
            <div className="main-box" 
            style={(this.props.window.innerWidth < 768 && this.props.side_toggle == 'on')?{height:(this.props.window.innerHeight-49)+"px", overflow:'hidden'}:{minHeight: (this.props.window.innerHeight-49)+"px" }}
            >
                <Row style={{marginRight: '-14px',marginLeft: '-14px'}}>
                    <Col className="main-box-left" xs="12" >
                        <Switch>
                            <Route exact path="/" name="index" component={MainIndex}></Route>
                            <Route path="/blog/:blog" name="index" component={BlogContent}></Route>
                            <Route path="/user/:username" name="user" component={UserProfile}></Route>
                            <Route path="/zhihu" name="zhihu" component={ZHScraper}></Route>
                            <Route path="/bus" name="category" component={Bus}></Route>
                        </Switch>
                    </Col>
                    <Col className="main-box-right" xs="12">
                        <RightBar></RightBar>
                    </Col>
                </Row>
                <div className="beian" ><a href="http://www.miitbeian.gov.cn/">粤ICP备18112646号</a></div>
            </div>
        )
    }
 }
 function mapStateToProps(state){
    
    
    return {
        window: state.window,
        side_toggle: state.layout.sidebar
    }
}   
 export default connect(mapStateToProps)(MainBox)