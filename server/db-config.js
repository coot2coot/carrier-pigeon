var mongodb = require('mongodb');
var uri = process.env.MONGOLAB_URI || require('./credentials.json').mongodburi;


function connect (request, cb, change) {
	return mongodb.MongoClient.connect(uri, function (err, db) {
		if (err) {
			console.error(err);
		} else {
			var orders = db.collection('orders');

			if (change) {
				request(db, orders, cb, change);
			} else {
				request(db, orders, cb);
			}
		}
	});
}

function get (db, collection, cb){
	collection.find({}).toArray(function (err, docs) {
		if (err) {
			console.error(err);
		} else {
	        cb(docs);
	        db.close();
	    }
     });
}

function post (db, collection, cb, doc) {
	collection.insert(doc, function (err, result) {
		if (err) {
			console.error(err);
		} else {
			db.close();
			cb();
		}
	});
}

function put (db, collection, cb, doc) {
	collection.update({_id: ObjectID(doc.id)}, function (err) {
		if (err) {
			console.error(err);
		} else {
			db.close();
			cb();
		}
	});
}

function remove (db, collection, cb, doc) {
	collection.remove({_id: ObjectID(doc.id)}, function (err) {
		if (err) {
			console.error(err);
		} else {
			db.close();
		}
	});
}

var dataBase = {};

dataBase.get = function (cb) {
	connect(get, cb);
}

dataBase.post = function (order, cb) {
	connect(post, cb, order);
}

dataBase.put = function (order, cb) {
	connect(put, cb, order);
}

dataBase.remove = function (order, cb) {
	connect(remove, cb, order);
}

module.exports = dataBase;
