/** @jsx React.DOM */
var React = require('react');
var Navbar = require("./nav.jsx");

var Buttons = <div>
				<a href="/login">
					<p>Logout</p>
				</a>
				<p>Welcome username</p>
			</div>;

var If = React.createClass({
    render: function() {
        if (this.props.test) {
            return this.props.children;
        }
        else {
            return false;
        }
    }
});

var isAuthenticated = false;

module.exports = React.createClass({
    login: function(e) {
        alert("hello there");
    },
    render: function() {
        return (
            <header className="container-fluid">
	            <div className="row">
	                <div className="column-6 push-2">
	                    <h1>Coot Freight Ltd</h1>
	                </div>
	                <If test={isAuthenticated}>
	                	{Buttons}
	                	{Navbar}
	                </If>
	            </div>
	        </header>
        );
    }
})