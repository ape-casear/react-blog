import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Route, Switch } from 'react-router';
import { Row, Col
} from 'reactstrap';
import MainIndex from './main/MainIndex';
import RightBar from './main/RightBar';
import BlogContent from './main/BlogContent';
import ZHScraper from './main/projects/ZHScraper';

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
            style={(this.props.window.innerWidth < 768 && this.props.side_toggle == 'on')?{height:(this.props.window.innerHeight-49)+"px", overflow:'hidden'}:{}}
            >
                <Row style={{marginRight: '-14px',marginLeft: '-14px'}}>
                    <Col className="main-box-left" xs="12" >
                        <Switch>
                            <Route exact path="/" name="index" component={MainIndex}></Route>
                            <Route path="/blog/:blog" name="index" component={BlogContent}></Route>
                            <Route path="/zhihu" name="zhihu" component={ZHScraper}></Route>
                            <Route path="/bloglist-category" name="category" component={MainIndex}></Route>
                        </Switch>
                    </Col>
                    <Col className="main-box-right" xs="12">
                        <RightBar></RightBar>
                    </Col>
                </Row>
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