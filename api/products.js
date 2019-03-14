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
  sql.find("sh1811","products",{}).then((data)=>{
          res.send({
            data, 
      })
  })
})

router.post('/upload', upload.single('smallpic'), function (req,res,next) {
  console.log(req.file)
  var {idNum,pageNumber}=req.body
  const {originalname,filename} = req.file;
  // const {username} =req.body
  const arr = originalname.split('.');

  const type = arr[arr.length-1];
  const realFileName='/'+filename + '.' +type;
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
    var {idNum,pageNumber}=req.body
    idNum*=1
    console.log(idNum)
    const {originalname,filename} = req.file;
    // const {username} =req.body
    const arr = originalname.split('.');  
    const type = arr[arr.length-1];
    const realFileName='/'+filename + '.' +type;
    const oldName = './public/images/' +filename;
    const newName = './public/images/' + realFileName;
    fs.rename(oldName,newName,(err)=>{
      if(err) throw err;
      var bigpic = '/images/'+realFileName
      // var pic = 456
      sql.update('sh1811','products','updateOne',{idNum},{$set: { bigpic }}).then(()=>{
          console.log('upload bigpic success111111111111111111111111')
              res.redirect('/products?pageNumber='+pageNumber)
            }).catch((err)=>{
             console.log(err)
            })         
      })
    })

    router.get('/distinct', function(req, res, next) {
          sql.distinct("sh1811","products","type").then((typeArr)=>{
              res.send({
                typeArr
              })
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

router.get('/detail', function(req, res, next) {
  let {idNum}=req.query;
  idNum*=1
  sql.find("sh1811","products",{idNum}).then((data)=>{
            res.send({
              data,
            })
          })
        })



module.exports = router;
