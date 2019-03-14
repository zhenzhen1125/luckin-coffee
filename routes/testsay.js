let express = require('express');

let sql=require("../tool/sql.js")

// let obj={
//   'ava':[],
//   'milk':["单糖","多糖"]
  
// }
// for(let i in obj){
//   console.log(obj[i])
// }


sql.find("sh1811","products",{}).then((datal)=>{
for(let q=1;q<=datal.length;q++){
  let arr=[];
  let idNum=q;
  idNum*=1;
  console.log(idNum)
  sql.find("sh1811","products",{idNum}).then((data)=>{
       
      // console.log(data[0].ava)
       if(data[0].author!=undefined&&data[0].author!=null){
          author=data[0].author
          if(author!=""){
          let authorObj={"author":author}
          arr.push(authorObj)
        }
      }
       if(data[0].con!=undefined&&data[0].con!=null){
        con=data[0].con;
         if(con!=""){
           let conObj={"con":con};  
           arr.push(conObj)
        }
      }
       if(data[0].ava!=undefined&&data[0].ava!=null){
        ava=data[0].ava
       if(ava!=""){
         let avaObj={"avator":ava};
        arr.push(avaObj)
        }
      }
      let say="{"
      for(let i in arr){
        for(let k in arr[i])   
        say+= `"${k}":"${arr[i][k]}",`
      }
      if(say=="{"){say="{}"}
      else{say=say.substr(0,say.length-1)+"}"}
      sql.update('sh1811','products','updateOne',{idNum},{$set: {say }}).then(()=>{
        console.log('hhhhhhhhhh')
        // console.log(arr)
      }).catch(err=>{console.log(err)})
    })
}


// 
// sql.find("sh1811","products",{idNum}).then((data)=>{
//    let arr=[];
//   // console.log(data[0].ava)
//   let ava=data[0].ava
//   if(ava!=""){let avaObj={"ava":ava};
//   // console.log(avaObj);
//   // console.log(typeof(avaObj));
//   arr.push(avaObj)
//   }
//    let milk=data[0].milk
//    if(milk!=""){
//   let milkObj={"milk":milk};
//    arr.push(milkObj)
//    }
//    let con=data[0].con
//    if(con!=""){
//   let conObj={"con":con};
//    arr.push(conObj)
//    }
//   let say="{"
//   for(let i in arr){
//     for(let k in arr[i])   
//     say+= `"${k}":"${arr[i][k]}",`
//   }
//   say=say.substr(0,say.length-1)+"}"
//   console.log(say)


//   sql.update('sh1811','products','updateOne',{idNum},{$set: {say }}).then(()=>{
//     console.log('hhhhhhhhhh')
//   }).catch(err=>{console.log(err)})
// })

// sql.find("sh1811","products",{idNum}).then((data)=>{
//   let say=data[0].say;//{"ava":"无糖,半份糖,单份糖","milk":""}
// //   // res.send(say);


//   say=JSON.parse(say)//使say变对象

//   for(let i in say){
//     data.say

//   }
  
//   let tit=[]
//   let items=[]
//   for(let i in say){
//     if(say[i]!=""){
//       console.log(i)
//       tit.push(i)
//        items.push(say[i].split(","))
//     }
//   }
// for(let j=0;j<tit.length;j++){
  
//   // <li><span>tit[j]</span>
//       for(let z=0;z<items[j].length;z++){
//        <i>items[j][z]</i>
//         }
      
//   // </li>
// }


//  let ava=say.ava.split(",")//使ava变数组
//  let milk=say.milk
//  if(milk==""){console.log('kkkk')}
//  console.log(milk)
// for(let i=0;i<ava.length;i++){
//   console.log(ava[i])
//  }
// })
})
