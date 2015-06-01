/** @jsx React.DOM */

var React = require('react');
var Units = require("./units.jsx");
var Warning = require("../close-warning.jsx");
var DataList = require("./data-list.jsx");

var currentDate = require("../../lib/current-date.js");

var addOrder = React.createClass({
	getInitialState: function() {
	    return {
	    	dateValue: currentDate(),
	    	valid: false,
	    	unitsArr: [0],
	    	closeView: false,
	    	units: null,
	    	edited: false
	    };
	},

	closeView: function() {
		if( this.state.closeView || !this.state.edited ){
			this.props.closeView();

			this.setState({
	    		closeView: false
	    	})
	    } else {
		    this.setState({
	    		closeView: true
	    	})
		}
	},

	closeWarning: function () {
		this.setState({
	    	closeView: false
	    })
	},

  	addUnit: function() {
		this.state.unitsArr.push(1)
		var newState = this.state.unitsArr

  		this.setState({
    		unitsArr: newState
    	});
  	},

  	removeUnit: function() {
  		if(this.state.unitsArr.length > 1){
			this.state.unitsArr.splice(-1,1)
			var newState = this.state.unitsArr

	  		this.setState({
	    		unitsArr: newState
	    	});
	    }
  	},

  	ifEdited: function(e) {
  		if (!this.state.edited) {
  			this.setState({
	  			edited: true
	  		})
  		}
  	},
  	
	render: function() {
		var order = this.props.copiedOrder;
		var units = this.props.units;
		var addUnit = this.addUnit;
		var removeUnit = this.removeUnit;
		var today = currentDate();
		var edited = this.ifEdited;

		return (
			<div className="overlay">
				<div className="column-12 push-2 model-generic model-top create-order">
					<div className="panel-header">
						<h3>New Entry</h3>
						<a className="close" onClick={this.closeView}>x</a>
					</div>
					<div className="panel-body scroll">
						<form action="/order/post" method="POST">
							<div className="row gutters">
								<div>
									<div className="row">
										<div className="column-8">
											<p>Date</p>
											<input type="date" name="date" min={today} defaultValue={order ? order.date.substring(0, 10) : this.state.dateValue} onChange={edited} required/>
										</div>
									</div>
									<div className="row">
										<div className="column-8">
											<p>Client</p>
											<DataList contacts={this.props.contacts} client={order ? order.client : ""} handleChange={edited} />
										</div>
										<div className="column-8">
											<p>Carrier </p>
											<DataList contacts={this.props.contacts} client={order ? order.carrier : ""} handleChange={edited} />
										</div>
									</div>
									<div className="row units">
										{
											this.state.unitsArr.map(function(num, i){
										        return <Units unit={units} key={i} handleChange={edited} />;
										   })
										}
										<div className="column-2">
											<button type="button"  className="button blue add-row units" onClick={addUnit}>+</button>
											<button type="button" className="button blue add-row units float-right" onClick={removeUnit}>-</button>
										</div>

									</div>

									<div className="row">
										<div className="column-8">
											<p>Collection From</p>
											<textarea type="text" className="big" name="collect_from" max='500' defaultValue={order ? order.collection_from : ""} onChange={this.ifEdited}/>
										</div>	
										<div className="column-8">
											<p>Deliver To</p>
											<textarea className="big" name="deliver_to"  max='500' defaultValue={order ? order.deliver_to : ""} onChange={this.ifEdited}/>
										</div>					
									</div>
									
									<div className="row">
										<div className="column-8">
											<p>Special Instructions</p>
											<textarea  name="special_instructions"  max='500' defaultValue={order ? order.special_instructions : ""} onChange={this.ifEdited}/>
										</div>
										<div className="column-8">
											<p>Remarks</p>
											<textarea   className="big" name="remarks" max='500' defaultValue={order ? order.remarks : ""} onChange={this.ifEdited}/>
										</div>
									</div>

									<div className="row">
										<div className="column-3">
											<p>Port of Loading</p>
											<input type="text" name="port_of_loading" defaultValue={order ? order.port_of_loading : ""} onChange={this.ifEdited}/>
										</div>
										<div className="column-3">
											<p>Port of Discharge</p>
											<input type="text" name="port_of_discharge" defaultValue={order ? order.port_of_discharge : ""} onChange={this.ifEdited}/>
										</div>
										<div className="column-4">
											<p>Vessel</p>
											<input type="text" name="vessel" defaultValue={order ? order.vessel : ""} onChange={this.ifEdited}/>
										</div>
										<div className="column-3">
											<p>ETS</p>
											<input type="date" name="ets" defaultValue={order ? order.ets.substring(0, 10) : ""} onChange={this.ifEdited}/>
										</div>
										<div className="column-3">
											<p>ETA</p>
											<input type="date" name="eta" defaultValue={order ? order.eta.substring(0, 10) : ""} onChange={this.ifEdited}/>
										</div>
									</div>
									
									<div className="row">
										<div className="column-5">
											<p>Shipper</p>
											<textarea  className="big" name="shipper" max='500' defaultValue={order ? order.shipper : ""} onChange={this.ifEdited}/>
										</div>
										<div className="column-5">
											<p>Consignee</p>
											<textarea className="big" name="consignee" max='500' defaultValue={order ? order.consignee : ""} onChange={this.ifEdited}/>
										</div>
										<div className="column-6">
											<p>Notify</p>
											<textarea  className="big" name="notify" max='500' defaultValue={order ? order.notify : ""} onChange={this.ifEdited}/>
										</div>
									</div>
									<input type="submit" className="button charcoal" value="Done" />
								</div>
							</div>
						</form>
					</div>
				</div>
				{(this.state.closeView
                    ? <Warning message="Do you want to close without saving?" closeView={this.closeView} closeWarning={this.closeWarning}/>
                    : <p></p>
                )}
			
			</div>
		);
	}
})

module.exports = addOrder;
