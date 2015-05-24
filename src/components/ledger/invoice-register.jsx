/** @jsx React.DOM */

var React = require('react');

var units = React.createClass({
	render: function () {
		var unit = this.props.unit;
		return (
			<invoice className="column-11">
				<div className="column-1">
					<h5>£</h5>
				</div>
				<div className="column-9">
					<input type="number" name="amount" min="0.01" step="0.01" max="10000" />
				</div>
				<div className="column-6">
					<input type="number" name="invoice_no." />
				</div>
			</invoice>
		);
	}
})

module.exports = units;
