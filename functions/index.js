const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const pdata = require('./products.json')
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(compression());

app.get('/',function(req,res){
  res.render("index");
});
app.get('/index',function(req,res){
  res.render("index");
});
app.get('/about',function(req,res){
  res.render("about");
});
app.get('/faq',function(req,res){
  res.render("faq");
});
app.get('/contact',function(req,res){
  res.render("contact");
});
app.get('/metal',function(req,res){
  res.render("metals");
});
app.get('/product',function(req,res){
  var url = req.url;
  url = url.substring(3,url.length);
  // res.send(req.query.id);
  res.render( "product",{id: req.query.id, name : pdata[req.query.id].name, description : pdata[req.query.id].desc , display : pdata[req.query.id].display});
  // res.send(pdata[url]);
});
app.get('/fibc',function(req,res){
  res.render("fibc_bulk",{data : pdata});
});
app.get('*',function(req,res){
  res.redirect("/404.html");
});


exports.app = functions.https.onRequest(app);
