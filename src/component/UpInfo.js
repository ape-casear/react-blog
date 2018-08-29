import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardLink, NavLink, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,UncontrolledDropdown
} from 'reactstrap';
import FontAwesome from  'react-fontawesome';

class UpInfo extends Component{
    constructor() {
        super();
        this.state = {
            dropdownOpen: false,
            active: 0
        }

    }

    render(){
        return (
            <div className="up-info">
                 <Card style={{borderRadius:"0px"}}>
                    <CardBody>
                        <CardTitle>Ape-Caesar</CardTitle>
                        <CardSubtitle>天津大学</CardSubtitle>
                    </CardBody>
                    <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody style={{padding: '0.5rem'}}>
                        <CardText>welcome to my blog</CardText>
                        <CardLink href="#">Card Link</CardLink>
                        <CardLink href="#">Another Link</CardLink>
                    </CardBody>
                </Card>
            </div>
        )
    }

}
function mapStateToProps(state){
    
    let { layout } = state;
    return {
        side_toggle: layout.sidebar
    }
}   
 export default connect(mapStateToProps)(UpInfo)