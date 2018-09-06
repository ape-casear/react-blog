import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, ListGroupItem, 
    ListGroup,Jumbotron,Button,UncontrolledTooltip
} from 'reactstrap';
import FontAwesome from  'react-fontawesome';
 class AboutMe extends Component{
    constructor(props) {
        super(props);
        this.state = {
      
        }
       
    }
    componentDidMount(){

    }
    render(){
        return (
            <div className="about-me main-box"
            style={(this.props.window.innerWidth < 768 && this.props.side_toggle == 'on')?{height:(this.props.window.innerHeight-49)+"px", overflow:'hidden'}:{}}
            >
              <Card className="" style={{backgroundColor: "#fff"}}>
              <Jumbotron style={{marginBottom:"0px", paddingBottom: "2rem", backgroundColor: "#fff"}}>
                    <h1 className="display-3">Hello, there!</h1>
                    <p className="lead">这里是一个从中建八局离职转行做码农的绅士，从现实搬砖到网络搬砖，2017-10-1开始学习网络知识，2018-3-1正式开始互联网工作
                    学的东西参差不齐，希望有大佬能带带我 :)</p>
                    <hr className="my-2" />
                    <p>技能： nodejs(express/koa(nodejs的web框架)、puppeteer(写爬虫)、cheerio); wepy(小程序); typescript(javascript超集); vuejs(新生代); reactjs(厉害了我的哥); java(快忘光了); mysql; reids; mongodb; tomcat; nginx </p>
                    <p className="lead">
                    <Button color="info">赞你一个</Button>
                    </p>
                </Jumbotron>
              </Card>
              <Card className="">
                <div className="tags">
                    <span className="head" style={{fontSize:'20px'}}>Ape-Caesar&nbsp;&nbsp;</span>
                    <span className="head">
                    <FontAwesome name="tag"/>
                    工科&nbsp;&nbsp;
                    </span>
                    <span className="head">
                    <FontAwesome name="tag"/>
                    看美剧&nbsp;&nbsp;
                    </span>
                    <span className="head">
                    <FontAwesome name="tag"/>
                    看动漫&nbsp;&nbsp;
                    </span>
                    <span className="head">
                    <FontAwesome name="tag"/>
                    单身&nbsp;&nbsp;
                    </span>
                    <span className="head">
                    <FontAwesome name="tag"/>
                    90后
                    </span>
                    <span className="head">
                    <FontAwesome name="tag"/>
                    LOL 炉石传说
                    </span>
                </div>
                <div className="introduce-box row">
                    
                    <Col sm="6" xs="12">
                        <div className="short-talk">
                            <p>《银河帝国》是真的好看，Daniel一定很帅</p>
                            <p>人活着，就是为了_____？</p>
                            <p>哇~！ 金！色！传！说！</p>
                            <p>咸粽子是真的好吃</p>
                            <p>听说r20挺好用？</p>
                        </div>
                    </Col>
                    <Col sm="6" xs="12">
                        <ListGroup>
                            <ListGroupItem>
                                <div>
                                    <FontAwesome name="envelope-open"/>&nbsp;&nbsp;
                                    mail:
                                </div>
                                <div>122884944@qq.com</div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div>
                                    <FontAwesome name="wechat"/>&nbsp;&nbsp;
                                    wechat:
                                </div>
                                <div id="wechat" style={{textDecoration: 'underline'}}>ape_Caesar_node</div>
                                <UncontrolledTooltip placement="top" target="wechat">
                                    <img style={{width: '140px', height: '140px'}}src={require('../images/static_imgs/wechat_wdw.png')}></img>
                                </UncontrolledTooltip>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div>
                                    <FontAwesome name="github"/>&nbsp;&nbsp;
                                    github:
                                </div>
                                <div>ape-casear</div>
                            </ListGroupItem>
                            
                        </ListGroup>
                    </Col>
                   
                </div>
              </Card>
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
 export default connect(mapStateToProps)(AboutMe)