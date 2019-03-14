import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import 'antd/dist/antd.css';
import '../../public/static/css/user.scss';
// import 'antd-mobile/dist/antd-mobile.css';
import imgURL from '../../public/static/img/WechatIMG1.png';
import imgTX from '../../public/static/img/touxiang.png';
// import api from "@/api/user"
import Footer from '@/pages/Footer'

class Com extends Component {
  constructor(props){
    super(props);
    this.state={
      txt1:'立即登录',
    }
  }
  
  goPageFn (type) {
    // console.log(this)
    this.props.history.push('/userapp/' + type)
  }

  render () {
    let logindata = JSON.parse(localStorage.getItem('user'));
    console.log(logindata)
    return (
      <div className = "content" style={{background:'#f1f1f1'}}>
          <div className="first1">
            <div className="touxiangimg">
              <img className="imgtx" src={imgTX } alt=''/>
            </div>
            {
              
            }
            <p className="loginp">
              <input className="denglu" onClick={ this.goPageFn.bind(this, 'login')} type="button" value={logindata === null?this.state.txt1:logindata.tel}/>
            </p>
          </div>
          <div className="two2">
            
              <p className="userp"><span className="spaniconcolor"><Icon type="idcard" theme="filled" /></span><span className="spanitem">个人资料</span><span className="spaniconposition"><Icon type="right" /></span></p>
              <p className="userp"><span className="spaniconcolor"><Icon type="wallet" theme="filled" /></span><span className="spanitem">咖啡钱包</span><span className="spaniconposition"><Icon type="right" /></span></p>
              <p className="userp"><span className="spaniconcolor"><Icon type="layout" theme="filled" /></span><span className="spanitem">优惠券</span><span className="spaniconposition"><Icon type="right" /></span></p>
              <p className="userp"><span className="spaniconcolor"><Icon type="red-envelope" theme="filled" /></span><span className="spanitem">兑换优惠</span><span className="spaniconposition"><Icon type="right" /></span></p>
              <p className="userp1"><span className="spaniconcolor"><Icon type="profile" theme="filled" /></span><span className="spanitem">发票管理</span><span className="spaniconposition"><Icon type="right" /></span></p>
              <p className="userp2"><span className="spaniconcolor"><Icon type="heart" theme="filled" /></span><span className="spanitem">帮助反馈</span><span className="spaniconposition"><Icon type="right" /></span></p>
            
          </div>
          <div className="userimg">
            <img className="imgdx" src={imgURL } alt=''/>
          </div>
          <Footer/>
      </div>
    )
  }

}

export default Com
