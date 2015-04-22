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
			var readOnly = document.getElementsByClassName('viewInput');
			if(this.state.editing === true){
				for (var prop in readOnly){
					readOnly[prop].readOnly = false;
					this.setState({
						editing: false
					})
				}
			} else {
				for (var prop in readOnly){
					readOnly[prop].readOnly = true;
					this.setState({
						editing: true
					})
				}
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
										<input className="viewInput" type="date" name="date" defaultValue={ this.props.order.date.substring(0, 10)} readOnly />

										<p>Job No.</p>
										<input type="text"  name="job_number" defaultValue={this.props.order.job_number} readOnly/>

										<div className="row">
											<div className="column-10">
												<p>Unit Type</p>
												<select name="unit_type">
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
												<input className="viewInput" type="number"    defaultValue={this.props.order.unit_quatity} name="unit_quatity" readOnly />
											</div>
										</div>

										<p>Client</p>
										<input className="viewInput" type="text" defaultValue= {this.props.order.client} name="client" readOnly />

										<p>Vendor</p>
										<input className="viewInput" type="text"  defaultValue={this.props.order.vendor} name="vendor" readOnly />

										<p>Loading reference</p>
										<input className="viewInput"  type="text"   defaultValue= {this.props.order.loading_reference} name="loading_reference" readOnly/>

										<p>Unit Number</p>
										<input className="viewInput" type="text"    defaultValue={this.props.order.unit_number} name="unit_number" readOnly />
									</div>

									<div className="column-6">
										<p>Collection From</p>
										<input className="viewInput big" type="text"  big defaultValue={this.props.order.collect_from} name="collect_from" readOnly />

										<div className="row">
											<div className="column-10">
												<p>Date</p>
												<input className="viewInput" type="date"  defaultValue={this.props.order.collection_date} name="collection_date" readOnly/>
											</div>
											<div className="column-6">
												<p>Time</p>
												<input className="viewInput" type="time"  defaultValue={this.props.order.collection_time} name="collection_time" readOnly />
											</div>
										</div>

										<p>Contact details</p>
										<input className="viewInput" type="text" defaultValue={this.props.order.contact_details} name="contact_details" readOnly />

										<p>Deliver to</p>
										<input className="viewInput big" type="text" defaultValue={this.props.order.deliver_to} name="deliver_to" readOnly />

										<p>Commodity details</p>
										<input className="viewInput" type="text"  defaultValue={this.props.order.commodity_details} name="commodity_details" readOnly/>

										<p>Special Instructions</p>
										<input className="viewInput" type="text"  defaultValue={this.props.order.special_instructions} name="special_instructions" readOnly />
									</div>

									<div className="column-5">
										<p>Shipper</p>
										<input className="viewInput big" type="text"   defaultValue={this.props.order.shipper} name="shipper" readOnly />

										<p>Consignee</p>
										<input className="viewInput big" type="text"   defaultValue={this.props.order.consignee} name="consignee" readOnly />

										<p>Notify</p>
										<input className="viewInput big" type="text"  defaultValue={this.props.order.notify} name="notify" readOnly />

										<p>Remarks</p>
										<input className="viewInput big" type="text"   defaultValue={this.props.order.remarks} name="remarks"  readOnly/>

										<input className="viewInput" type="submit"   className="button charcoal" defaultValue="Update"  readOnly/>
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
