var express = require('express');
var router = express.Router();

var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var mongoose = require('mongoose');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var uri = 'mongodb+srv://doanthuc:Thuc.nd1609@cluster0-a7jyk.gcp.mongodb.net/tin327dv01?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true });


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: "Golden Farm"});
});

router.get('/get-data', function(req, res, next){
  var resultArray = [];
  client.connect(err => {
    const collection = client.db("tin327dv01").collection("Golden Farm Product");
    // perform actions on the collection object
    assert.equal(null, err);
    var cursor = collection.find();
    cursor.forEach(function(doc, err){
      assert.equal(null, err);
      console.log(doc);
      resultArray.push(doc);
    }), function(){
    
    client.close();
    res.render('index', {items: resultArray})
    }
  });
})

module.exports = router;