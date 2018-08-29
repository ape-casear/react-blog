import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col, Nav, NavItem, NavLink, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,UncontrolledDropdown
} from 'reactstrap';

 class Card extends Component{
    constructor() {
        super();
        this.state = {
            name: 'wdw',
            age: 23,
            dropdownOpen: false
        }
        this.switchToBlue = this.switchToBlue.bind(this)
        this.switchToRed = this.switchToRed.bind(this)
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    switchToBlue(){
        console.log('blue')
        this.props.dispatch( {type: 'switch blue'} ) 
        console.log('dnoe')
        console.log(this.props)
       
    }
    switchToRed(){
        console.log('red')
        this.props.dispatch({type: 'switch red', payload: { color: 'red', stop: 1 }})
    }
    render(){
        console.log('Card render')
        let style = {
            color: this.props.color
        }
        let color = this.props.color;
        console.log(color)
        return (
            <div className="App">
             <Navbar color="light" light expand="md">
            <NavbarBrand href="/">reactstrap</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.dropdownOpen} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/components/">Components</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                    Options
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem>
                        Option 1
                    </DropdownItem>
                    <DropdownItem>
                        Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        Reset
                    </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                </Nav>
            </Collapse>
            </Navbar>
              <header className="App-header">
                <h1 className="App-title">Welcome to React</h1>
              </header>
              <div style={style}>{color}</div>
              <div onClick={this.switchToBlue}>blue</div>
              <div onClick={this.switchToRed}>red</div>
              <div style={{width: '20%'}}>
                    <Nav tabs vertical>
                    <NavItem>
                        <NavLink href="#" >Link</NavLink>
                    </NavItem>
                    <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle nav caret>
                        Dropdown
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Header</DropdownItem>
                            <DropdownItem disabled>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>Another Action</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <NavItem>
                        <NavLink href="#">Link</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Another Link</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink  href="#">Disabled Link</NavLink>
                    </NavItem>
                    </Nav>
                </div>
                <div>
           
      </div>
                
                
            </div>
          );
    }
}

function mapStateToProps(state){
    console.log('mapStateToProps', state)
    console.log('mapStateToProps', typeof state.color)
    let { color } = state;
    return {
        color: color.color
    }
}   

export default connect(mapStateToProps)(Card)