var express = require('express');

var sql=require("./../tool/sql.js")

// var obj={
//   'sugar':[],
//   'milk':["单糖","多糖"]
  
// }
// for(var i in obj){
//   console.log(obj[i])
// }

sql.find("sh1811","products",{}).then((datal)=>{
  console.log(datal.length)
})

var idNum='001'
sql.find("sh1811","products",{idNum}).then((data)=>{
   var arr=[];
  // console.log(data[0].sugar)
  var sugar=data[0].sugar
  if(sugar!=""){var sugarObj={"sugar":sugar};
  // console.log(sugarObj);
  // console.log(typeof(sugarObj));
  arr.push(sugarObj)
  }
   var milk=data[0].milk
   if(milk!=""){
  var milkObj={"milk":milk};
   arr.push(milkObj)
   }
   var temp=data[0].temp
   if(temp!=""){
  var tempObj={"temp":temp};
   arr.push(tempObj)
   }
  var choice="{"
  for(var i in arr){
    for(var k in arr[i])   
    choice+= `"${k}":"${arr[i][k]}",`
  }
  choice=choice.substr(0,choice.length-1)+"}"
  console.log(choice)


  sql.update('sh1811','products','updateOne',{idNum},{$set: {choice }}).then(()=>{
    console.log('hhhhhhhhhh')
  }).catch(err=>{console.log(err)})
})

// sql.find("sh1811","products",{idNum}).then((data)=>{
//   var choice=data[0].choice;//{"sugar":"无糖,半份糖,单份糖","milk":""}
// //   // res.send(choice);


//   choice=JSON.parse(choice)//使choice变对象

//   for(var i in choice){
//     data.choice

//   }
  
//   var tit=[]
//   var items=[]
//   for(var i in choice){
//     if(choice[i]!=""){
//       console.log(i)
//       tit.push(i)
//        items.push(choice[i].split(","))
//     }
//   }
// for(var j=0;j<tit.length;j++){
  
//   // <li><span>tit[j]</span>
//       for(var z=0;z<items[j].length;z++){
//        <i>items[j][z]</i>
//         }
      
//   // </li>
// }


//  var sugar=choice.sugar.split(",")//使sugar变数组
//  var milk=choice.milk
//  if(milk==""){console.log('kkkk')}
//  console.log(milk)
// for(var i=0;i<sugar.length;i++){
//   console.log(sugar[i])
//  }
// })

