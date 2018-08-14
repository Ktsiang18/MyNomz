var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var path = require('path')
var MongoClient = require('mongodb').MongoClient
var url = "mongodb://kmt2288:Mauipuprox18@ds113522.mlab.com:13522/nomzdata"
var user = require('./user')
var db

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
  extended: true
}))

MongoClient.connect(url, function (err, database) {
  if (err) throw err
  else
    db = database
})


/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("userid: " + user.userid)
  res.sendFile(path.join(__dirname, '../public/nomzStuff', 'donate_pg.html'))
})

router.post('/', function (req, res) {
  db.collection("users").updateOne({
    _id: user.userid
  }, {
    $set: {
      "user type": "posting",
      "food post": {
        "servings": req.body.servings,
        "food type": req.body.foodtype
      }
    }
  }, function (err, result) {
    if (err)
      console.log('Error')
    else
      console.log('Success');
  })
})

/*
	router.get('/first', function(req, res) {
	  var query = { firstname : req.query.first}
	  console.log(query)
		db.collection("users").find(query).toArray(function(err, result) {
			if (err) throw err
			console.log(result)
		})
	})

	*/


module.exports = router;
