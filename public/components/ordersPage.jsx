
var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="row nav">
				<div className="column-4 push-2">
					<a href="">
						<img src="./img/nav/shipping.png"/>
						<p>Orders</p>
					</a>
				</div>
				<div className="column-4 push-2">
					<a href="">
						<img src="./img/nav/booking.png"/>
						<p>Booking notice</p>
					</a>
				</div>
				<div className="column-4 push-2">
					<a href="">
						<img src="./img/nav/list.png"/>
						<p>Client</p>
					</a>
				</div>
				<div className="column-3 push-2">
					<a href="">
						<img className="xero" src="./img/nav/xero.png"/>
					</a>
				</div>
			</div>
		);
	}
})