/** @jsx React.DOM */

var React  = require('react/addons');

var nav = React.createClass({


    render: function() {
    	var cx = React.addons.classSet;
		var ordersClass = cx({
			'active': this._reactInternalInstance._context.router.isActive("orders")
		})
		var contactsClass = cx({
			'active': this._reactInternalInstance._context.router.isActive("contacts")
		})
		var remindersClass = cx({
			'active': this._reactInternalInstance._context.router.isActive("reminders")
		})
		
        return (
        	<nav className="nav">
			  	<ul>
			  		<a href="/#/orders">
			    		<li className={ordersClass}>
			    		
                            <img src="../img/nav/shipping.png" />
							<h5>Orders</h5>
                        
						</li>
					</a>
					<a href="/#/contacts">
						<li className={contactsClass}>
						
                            <img src="../img/nav/list.png" />
							<h5>Contacts</h5>
							
						</li>
					</a>
					<a href="/#/reminders">
						<li className={remindersClass}>
						
                            <img src="../img/nav/bell.png" />
							<h5>Reminders</h5>
							
						</li>
					</a>
			  	</ul>
			</nav>
        );
    }
})

module.exports = nav;
