import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';

import ReplyBox from './comment/ReplyBox'
import CommentList from './comment/CommentList'

class Comments extends Component{
    constructor(props) {
        super(props);
        this.state = {
            goToWork: false
        }
        this.tellBtoReRender = this.tellBtoReRender.bind(this)
    }
    componentDidMount(){
        console.log(this.props)
    }
    tellBtoReRender(){
        this.setState({
            goToWork: !this.state.goToWork
        })
    }
    render(){
        return (
            <Card className="comment-box">
                <ReplyBox bloglistid={this.props.bloglistid} callback={this.tellBtoReRender}/>
                <CommentList bloglistid={this.props.bloglistid} work={this.state.goToWork}/>
            </Card>
        )
    }

}

function mapStateToProps(state){
    return {
        blogList: state.mainIndex.blogList
    }
}   
 export default connect(mapStateToProps)(Comments)