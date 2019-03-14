import React, { Component } from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import '../../public/static/css/order.scss';
// import orderimg from '../../public/img/order2.jpg';
import { NavLink } from 'react-router-dom';
import Footer from "@/pages/Footer"

class Com extends Component {


  render() {
    const tabs = [
      { title: '全部' },
      { title: '未完成' },
      { title: '已完成' },
    ];
    
    
   
    
    return (
			<div className="content">
      <div className="ordercontent">
			
        <header className="header orderheader">订单列表</header>
    
    <div style={{ height: 550, }}>
      <Tabs tabs={tabs}
        initalPage={'t2'}
      >
        <div style={{ display: 'flex', flexDirection:"column", alignItems: 'center', justifyContent: 'center', height: '480px', backgroundColor: '#f3f3f3' }}>
        <ul className="order ordermx">
			<li>
				<div className="main-top pd-r flex">
					<p className="color">自提订单： 32274626890144</p>
					<p className="color">已完成</p>
				</div>
				<p className="bd-b"></p>
				<div className="main-bottom pd-r">
					<div className="main-b-title flex">
						<h4>智慧七立方 (NO.1033)</h4>
						<span className="color">2018-12-05 13:33</span>
					</div>
					<p>拿铁等 共1件商品</p>
					<div className="main-b-money flex">
						<span>￥24</span>
						<button>再来一单</button>
					</div>
				</div>
			</li>
			<li>
				<div className="main-top pd-r flex">
					<p className="color">自提订单： 32274626890144</p>
					<p className="color">已完成</p>
				</div>
				<p className="bd-b"></p>
				<div className="main-bottom pd-r">
					<div className="main-b-title flex">
						<h4>智慧七立方 (NO.1033)</h4>
						<span className="color">2018-12-05 13:33</span>
					</div>
					<p>卡布奇诺等 共1件商品</p>
					<div className="main-b-money flex">
						<span>￥24</span>
						<button>再来一单</button>
					</div>
				</div>
			</li>
			
			</ul>
			<p className="order-bo">已经全部加载完成</p>
			
		
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '490px', backgroundColor: '#f3f3f3' }}>
         <div id="order-content2">
				 <img className="orderimg" src='./order2.jpg' alt=''/>
				 <p>您还没有订单哦</p>
				 <NavLink to = "/kind"> <button>去喝一杯</button></NavLink>
				 </div>




        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#f3f3f3' }}>
        <ul className="order order2">
			<li>
				<div className="main-top pd-r flex">
					<p className="color">自提订单： 32274626890144</p>
					<p className="color">已完成</p>
				</div>
				<p className="bd-b"></p>
				<div className="main-bottom pd-r">
					<div className="main-b-title flex">
						<h4>智慧七立方 (NO.1033)</h4>
						<span className="color">2018-12-05 13:33</span>
					</div>
					<p>拿铁等 共1件商品</p>
					<div className="main-b-money flex">
						<span>￥24</span>
						<button>再来一单</button>
					</div>
				</div>
			</li>
			<li>
				<div className="main-top pd-r flex">
					<p className="color">自提订单： 32274626890144</p>
					<p className="color">已完成</p>
				</div>
				<p className="bd-b"></p>
				<div className="main-bottom pd-r">
					<div className="main-b-title flex">
						<h4>智慧七立方 (NO.1033)</h4>
						<span className="color">2018-12-05 13:33</span>
					</div>
					<p>卡布奇诺等 共1件商品</p>
					<div className="main-b-money flex">
						<span>￥24</span>
						<button>再来一单</button>
					</div>
				</div>
			</li>
		
			
		</ul>
	
        </div>
      </Tabs>
    </div>
		<Footer/>
  </div>
	</div>
   


     
    )
  }

}

export default Com