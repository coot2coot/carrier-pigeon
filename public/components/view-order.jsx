module.exports = function(React, Link, ordersUrl) {

	return React.createClass({
		render: function() {
			return (
				<div className="overlay">
					<div className="column-10 push-3 model-generic model-top view-orders">
						<div className="panel-header">
							<h2>{this.props.order.job_number}</h2>
						</div>
						<div className="panel-body">
							<div className="column-16">
								<div className="column-4">
									<h5>Date:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.date}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>Unit Type/qty:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.unit_type}/{this.props.order.unit_quatity}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>client:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.client}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>Vendor:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.vendor}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>Loading Reference:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.loading_reference}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>Unit Number:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.unit_number}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>Collection From:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.collect_from}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>Collection Date/Time:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.collection_date}/{this.props.order.collection_time}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>Contact Details:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.contact_details}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>Deliver to:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.deliver_to}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>Commodity Details:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.commodity_details}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>Special Instructions:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.special_instructions}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>Shipper:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.shipper}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>Consignee:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.consignee}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>Notify:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.notify}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>Remarks:</h5>
								</div>
								<div className="column-12">
									<p>{this.props.order.remarks}</p>
								</div>
							</div>
							<div className="column-16">
								<div className="column-4">
									<h5>Invoice:</h5>
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

// job_number text NOT NULL,
//   date date,
//   unit_type text,
//   unit_quatity integer,
//   client text,
//   vendor text,
//   loading_reference text,
//   unit_number text,
//   collect_from text,
// collection_date
// collection_time
// contact_details
//   deliver_to text,
// commodity_details
//   special_instructions text,
//   shipper text,
//   consignee text,
//   notify text,
//   remarks text,
//   invoice boolean,