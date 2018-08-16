var express = require('express');
var router = express.Router();
var path = require('path');

/* GET users listing. */

//ROUTE TO PAGES
router.get('/home/:id', function(req, res){
  res.sendFile(path.join(__dirname, '/geolocation.html'));
});

router.get('/donate/:id', function(req, res){
  console.log ("getting donate page");
  res.sendFile(path.join(__dirname, '../MyNomz/public/nomzStuff', 'donate_pg.html'));
});

router.get('/request/:id', function(req, res){
  console.log ("getting request page");
  res.sendFile(path.join(__dirname, '../MyNomz/public/nomzStuff', 'request_pg.html'));
});

router.get('/styles.css', function(req, res){
  console.log ("getting style sheet");
  res.sendFile(path.join(__dirname, '../MyNomz/public/stylesheets', 'styles.css'));
});


//HOME PAGE IMAGES
router.get('/home/img/nomzTitle.png', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../MyNomz/public/nomzStuff/img', 'nomzTitle.png'))
});

router.get('/home/img/googlemap.png', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../MyNomz/public/nomzStuff/img', 'googlemap.png'))
});

router.get('/home/img/donate.png', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../MyNomz/public/nomzStuff/img/donate.png'))
});

router.get('/home/img/request.png', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../MyNomz/public/nomzStuff/img/request.png'))
});


//REQUEST/DONATE PAGE IMAGES
router.get('/img/nomzTitle.png', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../MyNomz/public/nomzStuff/img', 'nomzTitle.png'))
});

router.get('/img/nomzBowl.png', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../MyNomz/public/nomzStuff/img', 'nomzBowl.png'))
});

router.get('/bagRed.png', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../MyNomz/public/nomzStuff', 'bagRed.png'))
});

router.get('/bowlRed.png', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../MyNomz/public/nomzStuff', 'bowlRed.png'))
});

module.exports = router;
