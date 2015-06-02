/** @jsx React.DOM */

var React = require('react');

var InvoiceRegister = React.createClass({
	render: function () {
		return (
			<invoice className="column-11">
				<div className="column-1">
					<h5>{this.props.currency}</h5>
				</div>
				<div className="column-9">
					<input type="number" name="amount" min="0.01" step="0.01" max="10000" defaultValue={ this.props.invoice ? this.props.invoice.amount : "" } required/>
				</div>
				<div className="column-6">
					<input type="number" name="invoice_number" defaultValue={ this.props.invoice ? this.props.invoice.invoice_number : "" } required/>
				</div>
				<input type="number" className="display-none" name="invoice_id" value={this.props.invoice ? this.props.invoice.invoice_id : "" } disabled/>
				<input type="text" className="display-none" name="type" value={this.props.type } disabled/>
				<input type="text" className="display-none" name="currency" value={this.props.currency} disabled/>
				<input type="number" className="display-none" name="job_number" value={this.props.jobnumber} disabled/>
			</invoice>
		);
	}
})

module.exports = InvoiceRegister;
