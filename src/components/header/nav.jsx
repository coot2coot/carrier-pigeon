/** @jsx React.DOM */

var React  = require('react');
var Router = require('react-router');
var Link   = Router.Link;

var nav = React.createClass({

	stateChange: function (el) {
			var li = document.querySelectorAll(".nav li");
			console.log("new")

			if(el ==='order'){
				li[0].className = "state"
				li[1].className = ""
				li[2].className = ""
				window.location.href = "/#/orders"
			}else if(el === 'contact') {
				li[0].className = ""
				li[1].className = "state"
				li[2].className = ""
				window.location.href = "/#/contacts"
			}else {
				li[0].className = ""
				li[2].className = "state"
				li[1].className = "state"
				window.location.href = "/#/reminders"
			}
	},

    render: function() {
        return (
        	<nav className="nav" >
			  	<ul >
			    	<li  onClick={this.stateChange.bind(null,'order')} >	    		
                        <img src="../img/nav/shipping.png" />
						<h5>Orders</h5>
					</li>
					<li onClick={this.stateChange.bind(null,'contact')}>
                        <img src="../img/nav/list.png" />
						<h5>Contacts</h5>
					</li>	
					<li onClick={this.stateChange.bind(null,'reminder')}>
                        <img src="../img/nav/list.png" />
						<h5>Reminders</h5>
					</li>
			  	</ul>
			</nav>
        );
    }
})

module.exports = nav;
