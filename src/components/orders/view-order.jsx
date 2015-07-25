/** @jsx React.DOM */

var React  	= require('react/addons');
var Router  = require('react-router');
var Link   	= Router.Link;

var Close 	= require("../close-warning.jsx");
var Units 	= require("./view_units.jsx");
var Warning = require("../warning.jsx");
var ContactList= require("./contact-list.jsx");

var getJobNumber = require("../../lib/format-job-number.js");

var viewOrder = React.createClass({

	getInitialState: function() {

      return {
        viewing: true,
        units: [],
        deletedUnits: "",
        closeView: false,
        edited: false
      };
    },

    closeDeleteView: function() {

    	this.setState({
    		deleteOrder: false
    	})
	},

    closeView: function() {

    	if (this.state.viewing || !this.state.edited) {
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
			deleteOrder: item
		})
	},

	addUnit: function(key) {

		this.state.units.splice(key + 1, 0, {});

		var newState = this.state.units;

  		this.setState({
    		units: newState
    	});
  	},
	
	removeUnit: function (key) {

		if (this.state.units.length > 1) {
			var deleteUnit = this.state.units.splice(key, 1);
  			var newState = this.state.units;

  			this.setState({
				units: newState,
			});

			if (deleteUnit[0].unit_id	) {
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

	    	if (result !== "") {
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
		if (this.state.viewing === true) {
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

	ifEdited: function(event) {

  		if (!this.state.edited) {
  			this.setState({
	  			edited: true
	  		})
  		}
  	},

  	onUnitChange: function (key, event) {

		this.ifEdited();
		var name = event.target.name;
		var value = event.target.value;
		this.state.units[key][name] = value;
	},

	render: function() {
		
		var addUnit = this.addUnit;
		var removeUnit = this.removeUnit;
		var viewing = this.state.viewing;
		var edited = this.ifEdited;
		var onUnitChange = this.onUnitChange;

		var cx = React.addons.classSet;
		var rowClasses = cx({
		    'row': true,
		    'border-bottom': viewing
		});

		return (
			<div className="overlay">
				<div>
					{( this.state.deleteOrder
	                    ? <Warning message="Delete this order?" order={this.props.order} url={"/order/delete/" + this.props.order.job_number} closeView={this.closeDeleteView}/>
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
										<input className="view_input" type="date" name="date" defaultValue={ this.props.order.date.substring(0, 10)} onChange={edited} disabled required/>
									</div>
									<div className="column-8" >
										<p>Job No.</p>
										<input type="text" className="job_no" value={getJobNumber(this.props.order.job_number)} onChange={edited} readOnly />
										<input type="text" className="display-none"  name="job_number" value={this.props.order.job_number} onChange={edited}/>
									</div>
								</div>

								<div className={rowClasses}>
									<div className="column-8">
										<p>Client</p>
										<ContactList required={true} vieworder={true} property="company_name" contact={this.props.order.client} contactType="client" handleChange={edited}/>
									</div>
									<div className="column-8">
										<p>Carrier </p>
										<ContactList required={false} vieworder={true} property="company_name" contact={this.props.order.carrier} contactType="carrier" handleChange={edited}/>
									</div>
								</div>

								<div className="row units">

									{ this.state.units.map( function (unit, i) {
										var key = new Date().getMilliseconds() + i;
									    return <Units 
									    			unit={unit} 
									    			key={key} 
									    			keys={i}  
									    			viewing={viewing} 
									    			handleChange={onUnitChange} 
									    			addUnit={addUnit} 
									    			removeUnit={removeUnit} />;
									})}

								</div>

								<div className={rowClasses}>
									<div className="column-8">
										<p>Collection From</p>
										<textarea className="view_input" type="text" defaultValue={this.props.order.collect_from} name="collect_from" max="500" onChange={edited} disabled />
									</div>
									<div className="column-8">
										<p>Deliver To</p>
										<textarea className="view_input" type="text" defaultValue={this.props.order.deliver_to} name="deliver_to" disabled max='500' onChange={edited} />
									</div>
								</div>

								<div className={rowClasses}>
									<div className="column-8">
										<p>Special Instructions</p>
										<textarea className="view_input" type="text" defaultValue={this.props.order.special_instructions} name="special_instructions" disabled max='500' onChange={edited}/>
									</div>
									<div className="column-8">
										<p>Remarks</p>
										<textarea className="view_input" type="text" defaultValue={this.props.order.remarks} name="remarks" disabled max ='500' onChange={edited}/>
									</div>
								</div>

								<div className={rowClasses}>
									<div className="column-3">
										<p>Port of Loading</p>
										<input className="view_input" type="text" name="port_of_loading" defaultValue={this.props.order.port_of_loading} onChange={edited} disabled/>
									</div>
									<div className="column-3">
										<p>Port of Discharge</p>
										<input className="view_input" type="text" name="port_of_discharge" defaultValue={this.props.order.port_of_discharge} onChange={edited} disabled/>
									</div>
									<div className="column-4">
										<p>Vessel</p>
										<input className="view_input" type="text" name="vessel" defaultValue={this.props.order.vessel} onChange={edited} disabled/>
									</div>
									<div className="column-3">
										<p>ETS</p>
										<input className="view_input" type="date" name="ets" defaultValue={this.props.order.ets ? this.props.order.ets.substring(0, 10) : "" } onChange={edited} disabled/>
									</div>
									<div className="column-3">
										<p>ETA</p>
										<input className="view_input" type="date" name="eta" defaultValue={this.props.order.eta ? this.props.order.eta.substring(0, 10) : ""} onChange={edited} disabled/>
									</div>
								</div>

								<div className="row">
									<div className="column-5">
										<p>Shipper</p>
										<textarea className="view_input" type="text" defaultValue={this.props.order.shipper} name="shipper" disabled max ='500' onChange={edited}/>
									</div>
									<div className="column-5">
										<p>Consignee</p>
										<textarea className="view_input" type="text" defaultValue={this.props.order.consignee} name="consignee" disabled max ='500' onChange={edited}/>
									</div>
									<div className="column-6">
										<p>Notify</p>
										<textarea className="view_input" type="text" defaultValue={this.props.order.notify} name="notify" disabled max ='500' onChange={edited}/>
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
