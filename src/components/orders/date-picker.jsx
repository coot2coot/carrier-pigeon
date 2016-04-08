var React = require('react');

var datePicker = React.createClass({
	getInitialState: function () {
		return {
			startDate: "",
			endDate: ""
		};
	},
	setDate: function (event) {

		if(event.target.name === "start"){
			this.setState({
				startDate: event.target.value
			});
		} else{
			this.setState({
				endDate: event.target.value
			});
		}

	},
	getOrders: function() {
		return this.props.getorders(this.state.startDate+","+this.state.endDate , "orders");
	},
	render: function () {
		return (
			<datepicker className="pop-up container">
				<div className="column-5 float-left">

					<div className="row">
						<p className="column-4">From: </p>
						<input className="column-10" type="date" name = "start" onChange={this.setDate} />
						<a  className="column-1 close-date" onClick={this.props.closeView}>x</a>
					</div>
					<div className="row">
						<p className="column-4">To: </p>
						<input className="column-10" type="date" name= "end" onChange={this.setDate}/>
					</div>
					<div className="submit">
						<input className= "button blue"  type="submit" value="Find" onClick={this.getOrders}/>
					</div>
				</div>
			</datepicker>

		)
	}
})

module.exports = datePicker;
