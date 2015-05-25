/** @jsx React.DOM */

var React = require('react');

var searchBox = React.createClass({
	getInitialState:function () {
		return {
			searchValue: ""
		}
	},
	setSearchValue: function (event){		
		this.setState({
			searchValue: event.target.value
		})
	},
	getOrders: function() {
		return this.props.getorders(this.state.searchValue)
	},
	render: function (){
		return(
			<searchbox className="column-4 float-right">
				<input placeholder="Search ..." type="text" name="search" onChange={this.setSearchValue} />
				<input className="button blue" type="submit" onClick={this.getOrders} />
			</searchbox>
		)
	}
})

module.exports = searchBox;