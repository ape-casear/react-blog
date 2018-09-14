import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbItem,Breadcrumb
} from 'reactstrap';
import FontAwesome from  'react-fontawesome';
export default function BreadcrumbCus(props){
    function weiboShare(){
        let wb_shareBtn = document.getElementById("shareBtn")
        let wb_url = document.URL; //获取当前页面地址，也可自定义例：wb_url = "http://liuyanzhao.com"
        let wb_appkey = "4022133664";//你的app key
        let wb_title = "ape_Caesar的博客";
        let wb_ralateUid = "3917326679";//微博id，获得你的用户名
        let wb_pic = "";
        let wb_language = "zh_cn";
        wb_shareBtn.setAttribute("href","http://service.weibo.com/share/share.php?url="+wb_url+"&appkey="+wb_appkey+"&title="+wb_title+"&pic="+wb_pic+"&ralateUid="+wb_ralateUid+"&language="+wb_language+"");
    }
    setTimeout(weiboShare, 2000);
    
    return (
        <div style={{width: "100%"}}>
            <Breadcrumb tag="nav">
                <BreadcrumbItem tag="div" href=""><Link to="/">
                <FontAwesome name="home" className="fa-fw"/>
                Home</Link></BreadcrumbItem>
                <BreadcrumbItem active tag="span">{props.name}</BreadcrumbItem>

                <div className="share" >分享到:
                <a id="shareBtn" href="javascript:void(0)"  target="_blank"><FontAwesome name="weibo" className="fa-fw"/></a>
                </div>
            </Breadcrumb>
        </div>
    )
}