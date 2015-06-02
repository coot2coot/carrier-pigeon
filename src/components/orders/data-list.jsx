/** @jsx React.DOM */

var React = require('react');

var dataList = React.createClass({
	componentDidMount: function () {
  		var select = document.getElementById("dropdown"); 
  		var i;
  		if(this.props.contacts){
			this.props.contacts.map(function(item){
				var opt = item.company_name;
			    var el = document.createElement("option");
			    el.value = opt;
			    select.appendChild(el);
			})
		}
  	},

	render: function (){
		return(
			<div>
			<div>
				{( this.props.vieworder
					? <input list="dropdown"  className="view_input" type="text"  defaultValue={this.props.contact} name="client" onChange={this.props.handleChange} disabled/>
					: <input list="dropdown" type="text"  defaultValue={this.props.contact ? this.props.contact : ""} name="client" onChange={this.props.handleChange} required/>
				)}
			</div>
				<datalist id ="dropdown"></datalist>
			</div>
		)
	}
})

module.exports = dataList;