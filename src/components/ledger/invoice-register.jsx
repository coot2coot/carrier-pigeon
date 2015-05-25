/** @jsx React.DOM */

var React = require('react');

var InvoiceRegister = React.createClass({
	render: function () {
		var unit = this.props.unit;
		return (
			<invoice className="column-11">
				<div className="column-1">
					<h5>{this.props.currency}</h5>
				</div>
				<div className="column-9">
					<input type="number" name="amount" min="0.01" step="0.01" max="10000" defaultValue={ this.props.invoice ? this.props.invoice.amount : "" }/>
				</div>
				<div className="column-6">
					<input type="number" name="invoice_no." defaultValue={ this.props.invoice ? this.props.invoice.invoice_number : "" }/>
				</div>
				<input type="number" className="display-none" name="invoice_id" value={this.props.invoice ? this.props.invoice.invoice_id : "" }/>
				<input type="number" className="display-none" name="type" value={this.props.invoice ? this.props.invoice.type : "" }/>
				<input type="number" className="display-none" name="currency" value={this.props.invoice ? this.props.invoice.currency : "" }/>
				<input type="number" className="display-none" name="job_number" value={this.props.invoice ? this.props.invoice.job_number : "" }/>
			</invoice>
		);
	}
})

module.exports = InvoiceRegister;
