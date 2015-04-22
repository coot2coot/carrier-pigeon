module.exports = function(React, Link, ordersUrl) {

	return React.createClass({
		getInitialState: function() {
          return {
            editing: true
          };
        },
		deleteMe: function (item) {
			this.setState({
				deleteOrder: item
			})
		},
		edit: function () {
			var disabled = document.getElementsByClassName('view_input');
			if(this.state.editing === true){
				for (var prop in disabled){
					disabled[prop].disabled = false;
					disabled[prop].className += " edit"
				}
				this.setState({
						editing: false
				});
			} else {
				for (var prop in disabled){
					disabled[prop].disabled = true;

					if(disabled[prop].className){
						disabled[prop].className = disabled[prop].className.replace('edit', '');
					}

				}
				this.setState({
						editing: true
				});
			}
		},

		render: function() {
			return (

				<div className="overlay">
					<div className="column-10 push-3 model-generic model-top view-order">
						<div className="panel-header">
							<h3>{this.props.order.job_number}</h3>
							<a className="button blue" href={"/order/delete/" + this.props.order.job_number}>Delete</a>
							<button className="button blue" onClick = {this.edit}  >Edit</button>
							<button className="button blue">Copy</button>
							<button className="button blue">Make a booking note</button>
							<a className="close" onClick={this.props.closeView}>x</a>
						</div>
						<div className="panel-body scroll">
							<form action="/order/edit" method="POST">
								<div className="row gutters">
									<div className="column-5">
										<p>Date</p>
										<input className="view_input" type="date" name="date" defaultValue={ this.props.order.date.substring(0, 10)} disabled />

										<p>Job No.</p>
										<input type="text"  name="job_number" defaultValue={this.props.order.job_number} disabled/>

										<div className="row">
											<div className="column-10">
												<p>Unit Type</p>
												<select className="view_input" name="unit_type" disabled>
												  	<option>40dc</option>
													<option>40hc</option>
													<option>40pw</option>
													<option>40fr</option>
													<option>40rc</option>
													<option>40ot</option>
													<option>20dc</option>
													<option>20tc</option>
													<option>20fr</option>
													<option>20rc</option>
													<option>20ot</option>
													<option>45pwhc</option>
													<option>45hc</option>
													<option>45rc</option>
													<option>40 mafi</option>
													<option>20 mafi</option>
													<option>Box trailer</option>
													<option>Taut liner</option>
													<option>Flat bed</option>
													<option>Groupage</option>
													<option>Airfreight</option>
												</select>
											</div>
											<div className="column-6">
												<p>Qty</p>
												<input className="view_input" type="number"    defaultValue={this.props.order.unit_quatity} name="unit_quatity" disabled />
											</div>
										</div>

										<p>Client</p>
										<input className="view_input" type="text" defaultValue= {this.props.order.client} name="client" disabled />

										<p>Vendor</p>
										<input className="view_input" type="text"  defaultValue={this.props.order.vendor} name="vendor" disabled />

										<p>Loading reference</p>
										<input className="view_input"  type="text"   defaultValue= {this.props.order.loading_reference} name="loading_reference" disabled/>

										<p>Unit Number</p>
										<input className="view_input" type="text"    defaultValue={this.props.order.unit_number} name="unit_number" disabled />
									</div>

									<div className="column-6">
										<p>Collection From</p>
										<input className="view_input big" type="text"  big defaultValue={this.props.order.collect_from} name="collect_from" disabled />

										<div className="row">
											<div className="column-10">
												<p>Date</p>
												<input className="view_input" type="date"  defaultValue={this.props.order.collection_date} name="collection_date" disabled/>
											</div>
											<div className="column-6">
												<p>Time</p>
												<input className="view_input" type="time"  defaultValue={this.props.order.collection_time} name="collection_time" disabled />
											</div>
										</div>

										<p>Contact details</p>
										<input className="view_input" type="text" defaultValue={this.props.order.contact_details} name="contact_details" disabled />

										<p>Deliver to</p>
										<input className="view_input big" type="text" defaultValue={this.props.order.deliver_to} name="deliver_to" disabled />

										<p>Commodity details</p>
										<input className="view_input" type="text"  defaultValue={this.props.order.commodity_details} name="commodity_details" disabled/>

										<p>Special Instructions</p>
										<input className="view_input" type="text"  defaultValue={this.props.order.special_instructions} name="special_instructions" disabled />
									</div>

									<div className="column-5">
										<p>Shipper</p>
										<input className="view_input big" type="text"   defaultValue={this.props.order.shipper} name="shipper" disabled />

										<p>Consignee</p>
										<input className="view_input big" type="text"   defaultValue={this.props.order.consignee} name="consignee" disabled />

										<p>Notify</p>
										<input className="view_input big" type="text"  defaultValue={this.props.order.notify} name="notify" disabled />

										<p>Remarks</p>
										<input className="view_input big" type="text"   defaultValue={this.props.order.remarks} name="remarks"  disabled/>

										<input className="button charcoal" type="submit" defaultValue="Update"  />
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
