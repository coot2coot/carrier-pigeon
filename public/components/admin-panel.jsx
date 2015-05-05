module.exports = function(React, Link, ordersUrl) {
	var Header = require("./header.jsx")(React, Link);

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
	            ]
          	};
        },
		componentDidMount: function() {
			// var getOrderUrl = "/orders/get";

			// if (window.location.href.indexOf('true') > -1 ) {
			// 	getOrderUrl = "/orders/get/nocache"
			// }

		 //    $.get(getOrderUrl, function(result) {
		 //    	if(result !== ""){
			//     	var order = JSON.parse(result);

			//       	if (this.isMounted()) {
			//         	this.setState({
			//           		orders : order,
			//           		lastJobNo : sortJobIds(order)
			//         	});
			//       	}
			//     }
		 //    }.bind(this))
		 //    .fail(function () {
		 //    	"get request failed"
		 //    });
		},
		render: function() {
			var orderHandler = this.orderHandler;
			var addInvoiceHandler = this.addInvoice;
			return (
				<div>
					<Header />
					<div className="column-12 push-2 model-generic">
						<div className="panel-header">
							<h3>Users</h3>
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
									<h5>Delete</h5>
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
													<p>{user.invitation}</p> {/* Accepted or pending */}
												</td>
												<td key={i + "sixth"}>
													<input type="submit" className="button charcoal full" value="Delete"/>
												</td>
											</tr>
							    })}
							</table>
						</div>
					</div>
				</div>
			);
		}
	})
}
