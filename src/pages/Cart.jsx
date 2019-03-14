import React, { Component } from 'react'
import '../../public/static/css/cart.scss'
import { Checkbox, Toast } from 'antd-mobile';
import Footer from '@/pages/Footer';
import {NavLink} from 'react-router-dom';
// const alert = Modal.alert;
const CheckboxItem = Checkbox.CheckboxItem;
class Com extends Component {
  constructor(props){
    super(props)
    this.state = {
      value:'1',
      arr:[],
      totalPrice:0,
      ischecked:false,
    }
  }
   //拿数据
  componentWillMount(){
    this.setState({
        arr:JSON.parse(localStorage.getItem('cart'))
    })
  }
  componentDidMount(){
    // console.log(this.state.arr)
    this.setState({
      arr:this.state.arr
    })
  }
  //计算总价
  SumPrice=()=>{
    var sum=0
    this.state.arr.map((ele,index)=>{
      if(ele.checked === true){
        sum+=ele.num*ele.price
      }
    })
    this.setState({
        totalPrice:sum
    })
 }
  //获取单选框的值
  getCheckedChange=(e,i)=>{
    // console.log(e.target.checked)
    // 文本框的值 e.target.value 需要赋值给 json 数据的下标为index
    this.setState({
        arr:this.state.arr.map((ele,index)=>{
            if(ele.idNum===i){
                ele.checked=e.target.checked 
                return ele
            }else {
                return ele
            }
        })
    })
    this.SumPrice()
}
//获取输入框的值
handInputChange=(e,i)=>{
  e.preventDefault();
  // console.log(e.target.value)
  //文本框的值 e.target.value 需要赋值给 json 数据的下标为index
  this.setState({
      arr:this.state.arr.map((ele,index)=>{
          if(ele.idNum===i){
              ele.num=e.target.value
              return ele
          }else {
              return ele
          }
      })
  })
  this.SumPrice()
}   
//add 加
add=(e,i)=>{
  e.preventDefault();
  // console.log(e.target.value)
  //文本框的值 e.target.value 需要赋值给 数据的下标为index
  this.setState({
      arr:this.state.arr.map((ele,index)=>{
          if(ele.idNum===i){
              ele.num=ele.num*1+1
              return ele
          }else {
              return ele
          }
      })
  })
  this.SumPrice()
}
//减
jian=(n)=> {
  // console.log(this.state.arr[n]);
  if(this.state.arr[n].num<=1){
    this.state.arr.splice(n,1);
    // console.log(this.state.totalPrice)
    localStorage.setItem("cart",JSON.stringify(this.state.arr));
    Toast.info('删除成功', 1);
  }else{
    this.state.arr[n].num = this.state.arr[n].num*1-1
  }
 
  this.SumPrice()
} 

jiesuan(){
  // console.log("bbb",localStorage.getItem("user"))
  if(localStorage.getItem("user")==null){
    // console.log("aaa",this)
    this.props.history.push("/userapp/login");
  }
}
  render () {

    let htmlArr = [];
    if(this.state.arr.length===0){
        htmlArr = <li className="nullcart">
          <img className="orderimg" src='./order2.jpg' alt=''/>
          <p>您的购物车有点寂寞</p>
				  <NavLink to = "/kind"> <button>去喝一杯</button></NavLink>
        </li>   
    }else{
      this.state.arr.map((item,index) => {
        htmlArr.push(         
          <li key={item.idNum}>
            <CheckboxItem onChange={(e)=>{this.getCheckedChange(e,item.idNum)}}></CheckboxItem>
            <div className="goods">
              <div className="goods-l">
                <h3>{item.title}</h3>
                <p>{item.def.split(",").join("/")}</p>
                <span>仅限打包带走</span>
              </div>
              <div className="goods-r">
                <span>￥{item.price}</span>
                <span className="jian" type="text" onClick={(e)=>{this.jian(index)}}>-</span>
                <input className="tex" type="text" value={item.num} onChange = {(e)=>{this.handInputChange(e,item.idNum)}}/>
                <span className="jia" type="text" onClick={(e)=>{this.add(e,item.idNum)}}>+</span>
              </div>
            </div>
          </li>
        )
      })
    }

    return (
     
      <div className = "content cartbox">
        <header className="header cartheader">购物车</header>
        <div className = "cartcontent">
            <img src="./cart1.png" alt="" style={{display:this.state.arr.length===0?"none":"block"}}/>
            <ul>
              {
                htmlArr
              }
            </ul>
        </div>
        <div className={this.state.arr.length===0?"price1":"price"}>
          <div className="total">
            <span>应付合计</span><span>￥{this.state.totalPrice}</span>
          </div>
          <p className="pay" onClick={this.jiesuan.bind(this)}>去结算</p>
        </div>
        <Footer/>
      </div>
    )
  }

}

export default Com
