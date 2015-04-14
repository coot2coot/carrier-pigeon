module.exports = function(React, Link, ordersUrl) {

	return React.createClass({
		render: function() {
			return (
				<div className="overlay">
					<div className="column-10 push-3 model-generic model-top create-order">
						<div className="panel-header">
							<h3>New Entry</h3>
							<a className="close" onClick={this.props.closeView}>x</a>
						</div>
						<div className="panel-body">
							<form action="/order/post" method="POST">
								<div className="row gutters">
									<div className="column-5">
										<p>Date</p>
										<input type="date" name="date" />

										<p>Job No.</p>
										<input type="text" name="job_number" />

										<p>Unit Type</p>
										<input type="text" name="unit_type" />

										<p>Qty</p>
										<input type="number" name="unit_quatity" />

										<p>Client</p>
										<input type="text" name="client" />

										<p>Vendor</p>
										<input type="text" name="vendor" />

										<p>Loading reference</p>
										<input type="text" name="loading_reference" />

										<p>Unit Number</p>
										<input type="text" name="unit_number" />
									</div>

									<div className="column-6">
										<p>Collection From</p>
										<input type="text" className="big" name="collect_from" />

										<div className="row">
											<div className="column-8">
												<p>Date</p>
												<input type="date" name="collection_date" />
											</div>
											<div className="column-8">
												<p>Time</p>
												<input type="text" name="collection_time" />
											</div>
										</div>

										<p>Contact details</p>
										<input type="text" name="contact_details" />

										<p>Deliver to</p>
										<input type="text" className="big" name="deliver_to" />

										<p>Commodity details</p>
										<input type="text" name="commodity_details" />

										<p>Special Instructions</p>
										<input type="text" name="special_instructions" />
									</div>

									<div className="column-5">
										<p>Shipper</p>
										<input type="text" className="big" name="shipper" />

										<p>Consignee</p>
										<input type="text" className="big" name="consignee" />

										<p>Notify</p>
										<input type="text" className="big" name="notify" />

										<p>Remarks</p>
										<input type="text" className="big" name="remarks" />

										<input type="submit" className="button charcoal" value="Done" />
									</div>
								</div>
							</form>
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