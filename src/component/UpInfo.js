import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardLink
} from 'reactstrap';
import FontAwesome from  'react-fontawesome';
import img_001 from  '../images/static_imgs/pixiv001.jpg';
class UpInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            active: 0
        }

    }
    render(){
        let style_001 = {borderRadius:"0px"};
        return (
            <div className="up-info">
                 <Card style={style_001}>
                    <CardBody>
                        <CardTitle>Ape-Caesar</CardTitle>
                        <CardSubtitle>
                            <FontAwesome className="fa fa-fw" name="graduation-cap"/>
                            天津大学</CardSubtitle>
                    </CardBody>
                    <img width="100%" src={img_001} alt="Card image cap" />
                    <CardBody style={{padding: '0.5rem'}}>
                        <CardText>welcome to my blog</CardText>
                        <CardLink href="https://www.bilibili.com" target="_blank">BiliBili</CardLink>
                        <CardLink href="http://www.acfun.cn" target="_blank">AcFun</CardLink>
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