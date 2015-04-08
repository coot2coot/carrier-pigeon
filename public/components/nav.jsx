/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
    login: function(e) {
        alert("hello there");
    },
    render: function() {
        return (

        	<nav className="nav">
			  	<ul>
			    	<li>
				    	<a href="">
							<img src="../img/nav/shipping.png" />
							<h5>Orders</h5>
						</a>
					</li>
					<li>
				    	<a href="">
							<img src="../img/nav/list.png" />
							<h5>Contacts</h5>
						</a>
					</li>
					<li>
				    	<a href="">
							<img src="../img/nav/booking.png" />
							<h5>Reports</h5>
						</a>
					</li>
			  	</ul>
			</nav>
        );
    }
})