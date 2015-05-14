/** @jsx React.DOM */

var React  		= require('react');

var datePicker = React.createClass({
	getInitialState: function () {
		return {
			startDate: "",
			endDate: ""
		}
	},
	setDate: function (event) {

		if(event.target.name === "start"){
			this.setState({
				startDate: event.target.value
			})
		} else{
			this.setState({
				endDate: event.target.value
			});
		}

	},
	getOrders: function() {
		return this.props.getorders(this.state.startDate+","+this.state.endDate)
	},
	render: function () {
		return (
			<datepicker className="column-6 float-right">
					<div className="column-6 "data-tooltip="Start date">
						<input  type="date" name = "start" onChange={this.setDate} />
					</div>
					<div className="column-6 " data-tooltip="End date" >
						<input type="date" name= "end" onChange={this.setDate}/>
					</div>
					<div className="column-3 " >
						<input className= "button blue "  type="submit" value="Find" onClick={this.getOrders}/>
					</div>
			</datepicker>	

		)
	}
})

module.exports = datePicker;