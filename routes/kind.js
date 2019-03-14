var express = require('express');
var router = express.Router();
var sql=require("../tool/sql.js")
const fileMd=require("../tool/file.js")
const xlsxfile="./luckinkind.xlsx"
var fs=require('fs')
var multer = require('multer');
var upload = multer({dest: './public/images'})
var db="sh1811";
var collection="kind"
/* GET users listing. */
router.get('/', function(req, res, next) {
  let {pageCode,pageNumber}=req.query;
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  sql.find(db,collection,{}).then((data)=>{
     sql.distinct(db,collection,"type").then((typeArr)=>{
          let totalNumber=Math.ceil(data.length/pageNumber)
          data=data.splice((pageCode-1)*pageNumber,pageNumber)
          res.render('kind',{
            activeIndex:6,
            routerType:"/kind?",
            data,
            totalNumber,
            pageCode,
            pageNumber,
            typeArr
      })
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
    sql.update('sh1811','kind','updateOne',{idNum},{$set: { pic }}).then(()=>{ 
          console.log(333333)
            res.redirect('/kind?pageNumber='+pageNumber+'&'+'pageCode='+pageCode)
          }).catch((err)=>{
           console.log(err)
          })         
    })
  })



router.get('/type', function(req, res, next) {
  let {type,pageCode,pageNumber}=req.query;
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  sql.find(db,collection,{type}).then((data)=>{
      sql.distinct(db,collection,"type").then((typeArr)=>{
          let totalNumber=Math.ceil(data.length/pageNumber)
          data=data.splice((pageCode-1)*pageNumber,pageNumber)
          res.render('kind',{
            activeIndex:6,
            routerType:"/kind/type?type="+type+"&",
            data,
            totalNumber,
            pageCode,
            pageNumber,
            typeArr,
          })
        })
      })
    })







router.get('/add', function(req, res, next) {
  let {pageNumber}=req.query
  res.render('kind_add',{activeIndex:6,pageNumber});
});
router.get('/uploadpic', function(req, res, next) {
  let {idNum,pageNumber}=req.query
  res.render('kind_addIMG',{activeIndex:6,pageNumber,idNum});
});

router.post('/addAction', function(req, res, next) {
  console.log(req.body)
  var {idNum,proName,eName,price,type,def,state,pageNumber}=req.body;

  sql.find(db,collection,{idNum}).then((data)=>{
    //如果查找不到则密码加密后添加到sql
      if(data.length==0){
        sql.insert(db,collection,{idNum,proName,eName,price,type,state,def}).then(()=>{
          res.redirect('/kind?pageNumber='+pageNumber)
        }).catch((err)=>{
          res.redirect('/kind/add')
        })
        
      }
      //如果已经存在则跳回主界面
        else{res.redirect('/kind/add')}
  }).catch((err)=>{
    if(err)throw err
    res.redirect('/kind/add')
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
      data=fileMd.filterKind(data)
      // res.send(data)
       sql.insert(db,collection,data).then(()=>{
        res.redirect('/kind')
       })
  })
})
router.get('/exportUsers',function(req,res,next){
  const _headers=[
    {caption:'idNum',type:'number'},
    {caption:'proName',type:'string'},
    {caption:'ename',type:'string'},
    {caption:'price',type:'string'},
    {caption:'pic',type:'string'},
    {caption:'type',type:'string'},
    {caption:'state',type:'string'},
    {caption:'def',type:'string'},
  ]
  sql.find(db,'kind',{}).then(data=>{
    let alldata=new Array()
    data.map((item,index)=>{
      let arr=[]
      arr.push(item.idNum);
      arr.push(item.proName);
      arr.push(item.eName);
      arr.push(item.price);
      arr.push(item.pic);
      arr.push(item.type);
      arr.push(item.state);
      arr.push(item.def);
      alldata.push(arr)
    })
    const result=fileMd.exportdata(_headers,alldata);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
				res.setHeader("Content-Disposition", "attachment; filename=" + "kind.xlsx");
				res.end(result, 'binary');
  })
})

router.get('/removeAll',function(req,res,next){
  var {pageNumber}=req.query
  sql.remove(db,collection,{}).then(()=>{  
    res.redirect('/kind?pageNumber='+pageNumber)
  }).catch((err)=>{
    console.log(err)
  })
})

router.post('/updateAction',function(req,res,next){
  console.log(req.body)
  var {idNum,price,state,pageCode,pageNumber}=req.body
  idNum*=1;
  sql.update(db,collection,'updateOne',{idNum},{$set: { price,state}}).then(()=>{
    console.log("update success")
    res.redirect('/kind?pageCode='+pageCode+"&pageNumber="+pageNumber)
  }).catch((err)=>{
    console.log(err)
    res.redirect('/kind')
  })
})

router.get('/remove',function(req,res,next){
  var {idNum,pageCode,pageNumber}=req.query

  sql.remove(db,collection,{idNum}).then(()=>{
    res.redirect('/kind?pageCode='+pageCode+"&pageNumber="+pageNumber)
  }).catch((err)=>{
    console.log(err)
  })
})

router.get('/removeAll',function(req,res,next){
  var {pageNumber}=req.query
  sql.remove(db,collection,{}).then(()=>{
  
    res.redirect('/kind?pageNumber='+pageNumber)
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
            res.render('kind',{
              activeIndex:6,
              routerType:"/kind",
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
