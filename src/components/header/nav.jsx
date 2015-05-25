/** @jsx React.DOM */

var React  = require('react');
var Router = require('react-router');
var Link   = Router.Link;

var nav = React.createClass({
    render: function() {
        return (
        	<nav className="nav">
			  	<ul>
			    	<li>
			    		<Link to="orders">
                            <img src="../img/nav/shipping.png" />
							<h5>Orders</h5>
                        </Link>
					</li>
					<li>
						<Link to="contacts">
                            <img src="../img/nav/list.png" />
							<h5>Contacts</h5>
                        </Link>
					</li>
			  	</ul>
			</nav>
        );
    }
})

module.exports = nav;
