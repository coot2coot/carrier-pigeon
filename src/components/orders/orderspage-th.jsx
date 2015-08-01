var React = require('react');

var ordersth = React.createClass({

	render: function (){
		return(
			<tr>
				<th>
					<h5>Job No.</h5>
				</th>
				<th>
					<h5>Client</h5>
				</th>
				<th>
					<h5>Carrier</h5>
				</th>
				{(this.props.viewLedger 
					? <th><h5>Ledger</h5></th>
					: <p></p>
				)}
			</tr>
		)
	}
})

module.exports = ordersth;