
module.exports = function(React, Link) {
	var Header = require("./header.jsx")(React, Link);

	return React.createClass({
		getInitialState: function() {
          return {
            orders: [
	            {
	            	order_id : "",
	            	client: "",
	            	carrier: "",
	            	collect_from: "",
	            	deliver_to: ""
	            }
            ]
          };
        },

		componentDidMount: function() {
		    $.get("http://localhost:8000/server/getorders", function(result) {
		    	var order = JSON.parse(result);
		      	if (this.isMounted()) {
		        	this.setState({
		          		orders : order
		        	});
		      	}
		    }.bind(this));
		},

		render: function() {
			console.log("state", this.state.orders)
			return (
				<div>
					<Header />
					<div className="column-14 push-1 model-generic">
						<div className="panel-header">
							<h3>Orders</h3>
							<button className="button blue">+</button>
						</div>

						<div className="panel-body table-responsive model-overflow">
							<table className="table table-full">
								<th><h5>#</h5></th>
								<th><h5>Client</h5></th>
								<th><h5>Carrier</h5></th>
								<th><h5>Consignee</h5></th>
								<th><h5>Collect From</h5></th>
								<th><h5>Deliver To</h5></th>
							  		
							  		 {
								        this.state.orders.map(function (order) {
								            return <tr>
								            		<td><a><p>{order.order_id}</p></a></td>
													<td><a><p>{order.client}</p></a></td>
													<td><a><p>{order.carrier}</p></a></td>
													<td><a><p>{order.consignee}</p></a></td>
													<td><a><p>{order.collect_from}</p></a></td>
													<td><a><p>{order.deliver_to}</p></a></td>
													</tr>
								        })
								    }
							</table>
						</div>
					</div>
				</div>
			);
		}
	})
}

