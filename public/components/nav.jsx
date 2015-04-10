/** @jsx React.DOM */

module.exports = function(React, Link) {
	return React.createClass({
	    login: function(e) {
	        alert("hello there");
	    },
	    render: function() {
	        return (

	        	<nav className="nav">
				  	<ul>
				    	<li>
				    		<Link to = "orders">
                                <img src="../img/nav/shipping.png" />
								<h5>Orders</h5>
                            </Link>
						</li>
						<li>
							<Link to = "contacts">
                                <img src="../img/nav/list.png" />
								<h5>Contacts</h5>
                            </Link>
						</li>
						<li>
							<Link to = "reports">
                                <img src="../img/nav/booking.png" />
								<h5>Reports</h5>
                            </Link>
						</li>
				  	</ul>
				</nav>
	        );
	    }
	})
}