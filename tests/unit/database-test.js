'use strict';

var test = require('tape');
var db = require('../../server/db-config.js');


// DB.GET
test("DB Config contains a `get` function", function(t) {

	t.equals(typeof db.get, "function", "db.get is a function");

	    
	t.equals(db.get.length, 3, "db.get takes 3 arguments");

	t.end();
});

	// DB.POST
test("DB Config contains a `post` function", function(t) {

	t.equals(typeof db.post, "function", "db.post is a function");

	t.equals(db.post.length, 4, "db.post takes 4 arguments");

	t.end();
});


// DB.REMOVE
test("DB Config contains a `remove` function", function(t) {

	t.equals(typeof db.remove, "function", "db.remove is a function");

	t.equals(db.remove.length, 4, "db.remove takes 4 arguments");

	t.end();
});


// DB.EDIT
test("DB Config contains a `edit` function", function(t) {

	t.equals(typeof db.edit, "function", "db.edit is a function");

	t.equals(db.edit.length, 4, "db.edit takes 4 arguments");

	t.end();
});


