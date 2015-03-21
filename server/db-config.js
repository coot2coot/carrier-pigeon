var mongodb = require('mongodb'),
	uri = require('../credentials.json').mongodburi;

var dataBase = {}

var connect = function (request, change) {
	return mongodb.MongoClient.connect(uri, function (err, db){
		if(err) throw err;
		var orders = db.collection('orders');
		request(orders, change)
	}
}

var get = function (orders){
	return orders;	
}

dataBase.get = connect(get);

var post = function (orders, order) {
	orders.insert(order, function (err, result) {
		if(err) throw err;
	})
};

database.post = connect(post, order);

var put = function (orders, newOrder) {
	order.update(order.id,{$set: order}, function (err) {
		if(err) throw err;
		else console.log('successfully updated');
	})
}

database.put = connect(put, order);





dataBase.post = function (order) {
	return mongodb.MongoClient.connect(uri, function (err, db) {
		var orders = db.collection('orders');

		orders.insert(order, function (err, result){

		})
	})
}

dataBase.update


dataBase.remove