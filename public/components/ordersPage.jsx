
module.exports = function(React, Link, ordersUrl) {
	var Header = require("./header.jsx")(React, Link);
	var ViewOrder = require("./view-order.jsx")(React, Link);
	return React.createClass({
		getInitialState: function() {
          return {
            orders: [
	            {
	            	job_number : "",
	            	client: "",
	            	carrier: "",
	            	collect_from: "",
	            	deliver_to: "",
	            	handler: ""
	            }
            ]
          };
        },

		componentDidMount: function() {
		    $.get( ordersUrl, function(result) {
		    	if(result !== ""){
			    	var order = JSON.parse(result);

			      	if (this.isMounted()) {
			        	this.setState({
			          		orders : order
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
				selectedOrder: null
			})
		},

		orderHandler: function (item) {
			this.setState({
				selectedOrder: item
			})
		},

		render: function() {
			var Handler = this.orderHandler;
			return (
				<div>
					<Header />
					<div className="column-14 push-1 model-generic">
						<div className="panel-header">
							<h3>Orders</h3>
							<button className="button blue add">+</button>
						</div>
						<div className="panel-body table-responsive model-overflow">
							<table className="table table-full">
								<th>
									<h5>Job No.</h5>
								</th>
								<th>
									<h5>Client</h5>
								</th>
								<th>
									<h5>Carrier</h5>
								</th>
								<th>
									<h5>Consignee</h5>
								</th>
								<th>
									<h5>Collect From</h5>
								</th>
								<th>
									<h5>Deliver To</h5>
								</th>
							  		{ this.state.orders.map(function (order, i) {
								        return <tr>
								            		<td key={i + "first"}>
								            			<a onClick={Handler.bind(null, order)}>
								            				<p>{order.job_number}</p>
								            			</a>
								            		</td>
													<td key={i + "second"}>
														<a onClick={Handler.bind(null, order)}>
															<p>{order.client}</p>
														</a>
													</td>
													<td key={i + "third"}>
														<a onClick={Handler.bind(null, order)}>
															<p>{order.carrier}</p>
														</a>
													</td>
													<td key={i + "fourth"}>
														<a onClick={Handler.bind(null, order)}>
															<p>{order.consignee}</p>
														</a>
													</td>
													<td key={i + "fith"}>
														<a onClick={Handler.bind(null, order)}>
															<p>{order.collect_from}</p>
														</a>
													</td>
													<td key={i + "sixth"}>
														<a onClick={Handler.bind(null, order)}>
															<p>{order.deliver_to}</p>
														</a>
													</td>
												</tr>
								    })}
							</table>
						</div>
					</div>
					{(this.state.selectedOrder
                        ? <ViewOrder order={this.state.selectedOrder} closeView={this.onCloseComponent}/>
                        : <p></p>
                    )}
				</div>
			);
		}
	})
}
