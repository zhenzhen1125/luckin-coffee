import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Com extends Component {
        constructor (props) {
        super(props);
        this.state = {
          itms:[],
          bottomlist:[]
        }
        //  this.pay()
        }

componentDidMount(){
         var bottomlist=[];
        var len=document.getElementsByClassName("xuanzhong")
        // console.log(len)
        for(let j=0;j<len.length;j++)
        {
          bottomlist.push(len[j].innerHTML)
         this.setState({
            bottomlist
        })
        }
       
        // console.log(bottomlist)
        // console.log(this.state.bottomlist)
        
}

// pay () {
//   this.props.payFn(this.state.bottomlist)
// }

 change (index,e) {
        
        var ele=e.target.parentNode.children
        for(var i=0;i<ele.length;i++){
            ele[i].className=""    
        }
        e.target.className="xuanzhong"
        var activename=[];
        var len=document.getElementsByClassName("xuanzhong")
        // console.log(len)
        for(let j=0;j<len.length;j++)
        {
         activename.push(len[j].innerHTML)
        }
        this.setState({
            bottomlist:activename
        })

          
        // console.log(this.state.bottomlist)
        this.props.payFn(activename)
 }
 bottomlist (itmlist) {
         this.setState({
                 
         })

 }  
   
   render () {
           console.log(this.props.def)
           let htmlArr = [];
           let q=1;
        for(var i in this.props.choicedata){
        var itemlist=this.props.choicedata[i].split(',')
        let itms=[];
        
       var defs=this.props.def.split("/");
           itemlist.map((itm,idx)=>{
               var idxs=idx+q
          var flag=false
            defs.map((defx,ix)=>{  
                this.bottomlist.bind(this,defx);
                if(defx===itm){ 
                        flag=true;
                }
           })
                itms.push(<span className={flag ? 'xuanzhong' : ''} key= {idxs} onClick={this.change.bind(this,idxs)}>{ itm }</span>)
              
         })
       q+=9;
        htmlArr.push(
                <li >
                <i>{ i }</i>{itms}
                </li>
        )
        
        }
       
   
    return (
        <div>
        <ul className="choice">
        { htmlArr }
        </ul>
        </div>
    )
   
    }
}
Com.propTypes = {
        choice: PropTypes.array
      }

export default Com