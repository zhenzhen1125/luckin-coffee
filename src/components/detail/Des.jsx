import React, { Component } from 'react';
import PropTypes from 'prop-types';
import baseUrl from '@/api/index'
class Com extends Component {
        constructor (props) {
        super(props);
        this.state={
        
         }
        }
   
   render () {
  
    
    if(this.props.desdata!==""){
    return (
        <div class="good">
         <h2>商品描述</h2>
          <div className="des">
            <p className="title">{this.props.desdata.title}</p>
            <p className="con">主要原料:{this.props.desdata.con}</p>
            <p>图片仅供参考，请以实物为准，建议送达后尽快饮用</p>
          </div>
        </div>
    )
   }else{return ""}
}
}
Com.propTypes = {
        desdata: PropTypes.array
      }

export default Com