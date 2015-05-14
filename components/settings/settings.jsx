/** @jsx React.DOM */

// TODO
// If an admin, then view add unit types page
// There you can view add different unit types.
// need to cache all unit types and update when above point happens
// If logged in, go to /#/orders, in not go to login page

var React  = require('react');

var Header 		  = require("../header.jsx");
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

		this.setState({
    		currentPath: router.getCurrentRoutes()[1].name
    	})

		// var url = "/user/get/" + this.props.params.username;

	 //    $.get(url, function(result) {
	 //    	if(result !== ""){
		//     	var usr = JSON.parse(result);

		//       	if (this.isMounted()) {
		//         	this.setState({
		//           		user : usr
		//         	});
		//       	}
		//     }
	 //    }.bind(this))
	 //    .fail(function () {
	 //    	"get request failed"
	 //    });
	},

	render: function() {
		return (
			<div>
				<Header isAdmin={this.isAdmin}/>
				<div className="column-10 push-3 model-generic">
					<div className="panel-header">
						<h3>Account</h3>
					</div>
					<div className="panel-body table-responsive model-overflow">
						<div className="column-6 setting-nav">
							<SettingsLinks admin={this.props.admin} />
						</div>
						<div className="column-10">
							{( this.state.currentPath === "settings"
								? <ChangeDetails user={this.state.user}/>
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