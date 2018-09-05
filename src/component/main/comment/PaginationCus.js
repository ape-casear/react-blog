import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink, CardSubtitle, Card, Nav, CardBody, NavItem, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,BreadcrumbItem,Breadcrumb
} from 'reactstrap';

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
        console.log('list',this.props.list)
        console.log('index',this.props.index)
    }
    pageTo(e){
        let page = parseInt(e.target.dataset.page);
        if(page === this.props.index)return;
        this.props.callback(page)
    }
    goBack(){
        if(this.props.index - 1 < 0){
            return;
        }
        let page = this.props.index - 1;
        this.props.callback(page)
    }
    goNext(){
        console.log(this.props.index)
        if(this.props.index + 1 > this.props.list-1){
            return;
        }
        let page = this.props.index + 1;
        this.props.callback(page)
    }
    render(){
        return (
            <Pagination>
                <PaginationItem onClick={this.goBack}>
                    <PaginationLink previous />
                </PaginationItem>
                {
                    new Array(this.props.list).fill(1).map((item,index)=>{
                        return (
                            <PaginationItem key={index} data-page={index} onClick={this.pageTo}>
                                <PaginationLink data-page={index} tag="span" style={(this.props.index==index)?{backgroundColor:'#eee',color:'#555'}:{color:'#555'}}>
                                    {/* <Link to={"/bloglist/"+index} style={{color:'#555'}}>{index+1}</Link> */}
                                    {index+1}
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
        blogList: state.mainIndex.blogList,
        pageNum: state.mainIndex.pageNum,
        totalPages: state.mainIndex.totalPages
    }
}   
 export default connect(mapStateToProps)(BlogContent)