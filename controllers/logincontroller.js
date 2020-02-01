var bodyparser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://test:test1234@todo-qqfes.mongodb.net/test?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true });
var login = mongoose.model('signup');
var a;

var urlencodedParser = bodyparser.urlencoded({extended: false});

module.exports=function(app){
  app.get('/',function(req,res){
    login.find({},function(err,data){
        if(err) throw err;
        else
          res.render('index',{p:{}});
    });
  });

  app.get('/login',function(req,res){
    res.render('login',{p:{}});
  });

  app.get('/getGUID',function(req,res){
    res.render('login',{p:a});
  });
  app.post('/getGUID',urlencodedParser,function(req,res){
    login.find(req.body,function(err,data){
        if(err) throw err;
        else{
        a=data[0];
        res.json({});
      }
    });
  });
    app.post('/',urlencodedParser,function(req,res){
        login.find(req.body,function(err,data){
            if(err) throw err;
            else
            {
              if(data.length == 0)
                res.status(404).end();
              else
              {
                res.json({x:""});
              }
            }
        });
    });
    app.get('/status',function(req,res){
      res.render('status');
    });
};
