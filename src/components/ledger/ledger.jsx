var React 		= require('react');
var Invoices 	= require("./invoice-register.jsx");
var Warning 	= require("../close-warning.jsx");
var formatJobNo = require("../../lib/format-job-number.js");

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
	getInitialState: function () {

	    return {
	    	invoices: {
	    		purchase: [],
	    		sales: []
	    	},
	    	edited: false,
	    	deletedInvoices: ""
	    };
	},

	componentDidMount: function () {

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

	addPurchaseInvoice: function (key) {

		this.state.invoices.purchase.splice(key + 1, 0, {});

		var newState = this.state.invoices;

  		this.setState({
    		invoices: newState
    	});
  	},

  	removePurchaseInvoice: function (key) {

  		if(this.state.invoices.purchase.length > 1){

  			var deletedInvoice = this.state.invoices.purchase.splice(key, 1);
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

  	addSalesInvoice: function (key) {

		this.state.invoices.sales.splice(key + 1, 0, {});

		var newState = this.state.invoices;

  		this.setState({
    		invoices: newState
    	});
  	},

  	removeSalesInvoice: function (key) {

  		if(this.state.invoices.sales.length > 1){

  			var deletedInvoice = this.state.invoices.sales.splice(key, 1);
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

	closeView: function () {

		if(!this.state.edited){
			this.props.closeView();
		} else {
			this.setState({
	    		closeView: true
	    	})
		}
	},

	onPurchaseChange: function (key, event) {

		this.ifEdited();
		var name = event.target.name;
		var value = event.target.value;
		this.state.invoices.purchase[key][name] = value;
	},

	onSalesChange: function (key, event) {

		this.ifEdited();
		var name = event.target.name;
		var value = event.target.value;
		this.state.invoices.sales[key][name] = value;
	},

	ifEdited: function (e) {

		this.state.edited = true;
  	},

	closeWarning: function () {

		this.setState({
	    	closeView: false
	    })
	},

	render: function () {

		var currency		= this.state.currency;
		var order			= this.props.order;
		var calculate		= this.calculate;
		var edited			= this.ifEdited;
		var onSalesChange	= this.onSalesChange;
		var onPurchaseChange= this.onPurchaseChange;
		var addPInvoice		= this.addPurchaseInvoice;
		var addSInvoice		= this.addSalesInvoice;
		var removeSInvoice	= this.removeSalesInvoice;
		var removePInvoice 	= this.removePurchaseInvoice;

		return (
			<div className="overlay">
				<div className="column-10 push-3 model-generic model-middle ledger">
					<div className="panel-header">
						<h3>Ledger - {formatJobNo(this.props.order.job_number)}</h3>
						<a className="close" onClick={this.closeView}>x</a>
					</div>
					<div className="panel-body container scroll">
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
										var key = new Date().getMilliseconds() + i;
									    return <Invoices
										    		key={key}
													keys={i}
													currency={currency}
													addInvoice={addPInvoice}
													removeInvoice={removePInvoice}
													jobnumber={order.job_number}
													type="purchase"
													invoice={invoice}
													onInvoiceChange={onPurchaseChange}/>
									})}

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
										var key = new Date().getMilliseconds() + i;
									    return <Invoices
										    		key={key}
													keys={i}
													currency={currency}
													addInvoice={addSInvoice}
													removeInvoice={removeSInvoice}
													jobnumber={order.job_number}
													type="sales"
													invoice={invoice}
													onInvoiceChange={onSalesChange}/>
									})}

								</div>
								<div className="column-16 profit">
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
