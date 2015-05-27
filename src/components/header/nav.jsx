/** @jsx React.DOM */

var React  = require('react');
var Router = require('react-router');
var Link   = Router.Link;

var nav = React.createClass({
	contacts: function() {
		window.location.href = '/#/contacts'
	},
	orders: function() {
		window.location.href = '/#/orders'
	},
    render: function() {
        return (
        	<nav className="nav">
			  	<ul>
			    	<li>
			    		<div onClick={this.orders}>
                            <img src="../img/nav/shipping.png" />
							<h5>Orders</h5>
                        </div>
					</li>
					<li>
						<div onClick={this.contacts} >
                            <img src="../img/nav/list.png" />
							<h5>Contacts</h5>
                        </div>
					</li>
			  	</ul>
			</nav>
        );
    }
})

module.exports = nav;
