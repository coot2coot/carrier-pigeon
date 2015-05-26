/** @jsx React.DOM */

var React = require('react');
var Warning = require("../close-warning.jsx");	

var addContact = React.createClass({
	getInitialState: function() {
	    return {
	    	valid: false,
	    	closeView: false,
	    	units: null
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

	render: function() {
		var contact = this.props.contact;
		return (
			<div className="overlay">
				<div className="column-12 push-2 model-generic model-top create-order">
					<div className="panel-header">
						<h3>New Entry</h3>
						<a className="close" onClick={this.closeView}>x</a>
					</div>
					<div className="panel-body scroll">
						<form action="/contact/post" method="POST">
							<div className="row gutters">
								<div>
									<div className="row">
										<div className="column-8">
											<p>Company Name</p>
											<input type="text" name="company_name" defaultValue={contact ? contact.company_name : ""} required/>
										</div>
										<div className="column-8">
											<p>VAT </p>
											<input type="text" name="vat_number" defaultValue={contact ? contact.vat_number : ""}/>
										</div>
									</div>
									<div className="row">
										<div className="column-16">
											<p>Address Line</p>
											<input type="text" name="address_line" defaultValue={contact ? contact.adress_line : ""} required/>
										</div>					
									</div>
									
									<div className="row">
										<div className="column-8">
											<p>City</p>
											<input type="text" name="city"  defaultValue={contact ? contact.city : ""} required/>
										</div>
										<div className="column-8">
											<p>Post Code</p>
											<input type="text" name="postcode"  defaultValue={contact ? contact.postcode : ""} required/>
										</div>
									</div>

									<div>
										<div className="column-8">
											<p>Country</p>
											<input type="text" name="country"  defaultValue={contact ? contact.country : ""} required/>
										</div>
										<div className="column-8">
											<p>Contact Name</p>
											<input type="text" name="name" defaultValue={contact ? contact.name : ""} required/>
										</div>
									</div>

									<div className="row">
										<div className="column-8">
											<p>Telephone</p>
											<input type="text" name="telephone" defaultValue={contact ? contact.telephone : ""}/>
										</div>
										<div className="column-8">
											<p>Email</p>
											<input type="email" name="email" defaultValue={contact ? contact.email : ""}/>
										</div>
									</div>
									
									<div className="row">
										<div className="column-8">
											<p>Remarks</p>
											<input type="text" name="remarks" defaultValue={contact ? contact.remarks : ""}/>
										</div>
										<div className="column-8">
											<p>Category</p>
											<input type="text" name="category" defaultValue={contact ? contact.category : ""}/>
										</div>
									</div>
									<div className="row">
										<div className="column-16">
											<p>Sales Report</p>
											<textarea className="big" max="500" name="sales_report" defaultValue={contact ? contact.sales_report : ""}/>
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

module.exports = addContact;