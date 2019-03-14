import React, { Component } from 'react';
import PropTypes from 'prop-types';
import baseUrl from '@/api/index'
class Com extends Component {
        constructor (props) {
        super(props);
        this.state={
           data:this.props.saydata
         }
        }
   
   render () {
    if(this.props.saydata!==""){
    return (
        <div class="say">
         <h2>大咖说</h2>
          <i><img src={"http://39.98.194.75:3000"+this.props.saydata.avator+""} alt=""/></i>
          <div className="des">
               {/* {console.log(this.props.saydata)}  */}
            <h4>{this.props.saydata.author}</h4>
            <p>{this.props.saydata.con}</p>
          </div>
        </div>
    )
   }else{return ""}
}
}
Com.propTypes = {
        saydata: PropTypes.array
      }

export default Com