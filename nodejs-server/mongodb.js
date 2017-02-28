var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/db';

/*
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");

//  insert db
//    insertDocument(db, function(){
//        db.close();
//    });

    countDocument(db, function() {
        db.close();
    });

//    findRestaurants(db, function() {
//        db.close();
//    });
//
//    findSpecify(db, function() {
//        db.close();
//    });
//
//    queryByField(db, function() {
//        db.close();
//    });
});
*/

function connectDb(callback)
{
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        callback(db);
    });
}

function test1()
{
    connectDb(function(db) {
        db.collection('users').find().count(function(err, count) {
            assert.equal(err, null);
            console.log(count);
            db.close();
        });
    });
}

var insertDocument = function(db, callback) {
    db.collection('users').insertOne({
        "id" : "456",
//        "name" : "Manhattan",
        "name" : "test_users",
        "password" : "456",
    },
    function(err, result){
       assert.equal(err, null);
       console.log("Inserted a document into the restaurants collection.");
       callback();
    });
};

// find all record
var findRestaurants = function(db, callback) {
    var cursor = db.collection('users').find();
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if(doc != null) {
            console.dir(doc);
        }
        else {
            callback();
        }
    });
};

// count record
var countDocument = function(db, callback) {
    var cursor = db.collection('users').find().count(function(err, count) {
        assert.equal(err, null);
            console.log(count);
        callback();
    });
//    console.log(db.collection('users').find().count());
};

// find Specify Equality Conditions
var findSpecify = function(db, callback) {
    var cursor = db.collection('restaurants').find( {"borough":"Manhattan"} );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if(doc != null) {
            console.dir(doc);
        }
        else {
            callback();
        }
    });
};

// Query by a Field in an Embedded Document
var queryByField = function(db, callback) {
    var cursor = db.collection('restaurants').find( {"address.zipcode": "10075"} );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if(doc != null) {
            console.dir(doc);
        }
        else {
            callback();
        }
    });
};

//module.exports = {
//    URL: url,
//
//    test: test1(),
//};

exports.test_function = function()
{
    return test1();
}

exports.connect2db = function(callback){
    MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            callback(db);
        });
};