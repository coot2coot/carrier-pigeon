/** @jsx React.DOM */
var React = require('react');
var Navbar = require("./nav.jsx");

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

//TODO: Make this dependent on real authentication
var isAuthenticated = true;

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
	                {(isAuthenticated
				        ? <Buttons />     
				        : <div>Never showing false item</div>
				    )}
	            </div>
	            {(isAuthenticated
			        ? <Navbar />     
			        : <div>Never showing false item</div>
			    )}
	        </header>
        );
    }
})