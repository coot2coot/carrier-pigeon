
module.exports = function(React, Link) {
	var Header = require("./header.jsx")(React, Link);

	return React.createClass({
		getOrders: function() {
			$.get(this.props.source, function(result) {
			 	var orders = result;
			 	this.setState({
			 		orders: orders
			 	});
			}.bind(this));
		},
		render: function() {
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
								<th><h5>Reference</h5></th>
								<th><h5>Date</h5></th>
								<th><h5>Consignee</h5></th>
								<th><h5>Loading Place</h5></th>
								<th><h5>Delivery Place</h5></th>
							  		<tr>
							  			<td><a><p></p></a></td>
										<td><a><p></p></a></td>
										<td><a><p></p></a></td>
										<td><a><p></p></a></td>
										<td><a><p></p></a></td>
										<td><a><p></p></a></td>
									</tr>
							</table>
						</div>
					</div>
				</div>
			);
		}
	})
}