/** @jsx React.DOM */

var React = require('react');
var Units = require("./units.jsx");
var Warning = require("../close-warning.jsx");

var currentDate = function () {
    var today = new Date();

    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if (dd < 10){
        dd='0'+dd
    }
    if (mm < 10) {
        mm='0'+mm
    }

    var todayDate = yyyy + "-" + mm + "-" + dd;
    return todayDate;
}	

var addOrder = React.createClass({
	getInitialState: function() {
	    return {
	    	dateValue: currentDate(),
	    	valid: false,
	    	unitsArr: [0],
	    	closeView: false
	    };
	},

	closeView: function() {
		if(this.state.closeView){
			this.props.closeView()
			this.setState({
	    		closeView: false
	    	})
	    }else{
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

	onDateChange: function(event) {
    	this.setState({
    		dateValue: event.target.value
    	});
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
  	
	render: function() {
		var addUnit = this.addUnit;
		var removeUnit = this.removeUnit;
		var today = currentDate();
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
										<div className="column-16">
											<p>Date</p>
											<input type="date" name="date" min={today} value={this.state.dateValue} onChange={this.onDateChange} required/>
										</div>
									</div>
									<div className="row">
										<div className="column-8">
											<p>Client</p>
											<input type="text" name="client" required/>
										</div>
										<div className="column-8">
											<p>Carrier </p>
											<input type="text" name="carrier"/>
										</div>
									</div>
									<div className="row units">
										{
											this.state.unitsArr.map(function(num, i){
										        return <Units key={i} />;
										   })
										}
										<div className="column-2">
											<button type="button"  className="button units" onClick = {addUnit}>+</button>
											<button type="button" className="button units float-right" onClick = {removeUnit}>-</button>
										</div>

									</div>

									<div className="row">
										<div className="column-8">
											<p>Collection From</p>
											<textarea type="text" className="big" name="collect_from" max='500'/>
										</div>	
										<div className="column-8">
											<p>Deliver To</p>
											<textarea className="big" name="deliver_to"  max = '500'/>
										</div>					
									</div>
									
									<div className="row">
										<div className="column-8">
											<p>Special Instructions</p>
											<textarea  name="special_instructions"  max = '500'/>
										</div>
										<div className="column-8">
											<p>Remarks</p>
											<textarea   className="big" name="remarks" max = '500' />
										</div>
									</div>

									<div className="row">
										<div className="column-3">
											<p>Port of Loading</p>
											<input type="text" name="port_of_loading" />
										</div>
										<div className="column-3">
											<p>Port of Discharge</p>
											<input type="text" name="port_of_discharge" />
										</div>
										<div className="column-4">
											<p>Vessel</p>
											<input type="text" name="vessel" />
										</div>
										<div className="column-3">
											<p>ETS</p>
											<input type="text" name="ets" />
										</div>
										<div className="column-3">
											<p>ETA</p>
											<input type="text" name="eta" />
										</div>
									</div>
									
									<div className="row">
										<div className="column-5">
											<p>Shipper</p>
											<textarea  className="big" name="shipper" max = '500'/>
										</div>
										<div className="column-5">
											<p>Consignee</p>
											<textarea className="big" name="consignee" max = '500'/>
										</div>
										<div className="column-6">
											<p>Notify</p>
											<textarea  className="big" name="notify" max = '500'/>
										</div>
									</div>
									<input type="submit" className="button charcoal" value="Done" />
								</div>
							</div>
						</form>
					</div>
				</div>
				{(this.state.closeView
                    ? <Warning message="If you close you will lose what you have done?" closeView={this.closeView} closeWarning={this.closeWarning}/>
                    : <p></p>
                )}
			
			</div>
		);
	}
})

module.exports = addOrder;
