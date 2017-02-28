var Assert = require('assert');

var Mongo = require('./mongodb.js');
var Utils = require('./utils.js');

exports.login = function Login(userdata, callback)
{
    Mongo.connect2db(function(db) {
//        var cursor = db.collection('users').find( {'id': userdata.UserId} );
//
//        cursor.each(function(err, doc) {
//            console.log('loop');
//            assert.equal(err, null);
//            if(doc != null) {
//                db.close();
//                console.log('OK');
//                return 'Ok';
//            }
//            else {
//                db.close();
//                console.log('ERROR');
//                return 'Error';
//            }
//        });

        db.collection('users').find( {'id': userdata.UserId} ).count(function(err, count) {
            Assert.equal(err, null);
            if(count > 0)
            {
                callback(true);
            }
            else
            {
                callback(false);
            }
            db.close();
        });
    });
}

exports.register = function Register(userdata, callback)
{
    Mongo.connect(function(db) {
        db.collection('users').insertOne({
                "id" : userdata.UserId,
                "name" : userdata.UserName,
                "password" : userdata.Password,
            },
            function(err, result){
                console.log(Assert.equal(err, null));
                callback(result);
            });
    });
}
