/** @jsx React.DOM */

var React  = require('react');

var Header 		  = require("../header/header.jsx");
var Warning 	  = require("../warning.jsx");
var Error 		  = require("../error-message.jsx");
var SettingsLinks = require("./settings-links.jsx");
var ChangeDetails = require("./user-details-change.jsx");
var AddUnitType	  = require("./add-unit-type.jsx");

var settings = React.createClass({
	getInitialState: function() {
      	return {
	        user: {
	        	first_name : "",
	        	last_name: "",
	        	username: "",
	        	password: "",
	        	admin: "",
	        	email: ""
	        },
	        currentPath: ""
      	};
    },

    isAdmin: function(user) {
    	this.setState({
    		admin: user.admin,
    		user: user
    	})
    },
 
	componentDidMount: function() {
		var router = this._reactInternalInstance._context.router;
		var routeName = router.getCurrentRoutes()[1].name

		routeName = router.getCurrentRoutes().length === 3
					? router.getCurrentRoutes()[2].name
					: router.getCurrentRoutes()[1].name

		this.setState({
    		currentPath: routeName
    	})
	},

	componentWillReceiveProps: function() {
		var router = this._reactInternalInstance._context.router;
		var routeName = router.getCurrentRoutes()[1].name

		routeName = router.getCurrentRoutes().length === 3
					? router.getCurrentRoutes()[2].name
					: router.getCurrentRoutes()[1].name

		this.setState({
    		currentPath: routeName
    	})
	},

	setUser: function(user) {
		this.setState({
			user: user
		})
	},

	render: function() {
		return (
			<div>
				<Header isAdmin={this.isAdmin} setUser={this.setUser}/>
				<div className="column-10 push-3 model-generic">
					<div className="panel-header">
						<h3>Account</h3>
					</div>
					<div className="panel-body settings">
						<div className="column-6 setting-nav">
							<SettingsLinks admin={this.props.admin} changeUrl={this.urlChange}/>
						</div>
						<div className="column-10">
							{( this.state.currentPath === "settings"
								? <ChangeDetails user={this.state.user}/>
								: this.state.currentPath === "AddUnitType" && this.state.user.admin
								? <AddUnitType/>
								: <p></p>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
})

module.exports = settings;