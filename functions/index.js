const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const pdata = require('./products.json')
const app = express();
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(compression());


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'acropackaging@gmail.com',
    pass: 'Project@123'
  }
});

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

app.post('/mailsend',function(req,res){

  var mailOptions = {
  from: 'acropackaging@gmail.com',
  to: 'info@acropackaging.com',
  subject: 'Contact Request from Website',
  html: 'Request received as<br><br>Name:'+req.body.name+'<br>Subject: '+req.body.subject+'<br>Email: '+req.body.email+'<br>Message: '+req.body.message
};
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
  res.redirect('contact?s');
});

app.post('/newslettersend',function(req,res){

  var mailOptions = {
  from: 'acropackaging@gmail.com',
  to: 'arthak3@gmail.com',
  subject: 'Add me to Newsletter',
  html: 'Request received to add to newsletter<br><br>Email: '+req.body.EMAIL
};
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
  res.redirect('index?s');
});

app.get('/product',function(req,res){
  var url = req.url;
  url = url.substring(3,url.length);
  // res.send(req.query.id);
  res.render( "product",{id: req.query.id, name : pdata[req.query.id].name, description : pdata[req.query.id].desc , display : pdata[req.query.id].display, inlet: pdata[req.query.id].inlet, outlet: pdata[req.query.id].outlet, liner: pdata[req.query.id].liner, lifting: pdata[req.query.id].lifting});
  // res.send(pdata[url]);
});
app.get('/fibc',function(req,res){
  res.render("fibc_bulk",{data : pdata});
});
app.get('*',function(req,res){
  res.redirect("/404.html");
});


exports.app = functions.https.onRequest(app);
