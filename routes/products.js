var express = require('express');
var router = express.Router();
var sql=require("./../tool/sql.js")
const fileMd=require("./../tool/file.js")
const xlsxfile="./luckin.xlsx"
var fs=require('fs')
var multer = require('multer');
var upload = multer({dest: './public/images'})
/* GET users listing. */
router.get('/', function(req, res, next) {
  let {pageCode,pageNumber}=req.query;
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  sql.find("sh1811","products",{}).then((data)=>{
     sql.distinct("sh1811","products","type").then((typeArr)=>{
          let totalNumber=Math.ceil(data.length/pageNumber)
          data=data.splice((pageCode-1)*pageNumber,pageNumber)
          res.render('products',{
            activeIndex:3,
            routerType:"/products?",
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
  var {idNum,pageNumber}=req.body
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
    
    // var pic = 456
    sql.update('sh1811','products','updateOne',{idNum},{$set: { pic }}).then(()=>{
            res.redirect('/products?pageNumber='+pageNumber)
          }).catch((err)=>{
           console.log(err)
          })         
    })
  })

  router.post('/uploadbig', upload.single('bigpic'), function (req,res,next) {
    console.log(req.file)
    var {idNum,pageCode,pageNumber}=req.body
    idNum*=1
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
      var bigpic = '/images/'+realFileName
      
      // var pic = 456
      sql.update('sh1811','products','updateOne',{idNum},{$set: { bigpic }}).then(()=>{
              res.redirect('/products?pageNumber='+pageNumber+'&'+'pageCode='+pageCode)
            }).catch((err)=>{
             console.log(err)
            })         
      })
    })


router.get('/type', function(req, res, next) {
  let {type,pageCode,pageNumber}=req.query;
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  sql.find("sh1811","products",{type}).then((data)=>{
      sql.distinct("sh1811","products","type").then((typeArr)=>{
          let totalNumber=Math.ceil(data.length/pageNumber)
          data=data.splice((pageCode-1)*pageNumber,pageNumber)
          res.render('products',{
            activeIndex:3,
            routerType:"/products/type?type="+type+"&",
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
  res.render('products_add',{activeIndex:3,pageNumber});
});
router.get('/uploadpic', function(req, res, next) {
  let {idNum,pageNumber}=req.query
  res.render('products_addIMG',{activeIndex:3,pageNumber,idNum});
});

router.post('/addAction', function(req, res, next) {
  console.log(req.body)
  var {idNum,proName,eName,price,scale,temp,sugar,milk,author,con,title,met,def,pageNumber}=req.body;
  idNum*=1;
  sql.find("sh1811","products",{idNum}).then((data)=>{
    //如果查找不到则密码加密后添加到sql
      if(data.length==0){
        sql.insert("sh1811","products",{idNum,proName,eName,price,scale,temp,sugar,milk,author,con,title,met,def}).then(()=>{
          res.redirect('/products?pageNumber='+pageNumber)
        }).catch((err)=>{
          res.redirect('/products/add')
        })
        
      }
      //如果已经存在则跳回主界面
        else{res.redirect('/products/add')}
  }).catch((err)=>{
    if(err)throw err
    res.redirect('/products/add')
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
      data=fileMd.filterPro(data)
      // res.send(data)
       sql.insert("sh1811","products",data).then(()=>{
        res.redirect('/products')
       })
  })
})

router.get('/exportUsers',function(req,res,next){
  const _headers=[
    {caption:'idNum',type:'number'},
    {caption:'proName',type:'string'},
    {caption:'ename',type:'string'},
    {caption:'price',type:'string'},
    {caption:'scale',type:'string'},
    {caption:'temp',type:'string'},
    {caption:'sugar',type:'string'},
    {caption:'milk',type:'string'},
    {caption:'author',type:'string'},
    {caption:'con',type:'string'},
    {caption:'title',type:'string'},
    {caption:'met',type:'string'},
    {caption:'bigpic',type:'string'},
    {caption:'def',type:'string'},
    {caption:'ava',type:'string'},
  ]
  sql.find("sh1811",'products',{}).then(data=>{
    let alldata=new Array()
    data.map((item,index)=>{
      let arr=[]
      arr.push(item.idNum);
      arr.push(item.proName);
      arr.push(item.eName);
      arr.push(item.price);
      arr.push(item.scale);
      arr.push(item.temp);
      arr.push(item.sugar);
      arr.push(item.milk);
      arr.push(item.author);
      arr.push(item.con);
      arr.push(item.title);
      arr.push(item.met);
      arr.push(item.bigpic);
      arr.push(item.def);
      arr.push(item.ava);
      alldata.push(arr)
    })
    const result=fileMd.exportdata(_headers,alldata);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
				res.setHeader("Content-Disposition", "attachment; filename=" + "products.xlsx");
				res.end(result, 'binary');
  })
})

router.get('/removeAll',function(req,res,next){
  // var {pageNumber}=req.query
  sql.remove("sh1811","products",{}).then(()=>{  
    res.redirect('/products')
  }).catch((err)=>{
    console.log(err)
  })
})

router.post('/updateAction',function(req,res,next){
  console.log(req.body)
  var {idNum,price,def,pageCode,pageNumber}=req.body
  idNum*=1
  sql.update("sh1811","products",'updateOne',{idNum},{$set: { price,def}}).then(()=>{
    console.log("update success")
    res.redirect('/products?pageCode='+pageCode+"&pageNumber="+pageNumber)
  }).catch((err)=>{
    console.log(err)
    res.redirect('/products')
  })
})

router.get('/remove',function(req,res,next){
  var {idNum,pageCode,pageNumber}=req.query

  sql.remove("sh1811","products",{idNum}).then(()=>{
    res.redirect('/products?pageCode='+pageCode+"&pageNumber="+pageNumber)
  }).catch((err)=>{
    console.log(err)
  })
})

router.get('/removeAll',function(req,res,next){
  var {pageNumber}=req.query
  sql.remove("sh1811","products",{}).then(()=>{
  
    res.redirect('/products?pageNumber='+pageNumber)
  }).catch((err)=>{
    console.log(err)
  })
})
router.get('/search', function(req, res, next) {
  let {pageCode,pageNumber,title}=req.query;
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  sql.find("sh1811","products",{"title":eval('/'+title+'/')}).then((data)=>{
    sql.distinct("sh1811","products","brand").then((brandArr)=>{
      sql.distinct("sh1811","products","watchType").then((typeArr)=>{
        sql.distinct("sh1811","products","people").then((peopleArr)=>{
            let totalNumber=Math.ceil(data.length/pageNumber)
            data=data.splice((pageCode-1)*pageNumber,pageNumber)
            res.render('products',{
              activeIndex:3,
              routerType:"/products",
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
