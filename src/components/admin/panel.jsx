var React 		= require('react');

var Header 		= require("../header/header.jsx");
var Warning 	= require("../warning.jsx");
var Error 		= require("../error-message.jsx");
var Permissions = require("./permissions.jsx");

var adminPanel = React.createClass({
	getInitialState: function() {
      	return {
            users: [
	            {
	            	username: "",
	            	firstname: "",
	            	lastname: "",
	            	email: "",
	            	date_joined: "",
	            	email_sent: ""
	            }
            ],
            InviteUser: false
      	};
    },

	componentDidMount: function() {
		var getUsersUrl = "/users/get";

		if (window.location.href.indexOf('true') > -1 ) {
			getUsersUrl = "/users/get/nocache"
		}

	    $.get(getUsersUrl, function(result) {
	    	if(result !== ""){
		    	var userList = JSON.parse(result);

		      	if (this.isMounted()) {
		        	this.setState({
		          		users : userList
		        	});
		      	}
		    }
	    }.bind(this))
	    .fail(function () {
	    	"get request failed"
	    });
	},

	onCloseComponent: function () {
		this.setState({
			deleteUser: null,
			setPermissions: null
		})
	},

	deleteHandler: function (item) {
		this.setState({
			deleteUser: item
		})
	},

	permissionsHandler: function (item) {
		this.setState({
			setPermissions: item
		})
	},

	addUser: function () {
		this.setState({
			InviteUser: true
		})
	},

	setUser: function(user) {
		this.setState({
			user: user
		})
	},
	
	render: function() {
		var deleteHandler = this.deleteHandler;
		var permissionsHandler = this.permissionsHandler;

		return (
			<div>
				<Header setUser={this.setUser}/>
				<div className="column-12 push-2 model-generic">
					<div>

						{(this.props.params.error
                            ? <Error message="Sorry, a user has already been sent that email. Please try another one." />
                            : <p className="display-none"></p>
                        )}

                    </div>
					<div className="panel-header">
						<h3>Users</h3>

						{( this.state.InviteUser
							? <form className="email-invite" action="/user/invite" method="POST"><input type="text" placeholder="example@mail.com" name="email" /><input type="submit" className="button blue" value="Invite User"/></form>
							: <button data-tooltip="Invite new user" className="button blue add" onClick={this.addUser}>+</button>
						)}

					</div>
					<div className="panel-body table-responsive model-overflow">
						<table className="table table-full">
							<th>
								<h5 className="username">Username</h5>
							</th>
							<th>
								<h5>Name</h5>
							</th>
							<th>
								<h5>Invitation</h5>
							</th>
							<th></th>
							<th></th>
							
					  		{ this.state.users.map(function (user, i) {
					  			return <tr>
						            		<td key={i + "first"}>
						            			{( user.username.toLowerCase() === "test"
													? <p className="test-username">{user.username}</p>
													: <p>{user.username}</p>
												)}
						            		</td>
											<td key={i + "second"}>
												<p>{user.first_name} {user.last_name}</p>
											</td>
											<td key={i + "fourth"}>
												{( user.invitation
													? <p>Accepted</p>
													: <p><i>Pending</i></p>
												)}
											</td>
											<td>
												<a className="delete" onClick={permissionsHandler.bind(null, user)}>Permissions</a>
											</td>
											<td key={i + "sixth"}>
												{( user.username.toLowerCase() === "test"
													? <a className="delete test" onClick={deleteHandler.bind(null, user)}>Delete</a>
													: <a className="delete" onClick={deleteHandler.bind(null, user)}>Delete</a>
												)}
											</td>
										</tr>
						    })}

						</table>
					</div>
				</div>

				{(this.state.deleteUser
                    ? <Warning message="Delete this user?" user={ this.state.deleteUser } url={"/user/delete/" + this.state.deleteUser.username} closeView={this.onCloseComponent}/>
                    : this.state.setPermissions
                    ? <Permissions user={ this.state.setPermissions } closeView={ this.onCloseComponent }/>
                    : <p></p>
                )}

			</div>
		);
	}
})

module.exports = adminPanel;
