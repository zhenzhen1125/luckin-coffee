import axios from 'axios';
import baseUrl from '@/api';

const api = {
  requestData (idNum) {
    return new Promise((resolve,reject) =>{
      idNum*=1
      axios.get(baseUrl +'/products/detail?idNum='+idNum)
      .then(data =>{
        // console.log(data.data)
        resolve(data.data)
      })
      .catch(err=>{
        reject(err)
      })
    })
  },
  setStorageNum(key,str){
    if(localStorage.getItem(key)){
      str=JSON.parse(str)
      var flag=true;
      var arr=JSON.parse(localStorage.getItem(key))
      arr.map((item,index)=>{
        if(item.idNum==str.idNum){
          item.num=str.num*1+item.num*1
          flag=false
        }
      })
      if(flag){arr.push(str)}
      localStorage.setItem(key,JSON.stringify(arr))
  }else{
   var arr=[]
    str=JSON.parse(str);
    arr.push(str)
    localStorage.setItem(key,JSON.stringify(arr))
  }
  },
  getStorage(key,str) {
    var flag=false
    str=JSON.parse(str)
    if(localStorage.getItem(key)){
      var arr=JSON.parse(localStorage.getItem(key))
      arr.map((item,index)=>{
        // console.log(str)
        // console.log("stridNUM:"+str.idNum)
        if(item.idNum==str.idNum){flag=true}
      })
       return flag
    }
   
  },
  setStorage(key,str,flag){
    if(localStorage.getItem(key)){
    //  console.log(typeof(flag))
      str=JSON.parse(str)
      var arr=JSON.parse(localStorage.getItem(key))
      arr.map((item,index)=>{
        if(item.idNum==str.idNum){
          flag=!flag
        }
      })

     if(flag){
       arr.push(str)
      localStorage.setItem(key,JSON.stringify(arr))
     }
  }else{
   var arr=[]
    str=JSON.parse(str);
    arr.push(str)
    localStorage.setItem(key,JSON.stringify(arr))
  }
  }
}

export default api;