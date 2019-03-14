var express = require('express');
var router = express.Router();
var sql=require("../tool/sql.js")
const fileMd=require("../tool/file.js")
const xlsxfile="./ted.xlsx"
// var tedData=require('../data/tedData.js')
 var relative=require('../data/relative.js')
var tedBanner=require('../data/tedBanner.js')
const db="sh1811"
const collection="ted1"

// router.get('/', function(req, res, next) {
    
//        res.send(tedData)
//     })
// router.get('/detail1', function(req, res, next) {
//         let {id}=req.query;
//          let detail=tedDetail[id]
//             res.send(detail)
      // });
 router.get('/banner', function(req, res, next) {
            res.send(tedBanner)
      });
router.get('/detail', function(req, res, next) {
      // let {pageCode,pageNumber}=req.query;
      // pageCode=pageCode*1||1;//默认第一页
      // pageNumber=pageNumber*1||8;//默认显示8条
      var {id}=req.query;
      id*=1
      console.log(id)
      sql.find(db,collection,{"id":eval('/'+id+'/')}).then((data)=>{
            res.send(data)
      })
})
router.get('/dataAll', function(req, res, next) {
      // let {pageCode,pageNumber}=req.query;
      // pageCode=pageCode*1||1;//默认第一页
      // pageNumber=pageNumber*1||8;//默认显示8条
      sql.find(db,collection,{}).then((data)=>{
            res.send(data)
      })
})
router.get('/sort', function(req, res, next) {
      // let {pageCode,pageNumber}=req.query;
      // pageCode=pageCode*1||1;//默认第一页
      // pageNumber=pageNumber*1||8;//默认显示8条
      // var {id}=req.query;
      // id*=1
      // console.log(id)
      sql.distinct(db,collection,"tags").then((data)=>{
            res.send(data)
      })
})
router.get('/tag', function(req, res, next) {
      let {tags}=req.query;

      sql.find(db,collection,{tags}).then((data)=>{
            console.log(data)
            res.send(data)
      })
})
router.get('/relative', function(req, res, next) {
            res.send(relative)
})

router.get('/search', function(req, res, next) {
      let {title}=req.query;
      sql.find(db,collection,{"title":eval('/'+title+'/')}).then((data)=>{
          res.send(data)
    })
})

router.get('/export',function(req,res,next){
      const _headers=[
        {caption:'id',type:'string'},
        {caption:'speakerName',type:'string'},
        {caption:'title',type:'string'},
        {caption:'main_pic',type:'string'},
        {caption:'duration',type:'string'},
        {caption:'description',type:'string'},
        {caption:'downloads',type:'string'},
        {caption:'start',type:'string'},
        {caption:'audio',type:'string'},
        {caption:'tags',type:'string'},
      ]
      sql.find(db,collection,{}).then(data=>{
        let alldata=new Array()
        data.map((item,index)=>{
          let arr=[]
          arr.push(item.id);
          arr.push(item.speakerName);
          arr.push(item.title);
          arr.push(item.main_pic);
          arr.push(item.duration);
          arr.push(item.description);
          arr.push(item.downloads);
          arr.push(item.start);
          arr.push(item.audio);
          arr.push(item.tags);
          arr.push(item.letter);
          alldata.push(arr)
        })
        const result=fileMd.exportdata(_headers,alldata);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                            res.setHeader("Content-Disposition", "attachment; filename=" + "products.xlsx");
                            res.end(result, 'binary');
      })
    })
    router.get('/removeAll',function(req,res,next){
      var {pageNumber}=req.query
      sql.remove(db,collection,{}).then(()=>{  
        res.send("remove success")
      }).catch((err)=>{
        console.log(err)
      })
    })
    router.get('/import',function(req,res,next){
      fileMd.analysisdata(xlsxfile).then((obj)=>{
          let data=obj[0].data
          data=fileMd.filterTed(data)
          // res.send(data)
           sql.insert(db,collection,data).then(()=>{
            res.send("import success")
           })
      })
    })

module.exports = router;