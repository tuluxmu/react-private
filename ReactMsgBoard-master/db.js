var MongoClient = require('mongodb').MongoClient;
var url = require('./property').property['db_url'];

var documentName = "msg";

function save(data, callback) {
	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log(err);
		} else {
			var collection = db.collection(documentName);

			collection.insert(data, function(err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log("insert success!!");
					callback && callback(result);
					db.close();
				}
			});
		}
	})
}

function list(page, callback) {
	var pageNum = 15;

	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log(err);
		} else {
			var collection = db.collection(documentName);

			collection.find({}, {
				limit: pageNum,
				skip: (page - 1) * pageNum
			}).sort({
				dtime: -1
			}).toArray(function(err, result) {
				if (err) {
					console.log(err);
				} else {
					callback && callback(result);
					db.close();
				}
			})
		}
	})
}

exports.save = save;
exports.list = list;