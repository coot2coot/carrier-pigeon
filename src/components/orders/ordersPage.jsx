/** @jsx React.DOM */

var React  		= require('react');

var Header 		= require("../header/header.jsx");
var ViewOrder 	= require("./view-order.jsx");
var CreateOrder = require("./add-order.jsx");
var SearchBox 	= require("./search-box.jsx");
var Error 		= require("../error-message.jsx");
var Datepicker 	= require("./date-picker.jsx");


var getJobNumber = function (dbId) {
    var today = new Date();
  
	var id = ("0000" + dbId).slice(-4);
    var mm = ("0" + (today.getMonth()+1)).slice(-2);
    var yy = today.getFullYear().toString().slice(-2);
  
    return yy + mm + id;
}

var ordersPage = React.createClass({
	getInitialState: function() {
      return {
        orders: [
            {
            	job_number : "",
            	client: "",
            	carrier: "",
            	collect_from: "",
            	deliver_to: "",
            	handler: "",
            }
        ],
        contacts : [],
        searchValue: "",
        error:false

      };
    },

    getContacts : function () {
    	var getContactUrl = "/contacts/get";
    	if (window.location.href.indexOf('true') > -1 ) {
			getContactUrl = "/contacts/get/nocache"
		}
    	$.get(getContactUrl, function(result) {
	    	if(result !== ""){
		    	var contact = JSON.parse(result);

		      	if (this.isMounted()) {
		        	this.setState({
		          		contacts : contact
		        	});
		      	}
		    }
	    }.bind(this))
	    .fail(function () {
	    	"get request failed"
	    });

    },

	componentDidMount: function() {
		var getOrderUrl = "/orders/get";

		if (window.location.href.indexOf('true') > -1 ) {
			getOrderUrl = "/orders/get/nocache"
		}

	    $.get(getOrderUrl, function(result) {
	    	if(result !== ""){
		    	var order = JSON.parse(result);

		      	if (this.isMounted()) {
		        	this.setState({
		          		orders : order
		        	});
		      	}
		    }
	    }.bind(this))
	    .fail(function () {
	    	"get request failed"
	    });
	},

	onCloseComponent: function () {
		this.setState({
			selectedOrder: null,
			creatingOrder: null,
			datePicker: null
		})
	},

	orderHandler: function (item) {
		this.setState({
			selectedOrder: item
		})
	},

	addOrder: function () {
		this.setState({
			creatingOrder: true
		})
	},

	copyOrder: function (order, units) {
		this.setState({
			selectedOrder: null,
			creatingOrder: true,
			copiedOrder: order,
			copiedUnits: units
		})
	},

	pickDate: function () {
		this.state.datePicker
		?	this.setState({
				datePicker: false
			})
		: 	this.setState({
				datePicker: true
			})
	},

	getSearchedOrders: function (value) {

		var getUrl = "/search/orders/" + value;
		$.get(getUrl,function (result) {	
			if(result === "error"){
				this.setState({
					error: true
				})
			}else{		
				var order = JSON.parse(result);
				this.setState({
					error: false
				})
				this.setState({
				    orders : order
				});
			}				
		}.bind(this))
		.fail(function(){
			"get searchfailed"
		});
	},

	get90: function (dates) {
		var date;
		var currentDate = new Date();
		var pastDate = new Date();
		pastDate.setDate(currentDate.getDate() - 90);

		currentDate = [
			currentDate.getUTCFullYear(),
			currentDate.getUTCMonth() + 1,
			currentDate.getUTCDate()
		];

		pastDate = [
			pastDate.getUTCFullYear(),
			pastDate.getUTCMonth() + 1,
			pastDate.getUTCDate()
		];

		date = pastDate.join("-")+ "," + currentDate.join("-")

		this.getDateOrders(date);

	},

	getTodays: function (dates) {
		var date;
		var currentDate = new Date();

		currentDate = [
			currentDate.getUTCFullYear(),
			currentDate.getUTCMonth() + 1,
			currentDate.getUTCDate()
		];

		date = currentDate.join("-")+ "," + currentDate.join("-")

		this.getDateOrders(date);

	},

	getDateOrders: function (dates) {
		var getUrl = "/search/dates/" + dates;
		$.get(getUrl,function (result) {	
			if(result === "error"){
				this.setState({
					error: true,
					datePicker: null
				})
			}else{		
				var order = JSON.parse(result);
				this.setState({
					error: false
				});

				this.setState({
				    orders : order,
				    datePicker: null
				});
			}				
		}.bind(this))
		.fail(function(){
			"get searchfailed"
		});
	},

	render: function() {
		var orderHandler = this.orderHandler;
		var addInvoiceHandler = this.addInvoice;
		return (

			<div>
				<Header/>
				<div className="column-14 push-1 model-generic">
					<div>
						{(this.state.error
                            ? <Error message="Sorry, that search returned no results. Try another search." />
                            : <p className="display-none"></p>
                        )}
                    </div>
					<div className="panel-header">
						<h3>Orders</h3>
						<button data-tooltip="Add order" className="button blue add" onClick={this.addOrder}>+</button>
						<button data-tooltip="Get last 90 days of orders" className="button blue add" onClick={this.get90}>90</button>
						<button data-tooltip="Get todays orders" className="button blue add" onClick={this.getTodays}>T</button>
						<button data-tooltip="Pick Date Range" className="button grey column-2 float-right " onClick={this.pickDate}>Date Range</button>
						<SearchBox getorders= {this.getSearchedOrders} />
					</div>
					<div className="panel-body table-responsive scroll">
						<table className="table table-full">
							<th>
								<h5>Job No.</h5>
							</th>
							<th>
								<h5>Client</h5>
							</th>
							<th>
								<h5>Carrier</h5>
							</th>
							<th>
								<h5>Ledger</h5>
							</th>
							<tbody>

						  		{ this.state.orders.map(function (order, i) {
							        return <tr>
							            		<td key={i + "first"}>
							            			<a onClick={orderHandler.bind(null, order)}>
							            				<p>{getJobNumber(order.job_number)}</p>
							            			</a>
							            		</td>
												<td key={i + "second"}>
													<a onClick={orderHandler.bind(null, order)}>
														<p>{order.client}</p>
													</a>
												</td>
												<td key={i + "third"}>
													<a onClick={orderHandler.bind(null, order)}>
														<p>{order.carrier}</p>
													</a>
												</td>
												<td key={i + "fourth"}>
													<a onClick={orderHandler.bind(null, order)}>
														<p></p>
													</a>
												</td>
											</tr>
							    })}

							</tbody>
						</table>
					</div>
				</div>

				{(this.state.selectedOrder
                    ? <ViewOrder contacts={this.state.contacts} order={this.state.selectedOrder} copy={this.copyOrder} closeView={this.onCloseComponent}/>
                    : this.state.creatingOrder
                    ? <CreateOrder copiedOrder={this.state.copiedOrder} units={this.state.copiedUnits} closeView={this.onCloseComponent}/>
                    : this.state.datePicker
                    ? <Datepicker getorders={this.getDateOrders} closeView={this.onCloseComponent}/>
                    : <p></p>
                )}

			</div>
		);
	}
})

module.exports = ordersPage;
