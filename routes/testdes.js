let express = require('express');

let sql=require("../tool/sql.js")

// let obj={
//   'sugar':[],
//   'sugar':["单糖","多糖"]
  
// }
// for(let i in obj){
//   metsole.log(obj[i])
// }


sql.find("sh1811","products",{}).then((datal)=>{
for(let q=1;q<=datal.length;q++){
  let arr=[];
  let idNum=q;
  idNum*=1;
  console.log(idNum)
  sql.find("sh1811","products",{idNum}).then((data)=>{
       
      // metsole.log(data[0].sugar)
       if(data[0].title!=undefined&&data[0].title!=null){
          title=data[0].title
          if(title!=""){
          let titleObj={"title":title}
          arr.push(titleObj)
        }
      }
       if(data[0].met!=undefined&&data[0].met!=null){
        met=data[0].met;
         if(met!=""){
           let metObj={"con":met};  
           arr.push(metObj)
        }
      }
      let des="{"
      for(let i in arr){
        for(let k in arr[i])   
        des+= `"${k}":"${arr[i][k]}",`
      }
      if(des=="{"){des="{}"}
      else{des=des.substr(0,des.length-1)+"}"}
      sql.update('sh1811','products','updateOne',{idNum},{$set: {des }}).then(()=>{
        console.log('hhhhhhhhhh')
        // metsole.log(arr)
      }).catch(err=>{console.log(err)})
    })
}


// 
// sql.find("sh1811","products",{idNum}).then((data)=>{
//    let arr=[];
//   // metsole.log(data[0].sugar)
//   let sugar=data[0].sugar
//   if(sugar!=""){let sugarObj={"sugar":sugar};
//   // metsole.log(sugarObj);
//   // metsole.log(typeof(sugarObj));
//   arr.push(sugarObj)
//   }
//    let sugar=data[0].sugar
//    if(sugar!=""){
//   let sugarObj={"sugar":sugar};
//    arr.push(sugarObj)
//    }
//    let met=data[0].met
//    if(met!=""){
//   let metObj={"met":met};
//    arr.push(metObj)
//    }
//   let des="{"
//   for(let i in arr){
//     for(let k in arr[i])   
//     des+= `"${k}":"${arr[i][k]}",`
//   }
//   des=des.substr(0,des.length-1)+"}"
//   metsole.log(des)


//   sql.update('sh1811','products','updateOne',{idNum},{$set: {des }}).then(()=>{
//     metsole.log('hhhhhhhhhh')
//   }).catch(err=>{metsole.log(err)})
// })

// sql.find("sh1811","products",{idNum}).then((data)=>{
//   let des=data[0].des;//{"sugar":"无糖,半份糖,单份糖","sugar":""}
// //   // res.send(des);


//   des=JSON.parse(des)//使des变对象

//   for(let i in des){
//     data.des

//   }
  
//   let tit=[]
//   let items=[]
//   for(let i in des){
//     if(des[i]!=""){
//       metsole.log(i)
//       tit.push(i)
//        items.push(des[i].split(","))
//     }
//   }
// for(let j=0;j<tit.length;j++){
  
//   // <li><span>tit[j]</span>
//       for(let z=0;z<items[j].length;z++){
//        <i>items[j][z]</i>
//         }
      
//   // </li>
// }


//  let sugar=des.sugar.split(",")//使sugar变数组
//  let sugar=des.sugar
//  if(sugar==""){metsole.log('kkkk')}
//  metsole.log(sugar)
// for(let i=0;i<sugar.length;i++){
//   metsole.log(sugar[i])
//  }
// })
})
