import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, CardImg, CardTitle, CardSubtitle, Card, Nav, CardBody, NavItem, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,UncontrolledDropdown
} from 'reactstrap';
import httpAction from '../../util/ajax/httpAction';
import FontAwesome from  'react-fontawesome';
import { history } from '../../store/configureStore';
 class MainIndex extends Component{
    constructor(props) {
        super(props);
        this.state = {
      
        }
        this.toBlog = this.toBlog.bind();
    }
    componentDidMount(){
        this.props.dispatch(httpAction('/bloglist/0','get',null, (res)=>{
            this.props.dispatch({type:'GET_BLOG_LIST_MAIN', payload: {blogList: res.data.data.bloglist} })
        }))
    }
    toBlog(e){
        console.log(e.target.dataset)
        history.push('/blog/'+e.target.dataset.id + "?title=" + e.target.dataset.title)
    }
    render(){
        let blogList = this.props.blogList;
        let list = blogList.map((item, index)=>{
            return (
                <Card className="card-item" key={index}>
                    <div className="card-img" key="3" onClick={this.toBlog} data-id={item.id} 
                    data-title={item.title} style={{backgroundImage: "url(" + require('../../images/static_imgs/webPic.jpg') + ")" }}/>
                    <CardBody className="card-body">
                        <CardTitle data-id={item.id} onClick={this.toBlog}
                        data-title={item.title}>{item.title}</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <hr style={{filter : "alpha(opacity=100,finishopacity=0,style=3)", margin: '0.5em auto', width:"100%", borderTop:"1px solid #ccc"}} />
                        <Nav style={{fontSize: '14px', fontWeight: '300'}}>
                            <NavItem style={{marginRight: "5px"}}>
                            <FontAwesome className="fa-fw" name="user" />&nbsp;{item.author}
                            </NavItem>
                            <NavItem style={{marginRight: "5px"}}>
                            <FontAwesome className="fa-fw" name="clock-o" />&nbsp;{item.pub_datetime}
                            </NavItem>
                            <NavItem style={{marginRight: "5px"}}>
                            <FontAwesome className="fa-fw" name="comments-o" />&nbsp;28
                            </NavItem>
                        </Nav>
                    </CardBody>
                </Card>
            )
        })
        return (
            <div className="main-card">
                <h2 className="font-white font-shadow">Ape-Caesar's SEXY HOUSE</h2>
                <h6 className="font-white font-shadow">男性の変態は何が問題なのですか？</h6>
                <h6 className="font-white font-shadow">is there has any problem with man's lechery?</h6>
                {list}
            </div>
        )
    }
 }
 function mapStateToProps(state){
    return {
        blogList: state.mainIndex.blogList
    }
}   
 export default connect(mapStateToProps)(MainIndex)