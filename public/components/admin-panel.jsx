module.exports = function(React, Link, ordersUrl) {
	var Header 	= require("./header.jsx")(React, Link);
	var Warning = require("./warning.jsx")(React, Link);

	return React.createClass({
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
				deleteUser: null
			})
		},
		deleteHandler: function (item) {
			this.setState({
				deleteUser: item
			})
		},
		addUser: function () {
			this.setState({
				InviteUser: true
			})
		},
		render: function() {
			var deleteHandler = this.deleteHandler;
			return (
				<div>
					<Header />
					<div className="column-12 push-2 model-generic">
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
									<h5>Username</h5>
								</th>
								<th>
									<h5>First name</h5>
								</th>
								<th>
									<h5>Last name</h5>
								</th>
								<th>
									<h5>Invitation</h5>
								</th>
								<th>
								</th>
						  		{ this.state.users.map(function (user, i) {
						  			return <tr>
							            		<td key={i + "first"}>
							            			<p>{user.username}</p>
							            		</td>
												<td key={i + "second"}>
													<p>{user.first_name}</p>
												</td>
												<td key={i + "third"}>
													<p>{user.last_name}</p>
												</td>
												<td key={i + "fourth"}>
													{( user.invitation
														? <p>Accepted</p>
														: <p><i>Pending</i></p>
													)}
												</td>
												<td key={i + "sixth"}>
													<a className="delete" onClick={deleteHandler.bind(null, user)}>Delete</a>
												</td>
											</tr>
							    })}
							</table>
						</div>
					</div>
					{(this.state.deleteUser
                        ? <Warning message="Delete this user?" user={this.state.deleteUser} closeView={this.onCloseComponent}/>
                        : <p></p>
                    )}
				</div>
			);
		}
	})
}
