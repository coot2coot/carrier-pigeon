/** @jsx React.DOM */

var React = require('react');

var InvoiceRegister = React.createClass({
	render: function () {

		var keys 			= this.props.keys;
		var onInvoiceChange = this.props.onInvoiceChange;
		var addInvoice 		= this.props.addInvoice
		var removeInvoice 	= this.props.removeInvoice
		return (
			<invoice >
				<div className="column-11">
					<div className="column-1">
						<h5>{this.props.currency}</h5>
					</div>
					<div className="column-9">
						<input type="number" name="amount" min="0.01" step="0.01" max="10000" defaultValue={ this.props.invoice ? this.props.invoice.amount : "" } onChange={onInvoiceChange.bind(null, keys)}/>
					</div>
					<div className="column-6">
						<input type="text" name="invoice_number" defaultValue={ this.props.invoice ? this.props.invoice.invoice_number : "" } onChange={onInvoiceChange.bind(null, keys)}/>
					</div>
					<input type="number" className="display-none" name="invoice_id" value={this.props.invoice ? this.props.invoice.invoice_id : "" } />
					<input type="text" className="display-none" name="type" value={this.props.type } onChange={onInvoiceChange.bind(null, keys) }/>
					<input type="text" className="display-none" name="currency" value={this.props.currency} onChange={onInvoiceChange.bind(null, keys) }/>
					<input type="number" className="display-none" name="job_number" value={this.props.jobnumber} onChange={onInvoiceChange.bind(null, keys) }/>
				</div>
				<div className="column-4">
					<button type="button" className="button	blue add-row" onClick={addInvoice.bind(null, keys)}>+</button>
					<button type="button" className="button	blue add-row" onClick={removeInvoice.bind(null,keys)}>-</button>
				</div>
			</invoice>
		);
	}
})

module.exports = InvoiceRegister;
