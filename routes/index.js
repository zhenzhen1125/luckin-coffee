var express = require('express');
var router = express.Router();
var md5=require('md5')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
          activeIndex:1
     
    });
});
router.get('/login',function(req,res,next){
  res.render("login",{

  })
})
router.get('/signOut',function(req,res,next){
  res.clearCookie('isLogin')
  res.redirect("login")

 
})
router.get('/loginAction',function(req,res,next){
  let {username,password}=req.query
  password=md5(password)
  sql.find("sh1811","admin",{username,password}).then(data=>{
   
    if(data.length==0){
      console.log("wrong password")
      res.redirect('/login')
    }else{
      res.cookie('isLogin',"ok")
      res.redirect('/')
    }
  })
})
module.exports = router;
