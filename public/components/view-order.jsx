module.exports = function(React, Link, ordersUrl) {

	return React.createClass({
		deleteMe: function (item) {
			this.setState({
				deleteOrder: item
			})
		},

		render: function() {
			return (
				<div className="overlay">
					<div className="column-10 push-3 model-generic model-top view-order">
						<div className="panel-header">
							<h3>{this.props.order.job_number}</h3>
							<a className="button blue" href={"/order/delete/" + this.props.order.job_number}>Delete</a>
							<button className="button blue">Copy</button>
							<button className="button blue">Make a booking note</button>
							<a className="close" onClick={this.props.closeView}>x</a>
						</div>
						<div className="panel-body scroll">
							<div className="row">
								<div className="column-4">
									<h6>Date:</h6>
								</div>
								<div className="column-12">
									<p>{this.props.order.date.slice(0, 10)}</p>
								</div>
							</div>
							<div className="row">
								<div className="column-4">
									<h6>Unit Type:</h6>
								</div>
								<div className="column-4">
									<p>{this.props.order.unit_type}</p>
								</div>

								<div className="column-4">
									<h6>Qty:</h6>
								</div>
								<div className="column-4">
									<p>{this.props.order.unit_quatity}</p>
								</div>
							</div>

							<div className="row">
								<div className="column-4">
									<h6>client:</h6>
								</div>
								<div className="column-12">
									<p>{this.props.order.client}</p>
								</div>
							</div>
							<div className="row">
								<div className="column-4">
									<h6>Vendor:</h6>
								</div>
								<div className="column-12">
									<p>{this.props.order.vendor}</p>
								</div>
							</div>
							<div className="row">
								<div className="column-4">
									<h6>Loading Reference:</h6>
								</div>
								<div className="column-12">
									<p>{this.props.order.loading_reference}</p>
								</div>
							</div>
							<div className="row">
								<div className="column-4">
									<h6>Unit Number:</h6>
								</div>
								<div className="column-12">
									<p>{this.props.order.unit_number}</p>
								</div>
							</div>
							<div className="row">
								<div className="column-4">
									<h6>Collection From:</h6>
								</div>
								<div className="column-12">
									<p>{this.props.order.collect_from}</p>
								</div>
							</div>
							<div className="row">
								<div className="column-4">
									<h6>Collection Date:</h6>
								</div>
								<div className="column-4">
									<p>{this.props.order.collection_date}</p>
								</div>

								<div className="column-4">
									<h6>Time:</h6>
								</div>
								<div className="column-4">
									<p>{this.props.order.collection_time}</p>
								</div>
							</div>
							<div className="row">
								<div className="column-4">
									<h6>Contact Details:</h6>
								</div>
								<div className="column-12">
									<p>{this.props.order.contact_details}</p>
								</div>
							</div>
							<div className="row">
								<div className="column-4">
									<h6>Deliver to:</h6>
								</div>
								<div className="column-12">
									<p>{this.props.order.deliver_to}</p>
								</div>
							</div>
							<div className="row">
								<div className="column-4">
									<h6>Commodity Details:</h6>
								</div>
								<div className="column-12">
									<p>{this.props.order.commodity_details}</p>
								</div>
							</div>
							<div className="row">
								<div className="column-4">
									<h6>Special Instructions:</h6>
								</div>
								<div className="column-12">
									<p>{this.props.order.special_instructions}</p>
								</div>
							</div>
							<div className="row">
								<div className="column-4">
									<h6>Shipper:</h6>
								</div>
								<div className="column-12">
									<p>{this.props.order.shipper}</p>
								</div>
							</div>
							<div className="row">
								<div className="column-4">
									<h6>Consignee:</h6>
								</div>
								<div className="column-12">
									<p>{this.props.order.consignee}</p>
								</div>
							</div>
							<div className="row">
								<div className="column-4">
									<h6>Notify:</h6>
								</div>
								<div className="column-12">
									<p>{this.props.order.notify}</p>
								</div>
							</div>
							<div className="row">
								<div className="column-4">
									<h6>Remarks:</h6>
								</div>
								<div className="column-12">
									<p>{this.props.order.remarks}</p>
								</div>
							</div>
							<div className="row">
								<div className="column-4">
									<h6>Invoice:</h6>
								</div>
								<div className="column-12">
									<p>{this.props.order.invoice}</p>
								</div>
							</div>
						</div>
					</div>
				
				</div>
			);
		}
	})
}
