var express = require('express');
var router = express.Router();
var sql=require("./../tool/sql.js")
const md5=require("md5")
const fileMd=require("./../tool/file.js")
const xlsxfile="./stu.xlsx"
var fs=require('fs')
var multer = require('multer');
var upload = multer({dest: './public/images'})
//连接池在e:\data\db


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   sql.find("sh1811","users",{}).then((data)=>{
//       res.render('users',{activeIndex:2,data})
//   }).catch(err=>{
//     console.log(err)
//   })
// });
router.get('/', function(req, res, next) {
  let {pageCode,pageNumber}=req.query;
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  sql.find("sh1811","users",{}).then((data)=>{
    sql.distinct("sh1811","users","age").then((ageArr)=>{
      let totalNumber=Math.ceil(data.length/pageNumber)
      data=data.splice((pageCode-1)*pageNumber,pageNumber)
      res.render('users',{
        activeIndex:2,
        routerType:"/users?",
        data,
        totalNumber,
        pageCode,
        pageNumber,
        ageArr,
      })
    })
  })
});

router.get('/upload', upload.single('avatar'), function (req,res,next) {
  console.log(req.file)
  var {tel,pageNumber}=req.query
  const {originalname,filename} = req.file;
  // const {username} =req.body
  const arr = originalname.split('.');
  const type = arr[arr.length-1];
  const realFileName='/'+filename + '.' +type;
  const oldName = './public/images/' +filename;
  const newName = './public/images/' + realFileName;
  fs.rename(oldName,newName,(err)=>{
    if(err) throw err;
    var avatar = '/images/'+realFileName
    tel*=1
    sql.update('sh1811','users','updateOne',{tel},{$set: { avatar }}).then(()=>{
            // console.log(img)
            res.redirect('/users?pageNumber='+pageNumber)
          }).catch((err)=>{
           console.log(err)
          })         
    })
  })


router.get('/search', function(req, res, next) {
  let {pageCode,pageNumber,nickname}=req.query;
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  sql.find("sh1811","users",{"nickname":eval('/'+nickname+'/')}).then((data)=>{
    sql.distinct("sh1811","users","age").then((ageArr)=>{
      let totalNumber=Math.ceil(data.length/pageNumber)
      data=data.splice((pageCode-1)*pageNumber,pageNumber)
      res.render('users',{
        activeIndex:2,
        routerType:"/users",
        data,
        totalNumber,
        pageCode,
        pageNumber,
        ageArr
      })
    })
  })
});
router.get('/searchTel', function(req, res, next) {
  let {pageCode,pageNumber,tel}=req.query;
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  sql.find("sh1811","users",{"tel":eval('/'+tel+'/')}).then((data)=>{
    sql.distinct("sh1811","users","age").then((ageArr)=>{
      let totalNumber=Math.ceil(data.length/pageNumber)
      data=data.splice((pageCode-1)*pageNumber,pageNumber)
      res.send({
        state:'200',
        data
      })
    })
  })
});

router.get('/age', function(req, res, next) {
  let {age,pageCode,pageNumber}=req.query
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  age*=1
  sql.find("sh1811","users",{age}).then((data)=>{
    sql.distinct("sh1811","users","age").then((ageArr)=>{
      let totalNumber=Math.ceil(data.length/pageNumber)
      data=data.splice((pageCode-1)*pageNumber,pageNumber)
      res.render('users',{
        activeIndex:2,
        routerType:"/users/age?age="+age+"&",
        data,
        totalNumber,
        pageCode,
        pageNumber,
        ageArr
      })
    })
  })
})

router.get('/sort', function(req, res, next) {
  let {type,num,pageCode,pageNumber}=req.query
  pageCode=pageCode*1||1;//默认第一页
  pageNumber=pageNumber*1||8;//默认显示8条
  num*=1
  let sortData={}
  sortData[type]=num
  sql.sort("sh1811","users",sortData).then((data)=>{
    sql.distinct("sh1811","users","age").then((ageArr)=>{
      let totalNumber=Math.ceil(data.length/pageNumber)
      data=data.splice((pageCode-1)*pageNumber,pageNumber)
      res.render('users',{
        activeIndex:2,
        routerType:"/users/sort?type="+type+"&&num="+num+"&",
        data,
        totalNumber,
        pageCode,
        pageNumber,
        ageArr
      })
    })
  })
})




router.get('/add', function(req, res, next) {
  let {pageNumber}=req.query
  res.render('users_add',{activeIndex:2,pageNumber});
});

router.get('/remove',function(req,res,next){
  var {tel,pageCode,pageNumber}=req.query
  sql.remove("sh1811","users",{tel}).then(()=>{
  
    res.redirect('/users?pageCode='+pageCode+"&pageNumber="+pageNumber)
  }).catch((err)=>{
    console.log(err)
  })
})

router.get('/removeAll',function(req,res,next){
  var {pageNumber}=req.query
  sql.remove("sh1811","users",{}).then(()=>{
  
    res.redirect('/users?pageNumber='+pageNumber)
  }).catch((err)=>{
    console.log(err)
  })
})

router.post('/addAction', function(req, res, next) {
    var {tel,nickname,password,pageNumber,age}=req.body;
    sql.find("sh1811","users",{tel}).then((data)=>{
      //如果查找不到则密码加密后添加到sql
        if(data.length==0){
          password=md5(password);
          sql.insert("sh1811","users",{tel,nickname,password,age}).then(()=>{
            res.redirect('/users?pageNumber='+pageNumber)
          }).catch((err)=>{
            res.redirect('/users/add')
          })
          
        }
        //如果已经存在则跳回主界面
          else{res.redirect('/users/add')}
    }).catch((err)=>{
      if(err)throw err
      res.redirect('/users/add')
    })
    
});

router.post('/updateAction',function(req,res,next){
  console.log(req.body)
  var {tel,nickname,pageCode,pageNumber}=req.body
  tel=tel*1;
  sql.update("sh1811","users",'updateOne',{tel},{$set: { nickname } }).then(()=>{
    console.log("update success")
    res.redirect('/users?pageCode='+pageCode+"&pageNumber="+pageNumber)
  }).catch((err)=>{
    console.log(err)
    res.redirect('/users')
  })
})

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
      data=fileMd.filterData(data)
     // res.send(data)
       sql.insert("sh1811","users",data).then(()=>{
        res.redirect('/users')
       })
  })
})
router.get('/exportUsers',function(req,res,next){
  const _headers=[
    {caption:'tel',type:'string'},
    {caption:'nickname',type:'string'},
    {caption:'password',type:'string'},
    {caption:'age',type:'string'}
  ]
  sql.find("sh1811",'users',{}).then(data=>{
    let alldata=new Array()
    data.map((item,index)=>{
      let arr=[]
      arr.push(item.tel);
      arr.push(item.nickname);
      arr.push(item.password);
      arr.push(item.age);
      alldata.push(arr)
    })
    const result=fileMd.exportdata(_headers,alldata);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
				res.setHeader("Content-Disposition", "attachment; filename=" + "users.xlsx");
				res.end(result, 'binary');
  })
})

module.exports = router;
