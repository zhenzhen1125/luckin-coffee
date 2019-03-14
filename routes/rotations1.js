var express = require('express');
var router = express.Router();
var sql=require("./../tool/sql.js")
const fileMd=require("./../tool/file.js")
const xlsxfile="./rotations.xlsx"

/* GET users listing. */
router.get('/', function(req, res, next) {
  let {pageCode,pageNumber}=req.query;
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  sql.find("sh1811","rotations",{}).then((data)=>{
    sql.distinct("sh1811","rotations","group").then((groupArr)=>{
      let totalNumber=Math.ceil(data.length/pageNumber)
      data=data.splice((pageCode-1)*pageNumber,pageNumber)
      res.render('rotations',{
        activeIndex:5,
        routerType:"/rotations?",
        data,
        totalNumber,
        pageCode,
        pageNumber,
        groupArr,
      })
    })
  })
})

router.get('/group', function(req, res, next) {
  let {pageNumber,group,pageCode}=req.query
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  sql.find("sh1811","rotations",{group}).then((data)=>{
    sql.distinct("sh1811","rotations","state").then((stateArr)=>{
      let totalNumber=Math.ceil(data.length/pageNumber)
      data=data.splice((pageCode-1)*pageNumber,pageNumber)
      res.render('rotations_g',{
                activeIndex:5,
                routerType:"/rotations/group?group="+group+"&",
                data,
                totalNumber,
                pageCode,
                pageNumber,
                stateArr,
                group,
              })
            })
          })
        })

router.get('/group/state', function(req, res, next) {
  let {pageNumber,group,pageCode,state}=req.query
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  state*=1;
  sql.find("sh1811","rotations",{"group":eval(group),"state":eval(state)*1}).then((data)=>{
    sql.distinct("sh1811","rotations","state").then((stateArr)=>{
      let totalNumber=Math.ceil(data.length/pageNumber)
      data=data.splice((pageCode-1)*pageNumber,pageNumber)
      res.render('rotations_g',{
                activeIndex:5,
                routerType:"/rotations/group?group="+group+"&",
                data,
                totalNumber,
                pageCode,
                pageNumber,
                stateArr,
              })
            })
          })
        })


// router.get('/group', function(req, res, next) {
//   let {group,pageCode,pageNumber}=req.query;
//   pageCode=pageCode*1||1;//默认第一页
//   pageNumber=pageNumber*1||8;//默认显示8条
//   sql.find("sh1811","rotations",{group}).then((data)=>{
//     sql.distinct("sh1811","rotations","group").then((groupArr)=>{
//       let totalNumber=Math.ceil(data.length/pageNumber)
//       data=data.splice((pageCode-1)*pageNumber,pageNumber)
//       res.render('rotations',{
//         activeIndex:5,
//         routerType:"/rotations/group?group="+group+"&",
//         data,
//         totalNumber,
//         pageCode,
//         pageNumber,
//         groupArr,
//       })
//     })
//   })
// })




// router.get('/sort', function(req, res, next) {
//   let {type,num,pageCode,pageNumber}=req.query;
//   pageCode=pageCode*1||1;//默认第一页
//   pageNumber=pageNumber*1||8;//默认显示8条
//   num*=1
//   let sortData={}
//   sortData[type]=num
//   sql.sort("sh1811","rotations",sortData).then((data)=>{
//     sql.distinct("sh1811","rotations","group").then((groupArr)=>{
//       sql.distinct("sh1811","rotations","group").then((typeArr)=>{
//         sql.distinct("sh1811","rotations","people").then((peopleArr)=>{
//           let totalNumber=Math.ceil(data.length/pageNumber)
//           data=data.splice((pageCode-1)*pageNumber,pageNumber)
//           res.render('rotations',{
//             activeIndex:3,
//             routerType:"/rotations/sort?type="+type+"&&num="+num+"&",
//             data,
//             totalNumber,
//             pageCode,
//             pageNumber,
//             groupArr,
//             typeArr,
//             peopleArr
//           })
//         })
//       })
//     })
//   })
// })


