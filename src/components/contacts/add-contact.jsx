var React 			= require('react');
var Warning 		= require("../close-warning.jsx");	
var AddReminders 	= require("../reminders/add-reminder.jsx");
var contactStore	= require("../../lib/store-contacts.js");
var PContactList 	= require("./people-contact-list.jsx");

var addContact = React.createClass({

	getInitialState: function () {

	    return {
	    	valid: false,
	    	closeView: false,
	    	units: null
	    };
	},

	closeView: function () {

		if (this.state.closeView){
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

	componentDidMount: function () {

	    var form = document.querySelectorAll("[action= '/contact/post']")[0]
		form.addEventListener("submit", contactStore.refresh, false);  
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
										<div className="column-5">
											<p>Company Name</p>
											<input type="text" name="company_name" defaultValue={contact ? contact.company_name : ""} required/>
										</div>
										<div className="column-5">
											<p>VAT </p>
											<input type="text" name="vat_number" defaultValue={contact ? contact.vat_number : ""}/>
										</div>
										<div className="column-6">
											<p>Category</p>
											<input type="text" name="category" defaultValue={contact ? contact.category : ""}/>
										</div>
									</div>

									<div className="row">
										<div className="column-10">
											<p>Address Line</p>
											<input type="text" name="address_line" defaultValue={contact ? contact.address_line : ""}/>
										</div>	
										<div className="column-6">
											<p>City</p>
											<input type="text" name="city"  defaultValue={contact ? contact.city : ""} />
										</div>				
									</div>
									
									<div className="row">
										<div className="column-5">
											<p>County</p>
											<input type="text" name="county"  defaultValue={contact ? contact.county : ""} />
										</div>
										<div className="column-5">
											<p>Post Code</p>
											<input type="text" name="postcode"  defaultValue={contact ? contact.postcode : ""} />
										</div>
										<div className="column-6">
											<p>Country</p>
											<input type="text" name="country"  defaultValue={contact ? contact.country : ""} />
										</div>
									</div>

									<PContactList contacts={[contact]}/>
									
									<div className="row">
										<div className="column-16">
											<p>Remarks</p>
											<textarea type="text" className="small" name="remarks" defaultValue={contact ? contact.remarks : ""} max="500"/>
										</div>
									</div>

									<div className="row">
										<div className="column-16">
											<p>Sales Report</p>
											<textarea className="big" max="500" name="sales_report" defaultValue={contact ? contact.sales_report : ""}/>
										</div>
									</div>
									<div className="row">
										<div className="column-16">
											<p>Reminders</p>
										</div>
									</div>
									<AddReminders/>
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