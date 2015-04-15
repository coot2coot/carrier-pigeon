var currentDate = function () {
    var today = new Date();

    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }

    var todayDate = yyyy + "-" + mm + "-" + dd;
    return todayDate;
}

var getJobNumber = function (id) {
    var getYear = new Date().getFullYear() + ''; 
    year = getYear.slice(-2);
    
    var newId;

    console.log(id, year);
  
    if (id.slice(0, 2) === year) {
      newId = Number(id) + 1 + '';
      console.log('year!' )
    } else {
      newId = year + "0000";
    }
  	return newId;
};

module.exports = function(React, Link, ordersUrl) {

	return React.createClass({
		getInitialState: function() {
		    return {
		    	dateValue: currentDate(), 
		    	jobNo: getJobNumber(this.props.jobNo)
		    };
		 },
		onDateChange: function(event) {
	    	this.setState({
	    		dateValue: event.target.value
	    	});
	  	},

		render: function() {
			var today = currentDate();
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
										<input type="date" name="date" value={this.state.dateValue} onChange={this.onDateChange}/>

										<p>Job No.</p>
										<input type="text" name="job_number" value={this.state.jobNo} readOnly/>

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
												<input type="number" name="unit_quatity" />
											</div>
										</div>

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
											<div className="column-10">
												<p>Date</p>
												<input type="date" name="collection_date" />
											</div>
											<div className="column-6">
												<p>Time</p>
												<input type="time" name="collection_time" />
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
