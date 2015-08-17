/** @jsx React.DOM */

var React = require('react');
var Units = require("./units.jsx");
var Warning = require("../close-warning.jsx");
var Error 	= require("../file-exists-error-message.jsx")
var ContactList = require("./contact-list.jsx");

var currentDate = require("../../lib/current-date.js");

var addOrder = React.createClass({

	getInitialState: function () {

		var unitsArray = this.props.units ? this.props.units : [{}];

	    return {
	    	dateValue: currentDate(),
	    	valid: false,
	    	unitsArr: unitsArray,
	    	closeView: false,
	    	edited: false,
	    	order: {},
	    	errorMessage: ''
	    };
	},

	closeView: function () {

		if ( this.state.closeView || !this.state.edited ) {

			this.props.closeView();

			this.setState({
	    		closeView: false
	    	});
	    } else {

		    this.setState({
	    		closeView: true
	    	});
		}
	},

	closeWarning: function () {

		this.setState({
	    	closeView: false
	    });
	},

  	addUnit: function (key) {

  		this.state.unitsArr.splice(key + 1, 0, {});
		
		var newState = this.state.unitsArr

  		this.setState({
    		unitsArr: newState
    	});
  	},

  	removeUnit: function (key) {  		

  		if (this.state.unitsArr.length > 1) {

			this.state.unitsArr.splice(key, 1);

			var newState = this.state.unitsArr;

	  		this.setState({
	    		unitsArr: newState
	    	});
	    }
  	},

  	ifEdited: function () {

  		if (!this.state.edited) {
  			this.state.edited = true;
  		}
  	},

  	onUnitChange: function (key, event) {

  		this.ifEdited();
  		var name = event.target.name;
		var value = event.target.value;
		this.state.unitsArr[key][name] = value;
  	},

  	getPolicy: function () {

  		var checkFile	= this.checkFile;

  		var getUrl = "/file-upload/policy";

  		$.get(getUrl, function (result) {

  			checkFile(result);
  		}).fail(function () {

			"get s3 policy did not work"
		});
  	},

  	checkFile: function (result) {

  		var upLoadFile 	= this.upLoadFile;
  		var fileName 	= document.querySelector('input[type=file]').files[0].name;
  		var that 		= this;

  		$.ajax({
			url: "http://carrier-pigeon-s3.s3.amazonaws.com/" + fileName,
			type: "HEAD"
		}).then(
		  	function () { 	

		  		that.setState({
		  			errorMessage: fileName + ' already exists try something new'
			  	})  
		  	},
		  	function () { 
		  		
		  		that.setState({
		  			errorMessage: ''
			  	}) 
			  	upLoadFile(result)
			}
		);

	},

  	upLoadFile: function (result) {

  		var data 	= JSON.parse(result);
  		var file    = document.querySelector('input[type=file]').files[0];
  		var reader  = new FileReader();

  		reader.onload = function (e) {

		  	var dataURL = reader.result;

			var fd = new FormData();
				fd.append('key', file.name);
				fd.append('acl', 'public-read');
				fd.append('Content-Type', file.type);
				fd.append('Content-Length', file.size);
				fd.append('AWSAccessKeyId', "AKIAIP2WE7XK6HTLZFBA");
				fd.append('policy', data.policy);
				fd.append('signature', data.signature);    
				fd.append("file", dataURL);

				$.ajax({
					type: 'POST',
					url: "http://carrier-pigeon-s3.s3.amazonaws.com",
					processData: false,
					contentType: false,
					data: fd,
					success: function (data) {

						console.log(data)
					},
					error: function (error) {

						console.log(error)
					}
				}); 
		}   
  		
  		reader.readAsDataURL(file);
  	},
  	
	render: function() {

		var order 		= this.props.copiedOrder;
		var addUnit 	= this.addUnit;
		var removeUnit 	= this.removeUnit;
		var today 		= currentDate();
		var edited 		= this.ifEdited;
		var onUnitChange= this.onUnitChange;

		return (
			<div className="overlay">
				<div className="column-14 push-1 model-generic model-top create-order">
					<div className="panel-header">
						<h3>New Entry</h3>
						<a className="close" onClick={this.closeView}>x</a>
					</div>
					<div className="panel-body scroll">
						<form action="/order/post" method="POST">
							<div className="row gutters">
								<div>
									<div className="row">
										<div className="column-3">
											<p>Date</p>
											<input type="date" name="date" min={today} defaultValue={this.state.dateValue} onChange={edited} required/>
										</div>
									</div>
									<div className="row">
										<div className="column-8">
											<p>Client</p>
											<ContactList contacts={this.props.contacts} required={true} property="company_name" contact={order && order.client ? order.client : ""} contactType="client" handleChange={edited} />
										</div>
										<div className="column-8">
											<p>Carrier </p>
											<ContactList contacts={this.props.contacts} required={false} property="company_name"  contact={order && order.carrier ? order.carrier : ""} contactType="carrier" handleChange={edited} />
										</div>
									</div>

									<div className="row units">


										{ this.state.unitsArr.map( function (unit, i) {
											var key = new Date().getMilliseconds() + i;
										    return <Units 
										    			unit={unit} 
										    			key={key} 
										    			keys= {i} 
										    			handleChange={onUnitChange} 
										    			addUnit={addUnit} 
										    			removeUnit={removeUnit} />;
										})}

									</div>

									<div className="row">
										<div className="column-8">
											<p>Collection From</p>
											<textarea type="text" name="collect_from" max='500' defaultValue={order && order.collect_from ? order.collect_from : ""} onChange={this.ifEdited}/>
										</div>	
										<div className="column-8">
											<p>Deliver To</p>
											<textarea name="deliver_to"  max='500' defaultValue={order && order.deliver_to ? order.deliver_to : ""} onChange={this.ifEdited}/>
										</div>					
									</div>
									
									<div className="row">
										<div className="column-8">
											<p>Special Instructions</p>
											<textarea name="special_instructions"  max='500' defaultValue={order && order.special_instructions ? order.special_instructions : ""} onChange={this.ifEdited}/>
										</div>
										<div className="column-8">
											<p>Remarks</p>
											<textarea name="remarks" max='500' defaultValue={order && order.remarks ? order.remarks : ""} onChange={this.ifEdited}/>
										</div>
									</div>

									<div className="row">
										<div className="column-3">
											<p>Port of Loading</p>
											<input type="text" name="port_of_loading" defaultValue={order && order.port_of_loading ? order.port_of_loading : ""} onChange={this.ifEdited}/>
										</div>
										<div className="column-3">
											<p>Port of Discharge</p>
											<input type="text" name="port_of_discharge" defaultValue={order && order.port_of_discharge ? order.port_of_discharge : ""} onChange={this.ifEdited}/>
										</div>
										<div className="column-4">
											<p>Vessel</p>
											<input type="text" name="vessel" onChange={this.ifEdited}/>
										</div>
										<div className="column-3">
											<p>ETS</p>
											<input type="date" name="ets" onChange={this.ifEdited}/>
										</div>
										<div className="column-3">
											<p>ETA</p>
											<input type="date" name="eta" onChange={this.ifEdited}/>
										</div>
									</div>
									
									<div className="row">
										<div className="column-5">
											<p>Shipper</p>
											<textarea name="shipper" max='500' defaultValue={order && order.shipper ? order.shipper : ""} onChange={this.ifEdited}/>
										</div>
										<div className="column-5">
											<p>Consignee</p>
											<textarea name="consignee" max='500' defaultValue={order && order.consignee? order.consignee : ""} onChange={this.ifEdited}/>
										</div>
										<div className="column-6">
											<p>Notify</p>
											<textarea name="notify" max='500' defaultValue={order && order.notify ? order.notify : ""} onChange={this.ifEdited}/>
										</div>
									</div>
									<div className="row">
										{this.state.errorMessage !== ''
                    						? <div><p>Upload file</p><Error message={this.state.errorMessage}/></div>
                    						: <p>Upload file </p>
                    					}
										<input name='file' type='file' onChange={this.ifEdited}/>
										<input className="button charcoal" onClick= {this.getPolicy}/>
									</div>
									<input type="submit" className="button charcoal" value="Done" />
								</div>
							</div>
						</form>
					</div>
				</div>
				{(this.state.closeView
                    ? <Warning message="Do you want to close without saving?" closeView={this.closeView} closeWarning={this.closeWarning}/>
                    :<p></p>
                )}
			
			</div>
		);
	}
})

module.exports = addOrder;
