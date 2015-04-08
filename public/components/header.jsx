/** @jsx React.DOM */
var React = require('react');
var Navbar = require("./nav.jsx");

//TODO: Make this dependent on real authentication
var isAuthenticated = true;
var isAdmin = true;


var AdminLink = React.createClass({
    render: function() {
        return (
            <a href="/login">
                <p>Admin Panel</p>
            </a>
        )
    }
});


// {(isAdmin
//     ? <AdminLink />     
//     : <div>Never showing false item</div>
// )}


var Buttons = React.createClass({
    render: function() {
        return (
            <div>
                <a href="/login">
                    <p>Logout</p>
                </a>
                <p>Welcome username</p>
            </div>
        )
    }
});

module.exports = React.createClass({
    login: function(e) {
        alert("hello there");
    },
    render: function() {
        return (
            <header className="container-fluid">
                <div className="row">
                    <div className="column-6 push-1">
                        <h1>Coot Freight Ltd</h1>
                    </div>
                    <div>
                    {(isAuthenticated
                        ? <Buttons />     
                        : <div>Never showing false item</div>
                    )}
                    </div>
                    <div className="column-12 push-1">
                        {(isAuthenticated
                            ? <Navbar />     
                            : <div>Never showing false item</div>
                        )}
                    </div>
                </div>
            </header>
        );
    }
})