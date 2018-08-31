import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardImg, CardTitle, CardSubtitle, Card, Nav, CardBody, NavItem, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,BreadcrumbItem,Breadcrumb
} from 'reactstrap';
import httpAction from '../../util/ajax/httpAction';
import FontAwesome from  'react-fontawesome';
 class BlogContent extends Component{
    constructor() {
        super();
        this.state = {
      
        }
       
    }
    render(){
        return (
            <div className="main-card blog-box">
                <h2 className="font-white font-shadow">Ape-Caesar's SEXY HOUSE</h2>
                <h6 className="font-white font-shadow">男性の変態は何が問題なのですか？</h6>
                <h6 className="font-white font-shadow">is there has any problem with man's lechery?</h6>
                <div style={{width: "100%"}}>
                <Breadcrumb tag="nav">
                    <BreadcrumbItem tag="a" href="#">Home</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">正文</BreadcrumbItem>

                    <div className="share" >分享到:
                    <FontAwesome name="weibo" className="fa-fw"/>
                    </div>
                </Breadcrumb>
                </div>
                <Card className="blog">

                </Card>
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        blogList: state.mainIndex.blogList
    }
}   
 export default connect(mapStateToProps)(BlogContent)