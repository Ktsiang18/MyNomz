var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var index = require('./routes/index')
//var user = require('./routes/user')
var donate = require('./routes/donate')
var request = require('./routes/request')
var server = require('http').createServer(app);

app.use('/', index)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static(__dirname + '/public'));

var mongoose = require('mongoose');
mongoose.connect("mongodb://kmt2288:Mauipuprox18@ds113522.mlab.com:13522/nomzdata");
var db = mongoose.connection;

//GET LOGIN PAGE
app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '/public/nomzStuff', 'logIn.html'))
});

//CREATE NEW USER
var userSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lon: Number,
  req_allergies: String,
  req_servings: Number,
  req_radius: Number,
  donate_servings: Number,
  donate_type: String
});

var User = mongoose.model('User', userSchema);

app.post('/', function (req, res) {
  var u = new User({
    name: req.body.uname,
    lat: null,
    lon: null,
    req_allergies: null,
    req_servings: null,
    req_radius: null,
    donate_servings: null,
    donate_type: null
  });
  
  u.save(function (err) {
    if (err)
      throw err;
    else
      console.log("user save successfully: ", u);
    res.redirect('/home/' + u._id);
  });
});

//POST LOCATION TO MONGODB;
app.post('/home/:id', function (req, res) {
  var options = req.body;

  User.findOneAndUpdate({
    '_id': req.params.id
  }, {
    $set: {
      lat: options.lat,
      lon: options.lon
    }
  }, {
    upsert: true
  }, function (err, doc) {
      if (err) return res.status(500).send({
        error: err
      });
      else 
        console.log("doc: ", doc);
      });
      console.log("successfully saved location");
});

//POST REQUEST TO DB
app.post('/request/:id', function (req, res){
  console.log("req.body", req.body);
  User.findOneAndUpdate({
    '_id': req.params.id
  }, {
    $set: {
      req_allergies: req.body.allergies,
      req_servings: req.body.servings,
      req_radius: req.body.radius
    }
  }, function (err) {
        if (err) 
          throw err;
        else 
          console.log("successfully recorded food request");
      });
});

//POST DONATION TO DB
app.post('/donate/:id', function (req, res){
  console.log("req.body", req.body);
  User.findOneAndUpdate({
    '_id': req.params.id
  }, {
    $set: {
      donate_servings: req.body.donate_servings,
      donate_type: req.body.donate_type
    }
  }, function (err) {
        if (err) 
          throw err;
        else 
          console.log("successfully recorded food request");
      });
});

//GET LOCATIONS AND REQUESTS/DONATIONS
app.get('/home/:type/:id', function(req, res){
    
    if(req.params.type == 'request'){
      var fields = 'name req_allergies req_servings req_radius';
      var query = {req_servings: {$ne:null}};
    } 
    else {
      var fields = 'name donate_servings donate_type';
      var query = {donate_type: {$ne:null}};
    }
  
    User.find(query, function(err, docs){
      if(err) throw err;
      console.log("data retrieve success: ", docs);
       res.send(docs);
    });

});

//app.use('/', user)
//app.use('/donate_pg.html', donate)
//app.use('/request_pg.html', request)

app.listen(process.env.PORT || 8000, function () {
  console.log("Listening on port 8000")
})
