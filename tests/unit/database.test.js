var test = require('tape');
var db = require('../../server/db-config.js');

// DB.GET
test("DB Config contains a `get` function", function(t) {

    t.equals(typeof db.get, "function", "db.get is a function");
    t.end();

});

// DB.POST
test("DB Config contains a `post` function", function(t) {

    t.equals(typeof db.post, "function", "db.post is a function");
    t.end();

});

// DB.PUT
test("DB Config contains a `put` function", function(t) {

    t.equals(typeof db.put, "function", "db.put is a function");
    t.end();

});

// DB.REMOVE
test("DB Config contains a `remove` function", function(t) {

    t.equals(typeof db.remove, "function", "db.remove is a function");
    t.end();

});