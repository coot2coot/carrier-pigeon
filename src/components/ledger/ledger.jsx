/** @jsx React.DOM */

var React = require('react');

var Invoices = require("./invoice-register.jsx");
var Warning = require("../close-warning.jsx");

// for now profit will be the sales invoices - purchase invoices.
// TODO: find out the real calculation of proffit.
function getAmount (arr) {
  	var i;
  	var length = arr.length;
  	var amount = 0;
  
  	for(i = 0; i < length; i ++) {
  	  amount += Number(arr[i].amount);
  	}
  	return amount;
}

function calculate (invoices) {
  	var profit;
  	var sales = getAmount(invoices.sales);
  	var purchase = getAmount(invoices.purchase);
   
 	profit = sales - purchase;
  	return (profit).toFixed(2);
}

var ledger = React.createClass({
	getInitialState: function() {
	    return {
	    	invoices: {
	    		purchase: [],
	    		sales: []
	    	},
	    	deletedInvoices: ""
	    };
	},

	componentDidMount: function() {
		var getInvoicesUrl = "/invoices/get/" + this.props.order.job_number;

	    $.get(getInvoicesUrl, function (result) {
    		var parsed = JSON.parse(result);
    		var invoices = {};
    		var currency = "£";
    		var profit = 0;

	    	if (parsed.sales.length === 0) {
	    		invoices.sales = [{
    				invoice_number: "",
    				amount: ""
    			}]
	    	} else {
	    		invoices.sales = parsed.sales;
	    		currency = parsed.sales[0].currency
	    	}

	    	if (parsed.purchase.length === 0) {
	    		invoices.purchase = [{
    				invoice_number: "",
    				amount: ""
    			}]
	    	} else {
	    		invoices.purchase = parsed.purchase;
	    		currency = parsed.purchase[0].currency
	    	}
	    	
	    	if (parsed.sales.length > 0 || parsed.purchase.length > 0) {
	    		profit = calculate(parsed);
	    	}

        	this.setState({
          		invoices: invoices,
          		profit: profit,
          		currency: currency
        	});
		    
	    }.bind(this))
	    .fail(function () {
	    	console.log("get request failed");
	    });
	},

	changeCurrency: function (e) {
		this.setState({
			currency: e.target.value
		})

	},

	addPurchaseInvoice: function() {
		this.state.invoices.purchase.push(1);

		var newState = this.state.invoices;

  		this.setState({
    		invoices: newState
    	});
  	},
  	
  	removePurchaseInvoice: function() {
  		if(this.state.invoices.purchase.length > 1){

  			var deletedInvoice = this.state.invoices.purchase.splice(-1,1);
  			var newState = this.state.invoices;

  			this.setState({
    			invoices: newState,
    		});

  			if(deletedInvoice[0].invoice_id){
  				var newDeletedStrng = this.state.deletedInvoices + ',' + deletedInvoice[0].invoice_id;
  				
  				this.setState({
	    			deletedInvoices: newDeletedStrng
	    		});
	
			}
	    }
  	},

  	addSalesInvoice: function() {
		this.state.invoices.sales.push(1);

		var newState = this.state.invoices;

  		this.setState({
    		invoices: newState
    	});
  	},
  	
  	removeSalesInvoice: function() {
  		if(this.state.invoices.sales.length > 1){

  			var deletedInvoice = this.state.invoices.sales.splice(-1,1);
  			var newState = this.state.invoices;

  			this.setState({
    			invoices: newState,
    		});

  			if(deletedInvoice[0].invoice_id){
  				var newDeletedStrng = this.state.deletedInvoices + ',' + deletedInvoice[0].invoice_id;
  				
  				this.setState({
	    			deletedInvoices: newDeletedStrng
	    		});
	
			}
	    }
  	},

  	calculate: function(e) {
  		console.log(e);
  		this.setState({
  			profit: ""
  		})
  	},

	closeView: function() {
	    this.setState({
    		closeView: true
    	})
	},

	closeWarning: function () {
		this.setState({
	    	closeView: false
	    })
	},
  	
	render: function() {
		var currency = this.state.currency;
		var order = this.props.order;
		return (
			<div className="overlay">
				<div className="column-10 push-3 model-generic model-top ledger">
					<div className="panel-header">
						<h3>Ledger - {this.props.order.job_number}</h3>
						<a className="close" onClick={this.closeView}>x</a>
					</div>
					<div className="panel-body container">
						<form action={"/invoices/edit/" + this.state.deletedInvoices.slice(1)} method="POST">
							<div className="row currency">
								<p>Select your Currency: </p>
								<select value={this.state.currency} onChange={this.changeCurrency}>
							  		<option value="£">&pound;</option>
							  		<option value="€">&euro;</option>
								  	<option value="$">$</option>
								</select>
							</div>
							<div className="row gutters">
								<div className="column-8 purchase">
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
									    return <Invoices currency={currency} jobnumber={order.job_number} type="purchase" invoice={invoice}/>
									})}

									<div className="column-4">
										<button type="button" className="button blue add-row" onClick={this.addPurchaseInvoice}>+</button>
										<button type="button" className="button blue add-row" onClick={this.removePurchaseInvoice}>-</button>
									</div>
								</div>
								<div className="column-8 sales">
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
									    return <Invoices currency={currency} jobnumber={order.job_number} type="sales" invoice={invoice}/>
									})}

									<div className="column-4">
										<button type="button" className="button	blue add-row" onClick={this.addSalesInvoice}>+</button>
										<button type="button" className="button	blue add-row" onClick={this.removeSalesInvoice}>-</button>
									</div>
								</div>
								<div className="column-6 push-10">
									<p>Profit: {currency}{this.state.profit}</p>
								</div>
							</div>
							<input type="submit" className="button charcoal no-margin" value="Submit"/>
						</form>
					</div>
				</div>
				{(this.state.closeView
                    ? <Warning message="Do you want to close without saving?" closeView={this.props.closeView} closeWarning={this.closeWarning}/>
                    : <p></p>
                )}
			
			</div>
		);
	}
})

module.exports = ledger;
