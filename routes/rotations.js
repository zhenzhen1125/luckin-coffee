var express = require('express');
var router = express.Router();
var sql=require("../tool/sql.js")
const fileMd=require("../tool/file.js")
const xlsxfile="./luckinrotations.xlsx"
var fs=require('fs')
var multer = require('multer');
var upload = multer({dest: './public/images'})
var db="sh1811";
var collection="rotations"
/* GET users listing. */
router.get('/', function(req, res, next) {
  let {pageCode,pageNumber}=req.query;
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  sql.find(db,collection,{}).then((data)=>{
          let totalNumber=Math.ceil(data.length/pageNumber)
          data=data.splice((pageCode-1)*pageNumber,pageNumber)
          res.render('rotations',{
            activeIndex:6,
            routerType:"/rotations?",
            data,
            totalNumber,
            pageCode,
            pageNumber,
      })
    })
  })


router.post('/upload', upload.single('smallpic'), function (req,res,next) {
  console.log(req.file)
 
  var {idNum,pageCode,pageNumber}=req.body
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  const {originalname,filename} = req.file;
  // const {username} =req.body
  const arr = originalname.split('.');

  const type = arr[arr.length-1];
  const realFileName='/'+arr[arr.length-2] + '.' +type;
  const oldName = './public/images/' +filename;
  const newName = './public/images/' + realFileName;
  fs.rename(oldName,newName,(err)=>{
    if(err) throw err;
    var pic = '/images/'+realFileName
    console.log(pic)
    console.log(idNum)
    // var pic = 456
    sql.update('sh1811','rotations','updateOne',{idNum},{$set: { pic }}).then(()=>{ 
            res.redirect('/rotations?pageNumber='+pageNumber+'&'+'pageCode='+pageCode)
          }).catch((err)=>{
           console.log(err)
          })         
    })
  })











router.get('/add', function(req, res, next) {
  let {pageNumber}=req.query
  res.render('rotations_add',{activeIndex:6,pageNumber});
});


router.post('/addAction', function(req, res, next) {
  console.log(req.body)
  var {idNum,pageNumber}=req.body;

  sql.find(db,collection,{idNum}).then((data)=>{
    //如果查找不到则密码加密后添加到sql
      if(data.length==0){
        sql.insert(db,collection,{idNum}).then(()=>{
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
      data=fileMd.filterrotations(data)
      // res.send(data)
       sql.insert(db,collection,data).then(()=>{
        res.redirect('/rotations')
       })
  })
})
router.get('/exportUsers',function(req,res,next){
  const _headers=[
    {caption:'idNum',type:'string'},
    {caption:'pic',type:'string'},
  ]
  sql.find(db,'rotations',{}).then(data=>{
    let alldata=new Array()
    data.map((item,index)=>{
      let arr=[]
      arr.push(item.idNum);
      arr.push(item.pic);
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
  sql.remove(db,collection,{}).then(()=>{  
    res.redirect('/rotations?pageNumber='+pageNumber)
  }).catch((err)=>{
    console.log(err)
  })
})

// router.post('/updateAction',function(req,res,next){
//   console.log(req.body)
//   var {idNum,pageCode,pageNumber}=req.body
//   sql.update(db,collection,'updateOne',{idNum},{$set: { price,type,scale,def,state}}).then(()=>{
//     console.log("update success")
//     res.redirect('/rotations?pageCode='+pageCode+"&pageNumber="+pageNumber)
//   }).catch((err)=>{
//     console.log(err)
//     res.redirect('/rotations')
//   })
// })

router.get('/remove',function(req,res,next){
  var {idNum,pageCode,pageNumber}=req.query

  sql.remove(db,collection,{idNum}).then(()=>{
    res.redirect('/rotations?pageCode='+pageCode+"&pageNumber="+pageNumber)
  }).catch((err)=>{
    console.log(err)
  })
})

router.get('/removeAll',function(req,res,next){
  var {pageNumber}=req.query
  sql.remove(db,collection,{}).then(()=>{
  
    res.redirect('/rotations?pageNumber='+pageNumber)
  }).catch((err)=>{
    console.log(err)
  })
})
router.get('/search', function(req, res, next) {
  let {pageCode,pageNumber,title}=req.query;
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  sql.find(db,collection,{"title":eval('/'+title+'/')}).then((data)=>{
    sql.distinct(db,collection,"brand").then((brandArr)=>{
      sql.distinct(db,collection,"watchType").then((typeArr)=>{
        sql.distinct(db,collection,"people").then((peopleArr)=>{
            let totalNumber=Math.ceil(data.length/pageNumber)
            data=data.splice((pageCode-1)*pageNumber,pageNumber)
            res.render('rotations',{
              activeIndex:6,
              routerType:"/rotations",
              data,
              totalNumber,
              pageCode,
              pageNumber,
              brandArr,
              typeArr,
              peopleArr
            })
          })
        })  
      })
    })
  });


module.exports = router;
