import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, NavItem, NavLink,UncontrolledCollapse,Badge
} from 'reactstrap';
import FontAwesome from  'react-fontawesome';
import UpInfo from './UpInfo';
import { side_bar } from '../config/layout-config';
import { history } from '../store/configureStore';
import { Link } from 'react-router-dom';
import httpAction from '../util/ajax/httpAction';
 class SideBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            active: 0,
            side_bar: []
        }
        this.toggle = this.toggle.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
        this.closeSideBarForce = this.closeSideBarForce.bind(this)
        this.onBlur = this.onBlur.bind(this)
    }
    componentDidMount(){
        this.setState({side_bar})
        for(let e in side_bar[1]){
            console.log(`key:${e},value:${side_bar[1][e]}`)
        }
        this.props.dispatch(httpAction('/bloglist-category', 'get', null, res=>{
            let data = res.data.data;
            let side_bar = this.state.side_bar;
            data.forEach((item,index)=>{
                side_bar[1].sub_link.push({
                    id: index,
                    className: 'subbar',
                    name: item.tag||'未分类',
                    icon:{
                        name: 'link',
                        className: 'super-crazy-colors fa-fw'
                    },
                    count: item.count
                })

            })
            this.setState({side_bar})
        }))
        this.props.dispatch(httpAction('/bloglist/0?type2=2', 'get', null, res=>{
            let list = res.data.data.bloglist;
            this.props.dispatch({ type: 'GET_PROJECT_LIST', payload: { projectList: list}})
            let side_bar = this.state.side_bar;
            list.forEach((item, index)=>{
                side_bar[0].sub_link.push({
                    id: index,
                    className: 'subbar',
                    name: item.title,
                    icon:{
                        name: 'link',
                        className: 'super-crazy-colors fa-fw'
                    }
                })
            })
            this.setState({side_bar})
        }))
    }
    componentWillUnmount(){
        side_bar[1].sub_link = [];
        side_bar[0].sub_link = [];
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    navigateTo(e){
        console.log(e.target.dataset.id)
        if(e.target.dataset.id === '0'){
            let index =  e.target.dataset.key;
            let blog = this.props.projectList[index]
            history.push(`/bus?toblog=${blog.id}?title=${blog.title}`)
        }else if(e.target.dataset.route && e.target.dataset.id === '1'){
            console.log('navigateTo')
            history.push('/bus?category='+ e.target.dataset.route)
        }
        if(window.innerWidth < 768){
            this.props.dispatch({type: 'switch sideOutIn', payload: { sidebar: 'off' }})
        }
    }
    closeSideBarForce(){
        if(window.innerWidth < 768){
            this.props.dispatch({type: 'switch sideOutIn', payload: { sidebar: 'off' }})
        }
    }
    onBlur(){
       
    }
    render(){
        console.log('SideBar rereander')

        let list = this.state.side_bar.map(item=>{
            return (
                <NavItem key={item.id}>
                    <NavLink tag="span" className={item.link.className} id={item.link.id} href='#'
                    data-route={item.href} style={{color: '#a6a8b1'}}>
                        <FontAwesome className={item.icon.className} data-route={item.href} name={item.icon.name} ></FontAwesome>&nbsp;&nbsp;
                    {
                        (()=>{
                            if(item.href){
                                return (
                                    <Link to={"/"+item.href}
                                    onClick={this.closeSideBarForce}
                                    >{item.name}</Link>
                                )
                            }else{
                                return (
                                    <span>{item.name}</span>
                                )
                            }
                            
                        })()
                    }
                    </NavLink>
                    {
                        (()=>{
                            if(item.sub_link)
                                return (<UncontrolledCollapse id="" toggler={'#'+item.link.id}>
                                    {item.sub_link.map(sub_item=>{
                                        return (
                                        <NavLink key={sub_item.id} data-key={sub_item.id} className={sub_item.className} 
                                            data-route={sub_item.name} data-id={item.id} href="#" onClick={this.navigateTo}>
                                            <FontAwesome className={sub_item.icon.className} 
                                                data-id={item.id} data-route={sub_item.name} name={sub_item.icon.name} />&nbsp;&nbsp;
                                            {sub_item.name}
                                            {sub_item.count&&<Badge tag="span" color="secondary" style={{float: 'right'}}>{sub_item.count}</Badge>}
                                        </NavLink>)
                                    })}
                                    </UncontrolledCollapse>)
                        })()
                    }
                </NavItem>
            )
        })
        return (
            <div className={"navi-wrap scrollable side-toggle-"+ this.props.side_toggle } onBlur={this.onBlur}>
              <UpInfo></UpInfo>
              <Nav  vertical>
                    <NavItem onClick={this.closeSideBarForce}>
                        <Link to="/bus"><NavLink tag="div" >
                        <FontAwesome className="fa fa-fw" name="home" />&nbsp;&nbsp;
                        HOME</NavLink></Link>
                    </NavItem>
                    <NavItem  onClick={this.closeSideBarForce}>
                        <Link to="/aboutme"><NavLink tag="div" >
                        <FontAwesome className="fa fa-fw" name="user" />&nbsp;&nbsp;
                        ABOUT ME</NavLink></Link>
                    </NavItem>
                    
                    <hr style={{filter : "alpha(opacity=100,finishopacity=0,style=3)", margin: '0.3em auto', width:"80%", borderTop:"1px solid #a6a8b1"}} />
                    
                    {list}
                    <NavItem >
                        <NavLink href="#"  onClick={this.closeSideBarForce}>Another Link</NavLink>
                    </NavItem>
                    <NavItem >
                        <NavLink  href="#"  onClick={this.closeSideBarForce}>Disabled Link</NavLink>
                    </NavItem>
                </Nav>
            </div>
        )
    }
 }
 function mapStateToProps(state){
    
    let { layout, mainIndex } = state;
    return {
        side_toggle: layout.sidebar,
        projectList: mainIndex.projectList
    }
}   
 export default connect(mapStateToProps)(SideBar)