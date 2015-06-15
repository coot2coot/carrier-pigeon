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
	handleSubmit: function(e) {
		e.preventDefault();
		return this.props.getorders(this.state.searchValue)
	},
	render: function (){
		return(
			<searchbox className="column-4 float-right">
				<form onSubmit={this.handleSubmit}>
					<input placeholder="Search ..." type="text" name="search" onChange={this.setSearchValue} />
					<button className="button blue add" type="submit" >&#128269;</button>
				</form>
			</searchbox>
		)
	}
})

module.exports = searchBox;