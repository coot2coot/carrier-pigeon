/** @jsx React.DOM */

var React  	= require('react/addons');
var Router  = require('react-router');
var Close 	= require("../close-warning.jsx");
var Warning = require("../warning.jsx");


var viewOrder = React.createClass({
	getInitialState: function() {
      return {
        viewing: true,
        closeView: false
      };
    },
    deleteHandler: function (item) {
		this.setState({
			deleteContact: item
		})
	},

	onCloseComponent: function () {
		this.setState({
			deleteContact: false
		})
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

	closeWarning: function () {
		this.setState({
	    	closeView: false
	    })
	},

	deleteHandler: function (item) {
		this.setState({
			deleteContact: item
		})
	},

	componentWillMount: function() {
		var getContactUrl = "/contacts/" + this.props.contact.contact_id;

	    $.get(getContactUrl, function(result) {
	    	if(result !== ""){
		    	var contact = JSON.parse(result);
		    	
		      	if (this.isMounted()) {
		        	this.setState({
		          		contacts : contact,
		        	});
		      	}
		    }
	    }.bind(this))
	    .fail(function () {
	    	"get units request failed"
	    });
	},

	edit: function () {
		if(this.state.viewing === true){
			this.setState({
				viewing: false
			});
		} else {
			this.setState({
				viewing: true
			});
		}
	},

	render: function() {
		var viewing = this.state.viewing;

		return (

			<div className="overlay">
				<div>
					{( this.state.deleteContact
	                    ? <Warning message="Delete this contact?" contact={this.props.contact} url={"/contacts/delete/" + this.props.contact.contact_id} closeView={this.onCloseComponent}/>
	                    : <p></p>
	                )}
                </div>
				<div className="column-12 push-2 model-generic model-top view-order">
					<div className="panel-header">
						<a className="button blue" onClick={this.deleteHandler.bind(null, this.props.contact)}>Delete</a>
						<button className="button blue" onClick={this.edit}  >Edit</button>
						<a className="close" onClick={this.closeView}>x</a>
					</div>
					<div className="panel-body scroll">
						<form action={"/contacts/edit"} method="POST">
							<input className="display-none" name="contact_id" defaultValue= {this.props.contact ? this.props.contact.contact_id : ""}></input>
							<div className="row gutters">
								<div>

									<div className="row">
										<div className="column-5">
											<p>Company Name</p>
											<input type="text" name="company_name" defaultValue={this.props.contact ? this.props.contact.company_name : ""} disabled={viewing ? true : false} required/>
										</div>
										<div className="column-5">
											<p>VAT </p>
											<input type="text" name="vat_number" defaultValue={this.props.contact ? this.props.contact.vat_number : ""} disabled={viewing ? true : false}/>
										</div>
										<div className="column-6">
											<p>Category</p>
											<input type="text" name="category" defaultValue={this.props.contact ? this.props.contact.category : ""} disabled={viewing ? true : false}/>
										</div>
									</div>

									<div className="row">
										<div className="column-10">
											<p>Address Line</p>
											<input type="text" name="address_line" defaultValue={this.props.contact ? this.props.contact.address_line : ""}disabled={viewing ? true : false}/>
										</div>	
										<div className="column-6">
											<p>City</p>
											<input type="text" name="city"  defaultValue={this.props.contact ? this.props.contact.city : ""} disabled={viewing ? true : false}/>
										</div>				
									</div>
									
									<div className="row">
										<div className="column-5">
											<p>County</p>
											<input type="text" name="county"  defaultValue={this.props.contact ? this.props.contact.county : ""} disabled={viewing ? true : false} />
										</div>
										<div className="column-5">
											<p>Post Code</p>
											<input type="text" name="postcode"  defaultValue={this.props.contact ? this.props.contact.postcode : ""} disabled={viewing ? true : false}/>
										</div>
										<div className="column-6">
											<p>Country</p>
											<input type="text" name="country"  defaultValue={this.props.contact ? this.props.contact.country : ""} disabled={viewing ? true : false} />
										</div>
									</div>

									<div className="row">
										<div className="column-5">
											<p>Contact Name</p>
											<input type="text" name="name" defaultValue={this.props.contact ? this.props.contact.name : ""} disabled={viewing ? true : false} />
										</div>
										<div className="column-5">
											<p>Telephone</p>
											<input type="text" name="telephone" defaultValue={this.props.contact ? this.props.contact.telephone : ""} disabled={viewing ? true : false}/>
										</div>
										<div className="column-6">
											<p>Email</p>
											<input type="email" name="email" defaultValue={this.props.contact ? this.props.contact.email : ""} disabled={viewing ? true : false}/>
										</div>
									</div>
									
									<div className="row">
										<div className="column-16">
											<p>Remarks</p>
											<textarea type="text" className="small" name="remarks" defaultValue={this.props.contact ? this.props.contact.remarks : ""} disabled={viewing ? true : false} max="500"/>
										</div>
										
									</div>
									<div className="row">
										<div className="column-16">
											<p>Sales Report</p>
											<textarea className="big" max="500" name="sales_report" defaultValue={this.props.contact ? this.props.contact.sales_report : ""} disabled={viewing ? true : false}/>
										</div>
									</div>
									<input type="submit" className="button charcoal" value="Done" disabled={viewing ? true : false}/>
								</div>
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