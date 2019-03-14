import React,{ Component } from 'react';
import api from '@/api/detail'
import Say from '@/components/detail/Say'
import Choice from '@/components/detail/Choice'
import Des from '@/components/detail/Des'
// import baseUrl from '@/api/index'
import '../../public/static/css/detailStyle.scss';
// import Item from 'antd/lib/list/Item';
import { Toast } from 'antd-mobile';

class Com extends Component {
  constructor (props) {
    super(props);
    this.state ={
      choice:[],
      list:[],
      saydata:[],
      desdata:[],
      sugar:"",
      milk:"",
      defdata:[],
      num:1 ,
      loveclass:"iconfont icon-xinaixin",
    }
  }

  componentDidMount () {
    let idNum = this.props.idNum;
    console.log(idNum)
    api.requestData(idNum).then(data => {
      // console.log(data)
      var choicedata=JSON.parse(data.data[0].choice)
      var says=JSON.parse(data.data[0].say)
      var des=JSON.parse(data.data[0].des)
      if(data.data[0].def){var defs=data.data[0].def.split("/")}
      else {defs=""}
      this.setState({
        choice:choicedata,
        list:data.data[0],
        saydata:says,
        desdata:des,
        defdata:defs,
      })
     
    })
  var str2=`{"idNum":"${idNum}"}`;
        console.log(str2)
        if(api.getStorage("love",str2)){
        this.state.loveclass="iconfont icon-xinaixin lovexuan"
        }
    } 
  

  getMoney (msg) {
  //  console.log(msg)
   this.setState({
     defdata:msg
   })
  }
  addFn(){
    this.setState({
      num:this.state.num+1
    })
  }
  subFn(){
    var num1=this.state.num;
    num1=num1===1?1:num1-1
    this.setState({
      num:num1
    })
  }
  love(){
    this.setState({
     loveclass: this.state.loveclass==="iconfont icon-xinaixin"?"iconfont icon-xinaixin lovexuan":"iconfont icon-xinaixin"
    })
    var str=`{"idNum":"${this.state.list.idNum}"}`;
    if(this.state.loveclass==="iconfont icon-xinaixin lovexuan"){api.setStorage("love",str,true)}else{api.setStorage("love",str,true)}
  }

  getData () {
    var str=`{"idNum":"${this.state.list.idNum}","price":"${this.state.list.price}","def":"${this.state.defdata}","num":"${this.state.num}","title":"${this.state.list.proName}"}`
    api.setStorageNum("cart",str)
    // this.props.history.push('/kind')
    this.props.payFn(true)
    console.log("cart")

    // document.getElementsByClassName("detailbox")[0].style.display='none'
 
      Toast.info('添加购物车成功', 1);

}

  render () {
    
    var str=""
  // console.log(this.state.defdata)
    // console.log(arr)}
    var arr=this.state.defdata?this.state.defdata:[]
    if( arr.length!=0){
      arr.map((item,index)=>{
        if(item.indexOf("糖")!==-1){
          str+="+"+item
        }else if(item.indexOf("奶")!==-1){
          str+="+"+item
        }
      })
    }
    var html=""
    if(this.state.list.length===0){
     html=(
      <div className="loadings">
          <div className="circle"></div>
          <p>loading</p>
      </div>
     )
    }else{
    html= (
    
      <div className = "detailbox">
        <header className = "header1"><img src={"http://39.98.194.75:3000"+this.state.list.bigpic} alt=""/></header>
        <div className = "content">

        {this.state.choice['规格']!=undefined? <Choice choicedata={this.state.choice} def={this.state.list.def} payFn = { this.getMoney.bind(this)  }/>:null}  
          {this.state.saydata['con']!=undefined?<Say saydata={this.state.saydata}  />:null}  
          {this.state.desdata['title']!=undefined?<Des desdata={this.state.desdata} /> :null}             
        </div>
        <footer className="detailfooter">
            <div className="price">
              <div className="left">
                <div className="left-top">￥{this.state.list.price}</div>
                <div className="left-bottom">{this.state.list.proName}￥{this.state.list.price}{str}</div>
              </div>
              <div className="num">
                <span className="sub" onClick={this.subFn.bind(this)}>-</span><i >{this.state.num}</i><span className="add" onClick={this.addFn.bind(this)}>+</span>
              </div>
            </div>
            <div className="buy"> 
              <span onClick={this.getData.bind(this)} className="addCart"><i className="iconfont icon-icon"></i>加入购物车</span>
              <span onClick={this.love.bind(this)} className="love"><i className={this.state.loveclass}></i>收藏口味</span>
    
          </div>
        </footer>
      </div>
    
    )
  }
  return (<div className="detaillayout">{html}</div>)
}
}

export default Com
