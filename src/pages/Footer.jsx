import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Footer extends Component{
  render(){
    return(
      <footer className = "footer">
          <ul>
            <NavLink to = "/home">
              {/* <img src="./footer.jpg" alt="" className="footerimg"/> */}
              <span className="iconfont icon-home"></span>
              <p>首页</p>
            </NavLink >
            <NavLink to = "/kind">
              <span className="iconfont icon-coffee"></span>
              <p>菜单</p>
              
            </NavLink >
            <NavLink to = "/order">
              <span className="iconfont icon-Order"></span>
              <p>订单</p>
            </NavLink >
            <NavLink to = "/cart">
              <span className="iconfont icon-icon"></span>
              <p> 购物车</p>
            </NavLink >
            <NavLink to = "/user">
              <span className="iconfont icon-home-copy-copy"></span>
              <p> 我的</p>
            </NavLink >
          </ul>
        </footer>
    )
  }
}

export default Footer