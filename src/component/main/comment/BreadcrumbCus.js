import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbItem,Breadcrumb
} from 'reactstrap';
import FontAwesome from  'react-fontawesome';
export default function BreadcrumbCus(props){

    return (
        <div style={{width: "100%"}}>
            <Breadcrumb tag="nav">
                <BreadcrumbItem tag="div" href=""><Link to="/">
                <FontAwesome name="home" className="fa-fw"/>
                Home</Link></BreadcrumbItem>
                <BreadcrumbItem active tag="span">{props.name}</BreadcrumbItem>

                <div className="share" >分享到:
                <FontAwesome name="weibo" className="fa-fw"/>
                </div>
            </Breadcrumb>
        </div>
    )
}