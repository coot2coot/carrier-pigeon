var mongodb = require('mongodb'),
	uri = require('./credentials.json').mongodburi || MONGOLAB_URI;

function connect (request, cb, change) {
	return mongodb.MongoClient.connect(uri, function (err, db) {
		if (err) {
			console.error(err);
		} else {
			var orders = db.collection('orders');

			request(db, orders, cb, change);
		}
	});
}

function get (db, orders, cb){
	orders.find({}).toArray(function (err, docs) {
		if (err) {
			console.error(err);
		} else {
	        cb(docs);
	        db.close();
	    }
     });
}

function post (db, orders, cb, order) {
	orders.insert(order, function (err, result) {
		if (err) {
			console.error(err);
		} else {
			db.close();
		}
	});
}

function put (db, orders, cb, newOrder) {
	order.update({_id: ObjectID(newOrder.id)}, function (err) {
		if (err) {
			console.error(err);
		} else {
			db.close();
		}
	});
}

function remove (db, orders, cb, newOrder) {
	order.remove({_id: ObjectID(newOrder.id)}, function (err) {
		if (err) {
			console.error(err);
		} else {
			db.close();
		}
	});
}

var dataBase = {};

dataBase.get = function (cb) {
	return connect(get, cb);
}

dataBase.post = function (order, cb) {
	connect(post, order, cb);
}

dataBase.put = function (order, cb) {
	connect(put, order, cb);
}

dataBase.remove = function (order, cb) {
	connect(remove, order, cb);
}

module.exports = dataBase;
