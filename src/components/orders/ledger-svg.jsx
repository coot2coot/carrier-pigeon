var React = require('react');

var ledgerIcon = React.createClass({
	getInitialState:function () {
		return {
			searchValue: ""
		}
	},
	render: function (){
		return(
			<svg className={this.props.active ? "active ledger" : "unactive ledger"} 
					viewBox="0 0 31.459 31.459">
				<g>
					<polygon points="13.18,4.483 13.18,15.898 11.688,14.944 10.197,16.906 10.197,4.785 8.945,4.912 8.58,4.662 25.79,2.794 25.77,2.601 8.335,4.493 8.033,4.285 25.441,2.382 25.42,2.189 7.787,4.118 7.452,3.888 25.133,1.932 25.111,1.739 7.208,3.719 6.835,3.462 24.743,1.471 24.721,1.279 6.591,3.294 6.186,3.016 6.765,2.957 25.189,0.953 24.514,0 4.367,2.135 4.367,2.427 4.367,3.205 4.367,28.863 8.016,31.439 8.016,31.459 27.088,29.523 27.092,3.072 	"/>
				</g>
			</svg>
		)
	}
})

module.exports = ledgerIcon;