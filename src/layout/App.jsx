import React, { Component } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import Home from '@/pages/Home';
import Kind from '@/pages/Kind';
import Cart from '@/pages/Cart';
import User from '@/pages/User';
import Order from '@/pages/Order';
const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/kind',
    component: Kind
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/user',
    component: User
  }
  
]
class App extends Component {

  render () {
    return (
      <div className = "box">
        <Switch>
          {/* <Route path="/home" component = { Home } />
          <Route path="/kind" component = { Kind } />
          <Route path="/cart" component = { Cart } />
          <Route path="/user" component = { User } /> */}
          {
            routes.map((item, index) => {
              return (
                <Route key={ index } path={ item.path } component = { item.component }  />
              )
            })
          }
          <Redirect path="/" to="/home" />
        </Switch>
        {/* <footer className = "footer">
          <ul>
            <NavLink to = "/home">
              <img src="./footer.jpg" className="footerimg"/>
              <span>首页</span>
            </NavLink >
            <NavLink to = "/kind">
              <i className="iconfont icon-coffee"></i>
              <span>菜单</span>
              
            </NavLink >
            <NavLink to = "/order">
              <i className="iconfont icon-Order"></i>
              <span>订单</span>
            </NavLink >
            <NavLink to = "/cart">
              <i className="iconfont icon-icon"></i>
              <span> 购物车</span>
            </NavLink >
            <NavLink to = "/user">
              <i className="iconfont icon-home-copy-copy"></i>
              <span> 我的</span>
            </NavLink >
          </ul>
        </footer> */}
      </div>
    )
  }

}

export default App