router.get('/add', function(req, res, next) {
  let {pageNumber}=req.query
  res.render('rotations_add',{activeIndex:5,pageNumber});
});
router.post('/addAction', function(req, res, next) {
  console.log(req.body)
  var {group,idNum,pic,state,pageNumber}=req.body;
  sql.find("sh1811","rotations",{idNum}).then((data)=>{
    //如果查找不到则密码加密后添加到sql
      if(data.length==0){
        sql.insert("sh1811","rotations",{group,idNum,pic,state}).then(()=>{
          res.redirect('/rotations?pageNumber='+pageNumber)
        }).catch((err)=>{
          res.redirect('/rotations/add')
        })
        
      }
      //如果已经存在则跳回主界面
        else{res.redirect('/rotations/add')}
  }).catch((err)=>{
    if(err)throw err
    res.redirect('/rotations/add')
  })
});

// function analysisdata(){
//   return new Promise((resolve,reject)=>{
//     let obj=xlsx.parse(xlsxfile)
   
//     resolve(obj)
//   })
// }
// function filterData(data){
//   var arr=[]
//   data.map((item,index)=>{
//     if(index!=0){
//       arr.push({
//         tel:item[0],
//         nickname:item[1],
//         password:item[2]
//       })
//     }
//   })
  //console.log(arr)
//   return arr;
// }
router.get('/import',function(req,res,next){
  fileMd.analysisdata(xlsxfile).then((obj)=>{
      let data=obj[0].data
      data=fileMd.filterRota(data)
      // res.send(data)
       sql.insert("sh1811","rotations",data).then(()=>{
        res.redirect('/rotations')
       })
  })
})
router.get('/exportUsers',function(req,res,next){
  const _headers=[
    {caption:'group',type:'string'},
    {caption:'idNum',type:'string'},
    {caption:'price',type:'string'},
    {caption:'sale',type:'string'},
    {caption:'group',type:'string'},
    {caption:'people',type:'string'},
    {caption:'pic',type:'string'},
    {caption:'state',type:'string'},
  ]
  sql.find("sh1811",'rotations',{}).then(data=>{
    let alldata=new Array()
    data.map((item,index)=>{
      let arr=[]
      arr.push(item.group);
      arr.push(item.idNum);
      arr.push(item.price);
      arr.push(item.sale);
      arr.push(item.group);
      arr.push(item.people);
      arr.push(item.pic);
      arr.push(item.state);
      alldata.push(arr)
    })
    const result=fileMd.exportdata(_headers,alldata);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
				res.setHeader("Content-Disposition", "attachment; filename=" + "rotations.xlsx");
				res.end(result, 'binary');
  })
})

router.get('/removeAll',function(req,res,next){
  var {pageNumber}=req.query
  sql.remove("sh1811","rotations",{}).then(()=>{  
    res.redirect('/rotations?pageNumber='+pageNumber)
  }).catch((err)=>{
    console.log(err)
  })
})

router.post('/updateAction',function(req,res,next){
  console.log(req.body)
  var {idNum,state,pic,pageCode,pageNumber}=req.body

  state*=1;
  sql.update("sh1811","rotations",'updateOne',{idNum},{$set: { state,pic}}).then(()=>{
    console.log("update success")
    res.redirect('/rotations?pageCode='+pageCode+"&pageNumber="+pageNumber)
  }).catch((err)=>{
    console.log(err)
    res.redirect('/rotations')
  })
})

router.get('/remove',function(req,res,next){
  var {idNum,pageCode,pageNumber}=req.query
  
  sql.remove("sh1811","rotations",{idNum}).then(()=>{
    res.redirect('/rotations?pageCode='+pageCode+"&pageNumber="+pageNumber)
  }).catch((err)=>{
    console.log(err)
  })
})

router.get('/removeAll',function(req,res,next){
  var {pageNumber}=req.query
  sql.remove("sh1811","rotations",{}).then(()=>{
  
    res.redirect('/rotations?pageNumber='+pageNumber)
  }).catch((err)=>{
    console.log(err)
  })
})
router.get('/search', function(req, res, next) {
  let {pageCode,pageNumber,idNum}=req.query;
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  sql.find("sh1811","rotations",{"idNum":eval('/'+idNum+'/')}).then((data)=>{
    sql.distinct("sh1811","rotations","group").then((groupArr)=>{
            let totalNumber=Math.ceil(data.length/pageNumber)
            data=data.splice((pageCode-1)*pageNumber,pageNumber)
            res.render('rotations',{
              activeIndex:5,
              routerType:"/rotations",
              data,
              totalNumber,
              pageCode,
              pageNumber,
              groupArr,
            })
          })
        })  
      })


module.exports = router;
