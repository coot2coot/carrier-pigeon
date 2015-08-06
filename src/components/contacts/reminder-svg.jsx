/** @jsx React.DOM */

var React = require('react');

var reminderIcon = React.createClass({
	getInitialState:function () {
		return {
			searchValue: ""
		}
	},
	render: function (){
		return(
			<svg className="bell" 
				viewBox="0 0 88 72" > 
				<g>
					<path className={this.props.classname} d="M71.5,38.184h-3.291l-6.213-21.879c-1.367-4.816-5.951-8.693-10.904-9.514C50.91,3.02,47.812,0,43.996,0c-3.812,0-6.91,3.018-7.092,6.787c-4.957,0.822-9.539,4.697-10.908,9.514l-6.211,21.883h-3.289l-4.498,15.85h19.251H36h15.994h3.963h20.041L71.5,38.184z M40.975,6.611C41.229,5.143,42.455,4,43.996,4c1.543,0,2.77,1.143,3.025,2.615L40.975,6.611z"/>
				</g>
			</svg>
		)
	}
})

module.exports = reminderIcon;