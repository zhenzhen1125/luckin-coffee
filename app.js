var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var url = require('url');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var cartsRouter = require('./routes/carts');
var rotationsRouter = require('./routes/rotations');
var kindRouter = require('./routes/kind');
var apiTedRouter = require('./api/ted');
var apiUsersRouter = require('./api/users');
var apiProductsRouter = require('./api/products');
var apiKindRouter = require('./api/kind');
var apiRotationsRouter = require('./api/rotations');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.all('/api/*', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
  

// app.all('*',(req,res,next)=>{
//   var {pathname}=url.parse(req.url)
//   pathname=pathname.split("/")[1]
//   console.log("pathname:")
//   console.log(pathname)
//  if(pathname=='login'||pathname=='loginAction'){
//     next()
//  }else{
//     if(!req.cookies.isLogin){
//       console.log("!req.cookies.isLogin")
//      res.redirect('/login')
//    }else{
//      next()
//     } 
//  }
// })

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/rotations', rotationsRouter);
app.use('/kind', kindRouter);
app.use('/api/ted', apiTedRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductsRouter);
app.use('/api/kind', apiKindRouter);
app.use('/api/rotations', apiRotationsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
