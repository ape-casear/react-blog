import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Progress, Nav, NavItem, NavLink, Dropdown,DropdownToggle, DropdownMenu,DropdownItem,
    Navbar,NavbarBrand,NavbarToggler,Collapse,UncontrolledDropdown
} from 'reactstrap';
import FontAwesome from  'react-fontawesome';
import { history } from '../store/configureStore';
import { stopEvent } from '../util/html-util/stopEvent';
import { Link } from 'react-router-dom';
const timeout = ms =>new Promise(res=>setTimeout(res, ms))
class Head extends Component{
    constructor(){
        super();
        this.state = {
            isOpen : false,
            orientation: 'expand',
            progress: 0,
        }
        this.toggle = this.toggle.bind(this)
        this.closeSideBar = this.closeSideBar.bind(this)
        this.gohome = this.gohome.bind(this)
        this.jumpTo = this.jumpTo.bind(this)
        this.loading = this.loading.bind(this)
        this.close = this.close.bind(this)
    }
    toggle(e){
        console.log('toggle')
        console.log(e.target)
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    close(e){
        console.log('close')
        console.log(e.target)
        this.setState({
            isOpen: false
        })
    }
    closeSideBar(e){
        stopEvent(e)
        let type = this.props.side_toggle == 'on'? 'off': 'on';
        this.setState({
            orientation: this.state.orientation == 'expand'? 'compress':'expand'
        })
        this.props.dispatch({type: 'switch sideOutIn', payload: { sidebar: type }})
    }
    gohome(e){
        stopEvent(e)
        history.push('/')
    }
    jumpTo(e){
        let path = e.target.dataset.path;
        history.push('/'+path)
    }
    async loading(){
        
        while(this.state.progress < 70){
            await timeout(50)
            if(!this.props.loading){
                break
            }
            this.setState({progress: ++this.state.progress})
        }
    }

    componentDidMount(){
        window.onresize = ()=>{
            if(window.innerWidth > 768){
                this.props.side_toggle=='off'&&this.props.dispatch({type: 'switch sideOutIn', payload: { sidebar: 'on' }})
            }else if(window.innerWidth <= 768){
                this.props.side_toggle=='on'&&this.props.dispatch({type: 'switch sideOutIn', payload: { sidebar: 'off' }})
            }
            this.props.dispatch({type: 'windowSize', payload: { innerWidth: window.innerWidth ,innerHeight: window.innerHeight}})
        };
    }
    async componentWillReceiveProps(nextProps){
        if(this.props.loading == false && nextProps.loading == true){
            this.loading()
        }
        if(this.props.loading == true && nextProps.loading == false){
            this.setState({progress: 100})
            await timeout(200)
            this.setState({progress: 0})
        }
    }
    render(){
        
        
        return (
            <div >
            <Navbar className="fixedable-top" color="dark" dark expand="md" onBlur={this.close}>
            <NavbarBrand tag="div">
            <FontAwesome  style={{fontSize: '1.3rem', marginLeft: '8px'}} name="home" size="lg" onClick={this.gohome}/>
            &nbsp;<Link to="/">WDW-React</Link>&nbsp;
                <FontAwesome className="adapt-visible" style={{fontSize: '1.33rem', marginLeft: '8px'}} name={this.state.orientation} size="lg"
                    onClick={this.closeSideBar}>
                </FontAwesome>
            </NavbarBrand>
            
         
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar >
                <Nav className="ml-auto" navbar >
                <NavItem >
                    <NavLink tag="div"><Link to="/leavemessage" style={{fontSize:'14px',fontWeight:"300"}}
                    >
                    <FontAwesome className="fa-fw" name="calendar-o" >
                    </FontAwesome>
                    留言板
                    </Link>
                    </NavLink>
                </NavItem>
                <NavItem >
                    <NavLink href="https://github.com/ape-casear" target="_blank" style={{fontSize:'14px',fontWeight:"300"}}
                    >
                    <FontAwesome className="fa-fw" name="github-square" >
                    </FontAwesome>
                    GitHub</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar >
                    <DropdownToggle nav caret style={{fontSize:'14px',fontWeight:"300"}}>
                    <FontAwesome className="fa-fw" name="cog" >
                    </FontAwesome>
                    Options
                    </DropdownToggle>
                    <DropdownMenu right>
                    <DropdownItem data-path="cute" onClick={this.jumpTo}>
                        我很可爱
                    </DropdownItem>
                    <DropdownItem data-path="money" onClick={this.jumpTo}>
                        给我打钱
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem data-path="login" onClick={this.jumpTo}>
                        登录
                    </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                </Nav>
            </Collapse>
            </Navbar>
            <Progress className="loading-progress" style={(this.state.progress==0)?{display:'none'}:{}} value={this.state.progress} />
            </div>
        )
    }
 }

 function mapStateToProps(state){
    
    let { color, layout, window} = state;
    return {
        color: color.color,
        side_toggle: layout.sidebar,
        loading: layout.load,
        window: window,
    }
}   

export default connect(mapStateToProps)(Head)