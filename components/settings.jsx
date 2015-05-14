/** @jsx React.DOM */

var React  	= require('react');

var Header 	= require("./header.jsx");
var Warning = require("./warning.jsx");
var Error 	= require("./error-message.jsx");

var settings = React.createClass({
	getInitialState: function() {
      return {
        user: {
        	first_name : "",
        	last_name: "",
        	username: "",
        	password: "",
        	email: ""
        }
      };
    },

	componentDidMount: function() {
		var url = "/user/get/" + this.props.params.username;

	    $.get(url, function(result) {
	    	if(result !== ""){
		    	var usr = JSON.parse(result);

		      	if (this.isMounted()) {
		        	this.setState({
		          		user : usr
		        	});
		      	}
		    }
	    }.bind(this))
	    .fail(function () {
	    	"get request failed"
	    });
	},

	render: function() {
		return (
			<div>
				<Header />
				<div className="column-10 push-3 model-generic">
					<div className="panel-header">
						<h3>Account</h3>
					</div>
					<div className="panel-body table-responsive model-overflow">
						<div className="column-6 setting-nav">
							<p>Update your details</p>
						</div>
						<div className="column-10">
							<form className="account" action={"/user/update/" + this.props.params.username} method="POST">
								<div>
									{(this.props.params.error
		                                ? <Error message="Sorry, your password isn't correct. Please try again." />
		                                : <p className="display-none"></p>
		                            )}
	                            </div>
								<p className="name">First name</p><p className="name">Last name</p>
								<input type="text" name="first_name" value={this.state.user.first_name} required />
								<input type="text" name="last_name" value={this.state.user.last_name} required />
								<br/>
								<p>Enter your current password</p><input type="password" name="current_password" required/>
								<p>Enter your new password</p><input type="password" name="new_password" required/>
								<p>Confirm your new password</p><input type="password" name="confirm_password" required/>
								<input type="submit" className="button charcoal" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
})

module.exports = settings;