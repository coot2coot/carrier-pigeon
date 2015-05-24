/** @jsx React.DOM */

var React = require('react');

var Invoices = require("./invoice-register.jsx")

var ledger = React.createClass({
	getInitialState: function() {
	    return {
	    	invoices: {
	    		purchase: [{
	    			invoice_id: "",
	    			type: "",
	    			currency: "",
	    			amount: "",
	    			invoice_number: ""
	    		}],
	    		sales: [{
	    			invoice_id: "",
	    			type: "",
	    			currency: "",
	    			amount: "",
	    			invoice_number: ""
	    		}]
	    	}
	    };
	},

	componentDidMount: function() {
		var getInvoicesUrl = "/invoices/get/" + this.props.order.job_number;

	    $.get(getInvoicesUrl, function(result) {
	    	if(result !== ""){
		    	var parsed = JSON.parse(result);

		    	console.log(parsed);

	        	this.setState({
	          		invoices: parsed
	        	});
		    }
	    }.bind(this))
	    .fail(function () {
	    	"get request failed"
	    });
	},

	addInvoice: function() {
		this.state.units.push(1)
		var newState = this.state.units

  		this.setState({
    		units: newState
    	});
  	},
  	
  	removeInvoice: function() {
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

	closeView: function() {
	    this.setState({
    		closeView: true
    	})
	},
  	
	render: function() {
		return (
			<div className="overlay">
				<div className="column-10 push-3 model-generic model-top ledger">
					<div className="panel-header">
						<h3>Ledger</h3>
						<a className="close" onClick={this.closeView}>x</a>
					</div>
					<div className="panel-body scroll container">
						<form action="/ledger/update" method="POST">
							<div className="row gutters">
								<div className="column-8">
									<h4>Purchase Invoices</h4>
									<div className="row gutters no-margin">
										<div className="column-11">
											<div className="column-10">
												<p>Amount</p>
											</div>
											<div className="column-6">
												<p>Invoice No.</p>
											</div>
										</div>
									</div>

									{ this.state.invoices.purchase.map(function(invoice, i){
									    return <Invoices invoice={invoice}/>
									})}

									<div className="column-4">
										<button type="button" className="button blue add-row" onClick={this.addInvoice}>+</button>
										<button type="button" className="button blue add-row" onClick={this.removeInvoice}>-</button>
									</div>
								</div>
								<div className="column-8">
									<h4>Sales Invoices</h4>
									<div className="row gutters no-margin">
										<div className="column-11">
											<div className="column-10">
												<p>Amount</p>
											</div>
											<div className="column-6">
												<p>Invoice No.</p>
											</div>
										</div>
									</div>

									{ this.state.invoices.sales.map(function(invoice, i){
									    return <Invoices invoice={invoice}/>
									})}

									<div className="column-4">
										<button type="button" className="button	blue add-row" onClick={this.addInvoice}>+</button>
										<button type="button" className="button	blue add-row" onClick={this.removeInvoice}>-</button>
									</div>
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

module.exports = ledger;
