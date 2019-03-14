import React, { Component } from 'react'
import '../../public/static/css/kind.scss'
import { Carousel } from 'antd-mobile'
// import { Link } from 'react-router-dom'
import api from '@/api/kind'
import Detail from '@/pages/Detail'
import Footer from '@/pages/Footer'

class Com extends Component {
  constructor(props){
    super(props)
    this.state = {
      kindlist:[],
      goodslist:[],
      show:true,
      idNum:'',
      top:'',
      actidx:0
    }
  }
  componentDidMount(){
    api.requestKind().then(data => {
      // console.log(data)
      this.setState({
        kindlist:data.data
      })
    })
    api.requestGoods().then(data => {
      // console.log(data.data)
      this.setState({
        goodslist:data.data
      })
    })
  }
  detail(idNum1){
    this.setState({
      idNum:idNum1,
      show:!this.state.show
    })
  }
  getMoney(msg){
    this.setState({
      show:msg
    })

  }
  click(idx){
    // var sco=document.getElementById("main-right");
    var tits=document.getElementsByClassName("itemtitle")
   
    var t=setInterval(function(){
    if(document.getElementById("main-right").scrollTop>tits[idx].offsetTop-174){
      document.getElementById("main-right").scrollTop-=15
      if(document.getElementById("main-right").scrollTop<=tits[idx].offsetTop-174)clearInterval(t)
    }if(document.getElementById("main-right").scrollTop<tits[idx].offsetTop-174){
      document.getElementById("main-right").scrollTop+=15
      if(document.getElementById("main-right").scrollTop>=tits[idx].offsetTop-174)clearInterval(t)
    }
    },6)
  }
  scroll1 () {
    var sco=document.getElementById("main-right"); 
    if(sco)sco.onscroll=function(){ 
       var ltits=document.getElementsByClassName("lefttitle");
      var tits=document.getElementsByClassName("itemtitle")
      for(var j=0;j<ltits.length;j++){
        ltits[j].className="lefttitle"
      }
     for(let i=0;i<tits.length;i++){
        if((sco.scrollTop+174)>=tits[i].offsetTop){
          if(i>=1){
          ltits[i-1].className="lefttitle"
           ltits[i].className="lefttitle leftactive";
           if(i+1<tits.length)ltits[i+1].className="lefttitle"
          }else{ ltits[i].className="lefttitle leftactive";}
        }
      }
    }

  }

  render () {
    var htmltop = "";
    htmltop = (
      <Carousel
      autoplay={ true }
      infinite
      dots = { true }
    >
          <img
            src="./kind2.png"
            alt="1"
            style={{ width: '100%', verticalAlign: 'top',height:"130px" }}
            onLoad={() => {
              window.dispatchEvent(new Event('resize'));
             }
            }
          />
          <img
            src="./kind1.png"
            alt="2"
            style={{ width: '100%', verticalAlign: 'top',height:"130px" }}
            onLoad={() => {
              window.dispatchEvent(new Event('resize'));
             }
            }
          />
    </Carousel>
    )
    var htmlleft = "";
    htmlleft = (
      <ul className="main-l">
        {
          this.state.kindlist.map((item,index) => {
            return (
            <li key={index} className="lefttitle" onClick={this.click.bind(this,index)}>
                {/* className={this.state.addClass?'add':'notadd'} onClick={this.isAdd.bind(this)} */}
              <a >{item}</a>
              {/* <a>{item}</a> */}
            </li>
            )
          })
        }
      </ul>
    )
    var htmlright = "";
    htmlright = (
      <div className="main-r" id="main-right">
        {this.scroll1.bind(this)()}
        {this.state.kindlist.map((item1,index1) =>{
            return (
              <ul>
                <div className="itemtitle" id={item1} name={item1}>
                  {item1}
                </div>
                {this.state.goodslist.map((item,index) => {
                  return (
                    // <Link to={item.state===0?'/kind':'/detail/'+item.idNum} key={item._id} className="li">
                    item.type === item1?(
                    <div className="list" onClick={item.state===0?"":this.detail.bind(this,item.idNum)} key={index+this.state.kindlist.length}>
                    <img src={`http://39.98.194.75:3000${item.pic}`} alt={item.proName}/>
                    <div className="list-r">
                      <div className={item.state===0?'list-r-t2':'list-r-t'}>
                        <p>{item.proName}</p>
                        <span className="span">{item.eName}</span>
                        {/* 为空时不显示 */}
                        <span className="span" style={{display:(item.def===null)?"none":"block"}}>默认：{item.def}</span>
                      </div>
                      <h3>￥{item.price}</h3>
                    </div>
                    <span className="button" style={{background:(item.state===0)?'#ccc9d6':'#80aad2'}} onClick = {this.addCart}>+</span>
                    {/* 售罄时添加遮罩层样式 */}
                    <div className={item.state===0?'zhao':''}></div>
                    <div className={item.state===0?'end':''} style={{display:(item.state===0)?"block":"none"}}>售罄</div> 
                  </div>
                    // </Link>
                    ):"")
              })}
              </ul>
            )
          })
        }
                  
            </div>
    )
    return (
      
      <div className="kindbox">
        <header className="kindheader">选择咖啡与小食</header>
        {htmltop}
        <div className = "kindcontent">
          <div className="main">
            {htmlleft}
            {htmlright}
          </div>
          <Footer/>
        </div>
        {this.state.show?"":<Detail idNum={this.state.idNum} payFn= { this.getMoney.bind(this) }/>}
      </div> 
    )
  }
}

export default Com
