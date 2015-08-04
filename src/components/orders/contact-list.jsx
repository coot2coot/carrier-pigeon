/** @jsx React.DOM */

var React = require('react');
var contactStore = require("../../lib/storeContacts.js")

var contactList = React.createClass({

	getInitialState: function () {
        return {
            contacts : []  
        };
    },

	createList: function (contact) {
  		var select = document.getElementById("dropdown"); 
  		var i;
  		var property = this.props.property
  		if(contact){
			contact.map(function(item){
				
				if(item.company_name !== null){
					var opt = item[property];
				    var el = document.createElement("option");
				    el.value = opt;
				    select.appendChild(el);
				}
			})
		}
  	},
  	getContacts : function () {
        contactStore.get(this.createList);
    },

    componentDidMount: function () {
    	this.getContacts();         
    },

	render: function (){
		return(
			<div>
			<div>
				{( this.props.vieworder
					? <input list="dropdown" className="view_input" type="text"  defaultValue={this.props.contact} name={this.props.contactType} onChange={this.props.handleChange} required = {this.props.required} disabled/>
					: this.props.email 
					?<input list="dropdown" placeholder = {this.props.placeholder} type="text" name={this.props.contactType} onChange={this.props.handleChange} required = {this.props.required} autoFocus={this.props.autoFocus}/>
					:<input list="dropdown" type="text" defaultValue={this.props.contact ? this.props.contact : ""} name={this.props.contactType} onChange={this.props.handleChange} required = {this.props.required}/>
					
					
				)}
			</div>
				<datalist id ="dropdown"></datalist>
			</div>
		)
	}
})

module.exports = contactList;