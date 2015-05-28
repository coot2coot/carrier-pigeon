/** @jsx React.DOM */

var React  	= require('react/addons');
var Router  = require('react-router');
var Close = require("../close-warning.jsx");
var Link    = Router.Link;

var Units 	= require("./view_units.jsx");
var Warning = require("../warning.jsx");
var DataList = require("./data-list.jsx");

var getJobNumber = require("../../lib/format-job-number.js");

var viewOrder = React.createClass({
	getInitialState: function() {
      return {
        viewing: true,
        units: [],
        deletedUnits: "",
        closeView: false,

      };
    },

    closeView: function() {
    	if (this.state.viewing) {
    		this.props.closeView()
			this.setState({
	    		closeView: false
	    	})
    	}
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

	copyOrder: function () {
		this.props.copy(this.props.order, this.state.units);
	},

	closeWarning: function () {
		this.setState({
	    	closeView: false
	    })
	},

	deleteHandler: function (item) {
		this.setState({
			deleteUser: item
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
		if(this.state.viewing === true){
			for (var prop in disabled){
				disabled[prop].disabled = false;
			}
			this.setState({
				viewing: false
			});
		} else {
			for (var prop in disabled){
				disabled[prop].disabled = true;
			}
			this.setState({
				viewing: true
			});
		}
	},

	render: function() {
		var addUnit = this.addUnit;
		var removeUnit = this.removeUnit;
		var viewing = this.state.viewing;
		var cx = React.addons.classSet;
		var rowClasses = cx({
		    'row': true,
		    'border-bottom': viewing
		});

		return (

			<div className="overlay">
				<div>
					{( this.state.deleteUser
	                    ? <Warning message="Delete this order?" order={this.props.order} url={"/order/delete/" + this.props.order.job_number} closeView={this.onCloseComponent}/>
	                    : <p></p>
	                )}
                </div>
				<div className="column-12 push-2 model-generic model-top view-order">
					<div className="panel-header">
						<h3>{getJobNumber(this.props.order.job_number)}</h3>
						<a className="button blue" onClick={this.deleteHandler.bind(null, this.props.order)}>Delete</a>
						<a className="button blue" onClick={this.edit}  >Edit</a>
						<a className="button blue" onClick={this.copyOrder}>Copy</a>
						<Link className="button blue" to="booking-note" params={{job_no: this.props.order.job_number}}>Booking Request</Link>
						<a className="close" onClick={this.closeView}>x</a>
					</div>
					<div className="panel-body scroll">
						<form action={"/order/edit/" + this.state.deletedUnits.slice(1)} method="POST">
							<div className="row gutters">
								<div className={rowClasses}>
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

								<div className={rowClasses}>
									<div className="column-8">
										<p>Client</p>
										<DataList contacts={this.props.contacts} vieworder={true} client={this.props.order.client}/>
									</div>
									<div className="column-8">
										<p>Carrier </p>
										<input className="view_input" type="text"  defaultValue={this.props.order.carrier} name="carrier" disabled/>
									</div>
								</div>

								<div className="row units">

									{ this.state.units.map(function(unit, i){
									    return <Units unit={unit} key={i} viewing = {viewing} />;
									})}

									<div className="column-2">
										<button type="button" className="view_input button blue	units add-row" onClick = {addUnit} disabled={viewing ? true : false}>+</button>
										<button type="button" className="view_input button blue	units add-row" onClick = {removeUnit} disabled={viewing ? true : false}>-</button>
									</div>
								</div>

								<div className={rowClasses}>
									<div className="column-8">
										<p>Collection From</p>
										<textarea className="view_input big" type="text"  big defaultValue={this.props.order.collect_from} name="collect_from" max="500" disabled />
									</div>
									<div className="column-8">
										<p>Deliver To</p>
										<textarea className="view_input big" type="text" defaultValue={this.props.order.deliver_to} name="deliver_to" disabled max='500' />
									</div>
								</div>

								<div className={rowClasses}>
									<div className="column-8">
										<p>Special Instructions</p>
										<textarea className="view_input" type="text"  defaultValue={this.props.order.special_instructions} name="special_instructions" disabled max='500'/>
									</div>
									<div className="column-8">
										<p>Remarks</p>
										<textarea className="view_input big" type="text"   defaultValue={this.props.order.remarks} name="remarks"  disabled max ='500'/>
									</div>
								</div>

								<div className={rowClasses}>
									<div className="column-3">
										<p>Port of Loading</p>
										<input className="view_input" type="text" name="port_of_loading" disabled/>
									</div>
									<div className="column-3">
										<p>Port of Discharge</p>
										<input className="view_input" type="text" name="port_of_discharge" disabled/>
									</div>
									<div className="column-4">
										<p>Vessel</p>
										<input className="view_input" type="text" name="vessel" disabled/>
									</div>
									<div className="column-3">
										<p>ETS</p>
										<input className="view_input" type="text" name="ets" disabled/>
									</div>
									<div className="column-3">
										<p>ETA</p>
										<input className="view_input" type="text" name="eta" disabled/>
									</div>
								</div>

								<div className="row">
									<div className="column-5">
										<p>Shipper</p>
										<textarea className="view_input big" type="text"   defaultValue={this.props.order.shipper} name="shipper" disabled  max ='500'/>
									</div>
									<div className="column-5">
										<p>Consignee</p>
										<textarea className="view_input big" type="text"   defaultValue={this.props.order.consignee} name="consignee" disabled  max ='500'/>
									</div>
									<div className="column-6">
										<p>Notify</p>
										<textarea className="view_input big" type="text"  defaultValue={this.props.order.notify} name="notify" disabled  max ='500'/>
									</div>
								</div>
								<input className="button charcoal" type="submit" value="Update" />
							</div>
						</form>
					</div>
				</div>	
				{( this.state.closeView
                    ? <Close message="Do you want to close without saving?"  closeView={this.closeView} closeWarning={this.closeWarning}/>
                    : <p></p>
                )}			
			</div>
		);
	}
})

module.exports = viewOrder;
