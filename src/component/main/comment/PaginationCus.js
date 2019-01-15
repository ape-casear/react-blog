import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';

import 'highlight.js/styles/monokai-sublime.css';
 class BlogContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.pageTo = this.pageTo.bind(this);
        this.goNext = this.goNext.bind(this);
        this.goBack = this.goBack.bind(this);
    }
    componentDidMount(){
        /* console.log('list',this.props.length)
        console.log('index',this.props.index) */
    }
    pageTo(e){
        let page = parseInt(e.target.dataset.page);
        if(page === this.props.index)return;
        this.props.callback(page)
    }
    goBack(){
        // console.log('pageindex:',this.props.index)
        if(this.props.index - 1 < 1){
            return;
        }
        let page = this.props.index - 1;
        this.props.callback(page)
    }
    goNext(){
        // console.log('pageindex:',this.props.maxPage)
        if(this.props.index + 1 > this.props.maxPage){
            return;
        }
        let page = this.props.index + 1;
        this.props.callback(page)
    }
    render(){
        let offset = this.props.offset;
        return (
            <Pagination>
                <PaginationItem onClick={this.goBack}>
                    <PaginationLink previous />
                </PaginationItem>
                {
                    this.props.list.map((item)=>{
                        return (
                            <PaginationItem key={item} data-page={item} onClick={this.pageTo}>
                                <PaginationLink data-page={item} tag="span" style={(this.props.index==item)?{backgroundColor:'#eee',color:'#555'}:{color:'#555'}}>
                                    {/* <Link to={"/bloglist/"+index} style={{color:'#555'}}>{index+1}</Link> */}
                                    {item}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })
                }
                <PaginationItem onClick={this.goNext}>
                    <PaginationLink next  />
                </PaginationItem>
            </Pagination>
        )
    }

}

function mapStateToProps(state){
    return {
       
    }
}   
 export default connect(mapStateToProps)(BlogContent)