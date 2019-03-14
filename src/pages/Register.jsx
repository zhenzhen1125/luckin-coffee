import React, { Component } from 'react';
import { Icon } from 'antd';
import '../../public/static/css/register.scss';
import imgurl1 from '../../public/static/img/QQ2019030401.png';
import { NavLink } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import api from '@/api/register';
class Com extends Component {
  constructor(props){
    super(props);
    this.state = {
      // telvalue: '13022112163',
      telvalue: '',
      // value: '',
      // passwordvalue: '123456'
      passwordvalue: ''
    }
  }
  registerFn (telvalue,passwordvalue) {
    console.log(telvalue,passwordvalue)
    api.requestData(telvalue,passwordvalue)
      .then(data =>{
        console.log(data.data)
        console.log(data)
        if(data.data===1){
          Toast.success('注册成功')
        }else if(data.data===0){
          Toast.info('手机号已注册')
        }else{
          Toast.fail('注册失败')
        }
      })
  } 
  btnFn(e){
    console.log(e.target.value)
    this.setState({
      passwordvalue:e.target.value
    })
  }
  btbFn(e){
    console.log(e.target.value)
    this.setState({
      telvalue:e.target.value
    })
  }

  render () {
    return (
      <div className = "content" style={{background:'rgb(255,255,255)'}}>
        <NavLink to="./login">
          <div className="loginicon">
            <Icon type="left" />
          </div>
        </NavLink>
        <div className="loginimg">
          <img className="imgdx" src={imgurl1 } alt=''/>
        </div>
        <div className="registercontent">
          {/* <p>选择国家/地区  中国（+86）</p> */}
          <input onChange={this.btbFn.bind(this)} className="registerinput" defaultValue={this.state.telvalue} style={{marginTop:'0.1rem'}} type="phone" placeholder="请输入手机号"/>
          <br/>
          <input onChange={this.btnFn.bind(this)} className="registerinput" defaultValue={this.state.passwordvalue} style={{marginBottom:'0.1rem'}} type="password" placeholder="请输入密码"/>
          <br/>
          <button className="registerbutton" onClick = { this.registerFn.bind(this, this.state.telvalue, this.state.passwordvalue)}>注册</button>
          <br/>
          <p className="registerbottomp">点击注册，即表示已阅读并同意<span className="registerspan">《注册会员服务条款》</span></p>
        </div>
      </div>
    )
  }

}

export default Com
