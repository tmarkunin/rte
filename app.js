var express = require('express');
var app = express();
app.set('view engine','ejs');

var nano = require('nano')('https://51bf20cc-4951-46e3-b089-88928cfb27da-bluemix:0718ad3eee51e84cdb06444b88a67d3bf573741fcc916d50400d1a491d795a63@51bf20cc-4951-46e3-b089-88928cfb27da-bluemix.cloudant.com');
var news = nano.db.use('news');

var news_array = [];
  



  app.get('/', function(req,res){

    news.list(function(err, body) {
        if (!err) {
          body.rows.forEach(function(doc) {
            news.get(doc.id, { revs_info: true }, function(err, body) {
                if (!err){
                    var article = body;
                    news_array.push(article);
                  }
              });  
    
              timerknock = setTimeout(function(){
                res.render('default',  { news: news_array});
                clearTimeout(timerknock); 
            },  1000);
                          
          });
          
        }        
      });
    
});

app.get('/upload/:text', function(req,res){

    var txt = req.params.text;
    console.log(txt)
    var id = Math.random().toString(36).substring(7);

    console.log(id)

        news.insert({ _id: id, text: txt}, function(err, body) {
         if (!err)
             console.log(body)
})

                                                               });

var server = app.listen(3000, function(){

    console.log('Listen om port 3000');
});