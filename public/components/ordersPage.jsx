function sortJobIds (nums) {
	var sorted = nums.sort(function (a, b) {
		return Number(b.job_number) - Number(a.job_number);
	});

	return sorted[0].job_number;
}


module.exports = function(React, Link, ordersUrl) {
	var Header = require("./header.jsx")(React, Link);
	var ViewOrder = require("./view-order.jsx")(React, Link);
	var CreateOrder = require("./add-order.jsx")(React, Link);

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
			var getOrderUrl = "/orders/get";

			if (window.location.href.indexOf('true') > -1 ) {
				getOrderUrl = "/orders/get/nocache"
			}

		    $.get(getOrderUrl, function(result) {
		    	if(result !== ""){
			    	var order = JSON.parse(result);

			      	if (this.isMounted()) {
			        	this.setState({
			          		orders : order,
			          		lastJobNo : sortJobIds(order)
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
				selectedOrder: null,
				creatingOrder: null
			})
		},

		orderHandler: function (item) {
			this.setState({
				selectedOrder: item
			})
		},

		addOrder: function () {
			this.setState({
				creatingOrder: true
			})
		},


		render: function() {
			var orderHandler = this.orderHandler;
			var addInvoiceHandler = this.addInvoice;
			return (
				<div>
					<Header />
					<div className="column-14 push-1 model-generic">
						<div className="panel-header">
							<h3>Orders</h3>
							<button data-tooltip="Add order" className="button blue add" onClick={this.addOrder}>+</button>
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
									<h5>carrier</h5>
								</th>
								<th>
									<h5>units</h5>
								</th>
							  		{ this.state.orders.map(function (order, i) {
								        return <tr>
								            		<td key={i + "first"}>
								            			<a onClick={orderHandler.bind(null, order)}>
								            				<p>{order.job_number}</p>
								            			</a>
								            		</td>
													<td key={i + "second"}>
														<a onClick={orderHandler.bind(null, order)}>
															<p>{order.client}</p>
														</a>
													</td>
													<td key={i + "third"}>
														<a onClick={orderHandler.bind(null, order)}>
															<p>{order.carrier}</p>
														</a>
													</td>
													<td key={i + "fourth"}>
														<a onClick={orderHandler.bind(null, order)}>
															<p>{order.number_of_units}</p>
														</a>
													</td>
												</tr>
								    })}
							</table>
						</div>
					</div>
					{(this.state.selectedOrder
                        ? <ViewOrder order={this.state.selectedOrder} closeView={this.onCloseComponent}/>
                        : this.state.creatingOrder
                        ? <CreateOrder jobNo={this.state.lastJobNo} closeView={this.onCloseComponent}/>
                        : <p></p>
                    )}
				</div>
			);
		}
	})
}
