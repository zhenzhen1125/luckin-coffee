let express = require('express');

let sql=require("../tool/sql.js")

// let obj={
//   'sugar':[],
//   'sugar':["单糖","多糖"]
  
// }
// for(let i in obj){
//   tempsole.log(obj[i])
// }


sql.find("sh1811","products",{}).then((datal)=>{
for(let q=1;q<=datal.length;q++){
  let arr=[];
  let idNum=q;
  idNum*=1;
  console.log(idNum)
  sql.find("sh1811","products",{idNum}).then((data)=>{
       
      // tempsole.log(data[0].sugar)
       if(data[0].scale!=undefined&&data[0].scale!=null){
          scale=data[0].scale
          if(scale!=""){
          let scaleObj={"规格":scale}
          arr.push(scaleObj)
        }
      }
       if(data[0].temp!=undefined&&data[0].temp!=null){
        temp=data[0].temp;
         if(temp!=""){
           let tempObj={"温度":temp};  
           arr.push(tempObj)
        }
      }
       if(data[0].sugar!=undefined&&data[0].sugar!=null){
        sugar=data[0].sugar
       if(sugar!=""){
         let sugarObj={"糖":sugar};
        arr.push(sugarObj)
        }
      }
      if(data[0].milk!=undefined&&data[0].milk!=null){
        milk=data[0].milk
       if(milk!=""){
         let milkObj={"奶":milk};
        arr.push(milkObj)
        }
      }
      let choice="{"
      for(let i in arr){
        for(let k in arr[i])   
        choice+= `"${k}":"${arr[i][k]}",`
      }
      if(choice=="{"){choice="{}"}
      else{choice=choice.substr(0,choice.length-1)+"}"}
      sql.update('sh1811','products','updateOne',{idNum},{$set: {choice }}).then(()=>{
        console.log('hhhhhhhhhh')
        // tempsole.log(arr)
      }).catch(err=>{console.log(err)})
    })
}


// 
// sql.find("sh1811","products",{idNum}).then((data)=>{
//    let arr=[];
//   // tempsole.log(data[0].sugar)
//   let sugar=data[0].sugar
//   if(sugar!=""){let sugarObj={"sugar":sugar};
//   // tempsole.log(sugarObj);
//   // tempsole.log(typeof(sugarObj));
//   arr.push(sugarObj)
//   }
//    let sugar=data[0].sugar
//    if(sugar!=""){
//   let sugarObj={"sugar":sugar};
//    arr.push(sugarObj)
//    }
//    let temp=data[0].temp
//    if(temp!=""){
//   let tempObj={"temp":temp};
//    arr.push(tempObj)
//    }
//   let choice="{"
//   for(let i in arr){
//     for(let k in arr[i])   
//     choice+= `"${k}":"${arr[i][k]}",`
//   }
//   choice=choice.substr(0,choice.length-1)+"}"
//   tempsole.log(choice)


//   sql.update('sh1811','products','updateOne',{idNum},{$set: {choice }}).then(()=>{
//     tempsole.log('hhhhhhhhhh')
//   }).catch(err=>{tempsole.log(err)})
// })

// sql.find("sh1811","products",{idNum}).then((data)=>{
//   let choice=data[0].choice;//{"sugar":"无糖,半份糖,单份糖","sugar":""}
// //   // res.send(choice);


//   choice=JSON.parse(choice)//使choice变对象

//   for(let i in choice){
//     data.choice

//   }
  
//   let tit=[]
//   let items=[]
//   for(let i in choice){
//     if(choice[i]!=""){
//       tempsole.log(i)
//       tit.push(i)
//        items.push(choice[i].split(","))
//     }
//   }
// for(let j=0;j<tit.length;j++){
  
//   // <li><span>tit[j]</span>
//       for(let z=0;z<items[j].length;z++){
//        <i>items[j][z]</i>
//         }
      
//   // </li>
// }


//  let sugar=choice.sugar.split(",")//使sugar变数组
//  let sugar=choice.sugar
//  if(sugar==""){tempsole.log('kkkk')}
//  tempsole.log(sugar)
// for(let i=0;i<sugar.length;i++){
//   tempsole.log(sugar[i])
//  }
// })
})
