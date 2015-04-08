/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
    login: function(e) {
        alert("hello there");
    },
    render: function() {
        return (

        	<nav className="nav-responsive">
			  	<ul className="list-inline">
			    	<li>
				    	<a href="">
							<img src="../img/nav/shipping.png" />
							<h5>Orders</h5>
						</a>
					</li>
					<li>
				    	<a href="">
							<img src="../img/nav/booking.png" />
							<h5>Booking notice</h5>
						</a>
					</li>
					<li>
				    	<a href="">
							<img src="../img/nav/list.png" />
							<h5>Client</h5>
						</a>
					</li>
			  	</ul>
			</nav>
        );
    }
})

// <div className="row nav">
// 				<div className="column-4 push-2">
// 					<a href="">
// 						<img src="./img/nav/shipping.png" />
// 						<br />
// 						<p>Orders</p>
// 					</a>
// 				</div>
// 				<div className="column-4 push-2">
// 					<a href="">
// 						<img src="./img/nav/booking.png" />
// 						<p>Booking notice</p>
// 					</a>
// 				</div>
// 				<div className="column-4 push-2">
// 					<a href="">
// 						<img src="./img/nav/list.png" />
// 						<p>Client</p>
// 					</a>
// 				</div>
// 			</div>