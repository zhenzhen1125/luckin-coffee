import React, { Component } from 'react'
import api from "@/api/home"
import '../../public/static/css/home.scss';
import { Carousel } from 'antd-mobile';
import mag from '../../public/static/img/home1.png';
import coffee from '../../public/static/img/home2.jpg';
import wallet from '../../public/static/img/home3.jpg';
import send from '../../public/static/img/home4.jpg';
import account from '../../public/static/img/home5.jpg';
import { Link } from 'react-router-dom';
import Footer from '@/pages/Footer';

class Com extends Component {

  constructor (props) {
    super(props);
    this.state = {
      list: [],
      bannerdata: [],
      // imgHeight: 150
    }
  }

  componentDidMount () {
    api.requestBannerData().then(data => {
      // console.log(data.data)
      this.setState({
        bannerdata: data.data
      })
    })
  }

  render () {
    return (
      <div className="box">
    <div className = "content">
      <Carousel
            autoplay={ true }
            infinite={true}
            dots = { true }
          >
            {this.state.bannerdata.map((item, index) => (
              <a
                key={index}
                href="http://www.alipay.com"
                style={{ display: 'inline-block', width: '100%' }}
              >
                <img
                  src={`http://39.98.194.75:3000${item.pic}`}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top',height:"250px" }}
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                    // this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
          </Carousel>
       <div id="main1">
        <ul>
          <li>
            <div className="main-left">
              <h4>智慧七立方店</h4>
              <span>距离49m</span>
            </div>
            <div className="main-right">
              <p className="one">
                <span className="before">自提</span>
                <span className="bef">外送</span>
              </p>
            </div>
          </li>
          {/* <li> */}
          <Link to = "/kind" className="menu">
            <div className="main-left">
              <h4>现在下单</h4>
              <span>ORDER NOW</span>
            </div>
            <div className="main-right">
              <p>
             <img className="coffee" src={coffee} alt=''/>
              </p>
            </div>
          {/* </li> */}
          </Link > 
          <li>
            <div className="main-left">
              <h4>咖啡钱包<i>充2赠1</i></h4>
              <span>COFFEE WALLET</span>
            </div>
            <div className="main-right">
              <p>
              <img className="wallet" src={wallet} alt=''/>
              </p>
            </div>
          </li>
          <li>
            <div className="main-left">
              <h4>送Ta咖啡</h4>
              <span>SEND COFFEE</span>
            </div>
            <div className="main-right">
              <p>
              <img className="send" src={send} alt=''/>
              </p>
            </div>
          </li>
          <li>
            <div className="main-left">
              <h4>企业账户</h4>
              <span>ENTERPRISE ACCOUNT</span>
            </div>
            <div className="main-right">
              <p>
              <img className="account" src={account} alt=''/>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="magi">
        <img src={mag } alt=''/>
      </div>
  </div>
  <Footer/>
  </div>
    )
  }

}

export default Com
