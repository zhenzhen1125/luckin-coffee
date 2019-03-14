import React, { Component } from 'react';
import { InputItem, Toast, Button } from 'antd-mobile';
import api from '@/api/user';
import { Link } from 'react-router-dom';
import 'antd-mobile/dist/antd-mobile.css';
import imgurl1 from '../../public/static/img/QQ2019030401.png';
import { Icon } from 'antd';
// import { NavLink } from 'react-router-dom';
import '../../public/static/css/login.scss';
class Com extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hasError: false,
      // value: '13022112163',
      value: '',
      hasPasswordError: false,
      // passwordvalue: '123456'
      passwordvalue: ''
    }
  }
  /* goBack (){
    window.history.go(-1);
  } */
  onErrorClick = () => {
    if (this.state.hasError) {
      Toast.info('请输入正确格式的手机号码');
    }
  }
  onPasswordErrorClick () {
    if (this.state.hasPasswordError) {
      Toast.info('请输入正确格式的密码');
    }
  }
  onChange (value) {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasError: true,
      });
    } else {
      this.setState({
        hasError: false,
      });
    }
    this.setState({
      value,
    });
    // console.log(this.state.value)
  }
  onPasswordChange (passwordvalue) {
    if (passwordvalue.replace(/\s/g, '').length < 4) {
      this.setState({
        hasPasswordError: true,
      });
    } else {
      this.setState({
        hasPasswordError: false,
      });
    }
    this.setState({
      passwordvalue,
    });
    // console.log(this.state.passwordvalue)
  }

  loginFn (tel, password) {
    console.log(tel, password)
    api.requestData(tel, password)
      .then(data => {
        // console.log(data)
        if (data.data === 1) {
          Toast.success('登录成功',1);
          this.props.history.push('/home')
          localStorage.setItem("user",JSON.stringify({tel:this.state.value,password:this.state.passwordvalue}))
        } else if (data.data === 0) {
          Toast.info('请注册');
        } else if (data.data === 2) {
          Toast.fail('密码错误');
        } else {
          Toast.fail('登录失败');
        }
      })
  }
  render () {
    // console.log(this.state.hasError)
    // console.log(this.state.hasPasswordError)
    let type = ''
    let disabled = true
    if (this.state.hasError === false && this.state.hasPasswordError === false && this.state.value.length > 0 && this.state.passwordvalue.length > 0) {
      type = 'primary';
      disabled = false
    } 
    return (
      <div className = "content" style={{background:'rgb(255,255,255)'}}>
        <Link to="/user">
          <Icon className="loginicon" type="left" />
        </Link>
        <div className="loginimg">
          <img className="imgdx" src={imgurl1 } alt=''/>
        </div>
        <div className="registercontent">
          <InputItem
              type="number"
              clear
              placeholder="请输入手机号"
              error={this.state.hasError}
              onErrorClick={this.onErrorClick}
              onChange={this.onChange.bind(this)}
              value={this.state.value}
            ></InputItem>
            <InputItem
              type="password"
              clear
              placeholder="请输入密码"
              error={this.state.hasPasswordError}
              onErrorClick={this.onPasswordErrorClick.bind(this)}
              onChange={this.onPasswordChange.bind(this)}
              value={this.state.passwordvalue}
            ></InputItem>
            <Button style={{marginTop:'0.1rem'}} type={ type } disabled = { disabled } onClick = { this.loginFn.bind(this, this.state.value, this.state.passwordvalue)}>登录</Button>
            <Link to="./register">
              <button style={{marginTop:'0.1rem',background: '#5ab0f7',color:'white',border:'none',width:'100%',height:'0.5rem',fontSize:'0.18rem',borderRadius:'0.06rem'}}>注 册</button>
            </Link>
          </div>
      </div>
    )
  }

}

export default Com
