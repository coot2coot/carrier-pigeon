/** @jsx React.DOM */

var React  	= require('react');

var Units 	= require("./view_units.jsx");
var Warning = require("./warning.jsx");

var getJobNumber = function (dbId) {
    var today = new Date();
  
	var id = ("0000" + dbId).slice(-4);
    var mm = ("0" + (today.getMonth()+1)).slice(-2);
    var yy = today.getFullYear().toString().slice(-2);
  
    return yy + mm + id;
}

var viewOrder = React.createClass({
	getInitialState: function() {
      return {
        editing: true,
        units: [],
        deletedUnits: ""
      };
    },

	deleteHandler: function (item) {
		this.setState({
			deleteUser: item
		})
	},

	onCloseComponent: function () {
		this.setState({
			deleteUser: null
		})
	},

	addUnit: function() {
		this.state.units.push(1)
		var newState = this.state.units

  		this.setState({
    		units: newState
    	});
  	},
  	
  	removeUnit: function() {
  		if(this.state.units.length > 1){
  			var deleteUnit = this.state.units.splice(-1,1);
  			var newState = this.state.units;
  			this.setState({
	    			units: newState,
	    		});
  			if(deleteUnit[0].unit_id){
  				var newDeletedStrng = this.state.deletedUnits + ',' + deleteUnit[0].unit_id ;
  				this.setState({
	    			deletedUnits: newDeletedStrng
	    		});
	
			}
	    }
  	},

	componentWillMount: function() {
		var getOrderUrl = "/units/" + this.props.order.job_number;

	    $.get(getOrderUrl, function(result) {
	    	if(result !== ""){
		    	var unit = JSON.parse(result);

		      	if (this.isMounted()) {
		        	this.setState({
		          		units : unit,
		        	});
		      	}
		    }
	    }.bind(this))
	    .fail(function () {
	    	"get units request failed"
	    });
	},

	edit: function () {
		var disabled = document.getElementsByClassName('view_input');
		if(this.state.editing === true){
			for (var prop in disabled){
				disabled[prop].disabled = false;
			}
			this.setState({
					editing: false
			});
		} else {
			for (var prop in disabled){
				disabled[prop].disabled = true;
			}
			this.setState({
					editing: true
			});
		}
	},

	render: function() {
		var addUnit = this.addUnit;
		var removeUnit = this.removeUnit;
		var editing = this.state.editing;
		return (

			<div className="overlay">
				<div>
					{( this.state.deleteUser
	                    ? <Warning message="Delete this order?" order={this.props.order} url={"/order/delete/" + this.props.order.job_number} closeView={this.onCloseComponent}/>
	                    : <p></p>
	                )}
                </div>
				<div className="column-10 push-3 model-generic model-top view-order">
					<div className="panel-header">
						<h3>{getJobNumber(this.props.order.job_number)}</h3>
						<a className="button blue" onClick={this.deleteHandler.bind(null, this.props.order)}>Delete</a>
						<button className="button blue" onClick = {this.edit}  >Edit</button>
						<button className="button blue">Copy</button>
						<button className="button blue">Make a booking note</button>
						<a className="close" onClick={this.props.closeView}>x</a>
					</div>
					<div className="panel-body scroll">
						<form action={"/order/edit/" + this.state.deletedUnits.slice(1)} method="POST">
							<div className="row gutters">
								<div>
									<div className="row">
										<div className="column-8" >
											<p>Date</p>
											<input className="view_input" type="date" name="date" defaultValue={ this.props.order.date.substring(0, 10)} disabled required/>
										</div>
										<div className="column-8" >
											<p>Job No.</p>
											<input type="text" className="job_no" value={getJobNumber(this.props.order.job_number)} readOnly />
											<input type="text" className="display-none"  name="job_number" value={this.props.order.job_number}/>
										</div>
									</div>

									<div className="row">

										{ this.state.units.map(function(unit, i){
										    return <Units unit={unit} key={i} editing = {editing} />;
										})}

										<div className="column-2">
											<button type="button" className="view_input button	units" onClick = {addUnit} disabled={editing ? true : false}>+</button>
											<button type="button" className="view_input button	units" onClick = {removeUnit} disabled={editing ? true : false}>-</button>
										</div>
									</div>
			
									<div className="row">
										<div className="column-8">
											<p>Client</p>
											<textarea className="view_input big" type="text"  defaultValue= {this.props.order.client}  name="client" disabled max='500' required/>
										</div>
										<div className="column-8">
											<p>Carrier </p>
											<input className="view_input" type="text"  defaultValue={this.props.order.carrier} name="carrier" disabled />
										</div>
										<div className="column-8">
											<p>Loading reference</p>
											<input className="view_input"  type="text"   defaultValue= {this.props.order.loading_reference} name="loading_reference" disabled/>
										</div>	
									</div>

									<div className="row">
										<div className="column-8">
											<p>Collection From</p>
											<textarea className="view_input big" type="text"  big defaultValue={this.props.order.collect_from} name="collect_from" max="500" disabled />
										</div>
										<div className="column-8">
											<p>City</p>
											<input className="view_input" type="text"  big defaultValue={this.props.order.city} name="city" disabled />
										</div>

										<div className="row column-8">
											<div className="column-8">
												<p>Date</p>
												<input className="view_input" type="date"  defaultValue={this.props.order.collection_date} name="collection_date" disabled/>
											</div>
											<div className="column-8">
												<p>Time</p>
												<input className="view_input" type="time"  defaultValue={this.props.order.collection_time} name="collection_time" disabled />
											</div>
										</div>
									</div>
									<div className="row">
										<div className="column-8">
											<p>Contact details</p>
											<textarea className="view_input big" type="text" defaultValue={this.props.order.contact_details} name="contact_details" max='500' disabled />
										</div>
										<div className="column-8">
											<p>Deliver to</p>
											<textarea className="view_input big" type="text" defaultValue={this.props.order.deliver_to} name="deliver_to" disabled max='500' />
										</div>
									</div>
									<div className="row">
										<div className="column-8">
											<p>Commodity details</p>
											<textarea className="view_input" type="text"  defaultValue={this.props.order.commodity_details} name="commodity_details" disabled max ='500'/>
										</div>
										<div className="column-8">
											<p>Special Instructions</p>
											<textarea className="view_input" type="text"  defaultValue={this.props.order.special_instructions} name="special_instructions" disabled max='500'/>
										</div>
									</div>


									<div className="row">
										<div className="column-8">
											<p>Shipper</p>
											<textarea className="view_input big" type="text"   defaultValue={this.props.order.shipper} name="shipper" disabled  max ='500'/>
										</div>
										<div className="column-8">
											<p>Consignee</p>
											<textarea className="view_input big" type="text"   defaultValue={this.props.order.consignee} name="consignee" disabled  max ='500'/>
										</div>
									</div>
									<div className="row">
										<div className="column-8">
											<p>Notify</p>
											<textarea className="view_input big" type="text"  defaultValue={this.props.order.notify} name="notify" disabled  max ='500'/>
										</div>
										<div className="column-8">
											<p>Remarks</p>
											<textarea className="view_input big" type="text"   defaultValue={this.props.order.remarks} name="remarks"  disabled max ='500'/>
										</div>
									</div>
									<input className="button charcoal" type="submit" value="Update" />
								</div>
							</div>
						</form>
					</div>
				</div>				
			</div>
		);
	}
})

module.exports = viewOrder;
