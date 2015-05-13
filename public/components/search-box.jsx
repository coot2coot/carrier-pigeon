/** @jsx React.DOM */

module.exports = function(React, Link){

	return React.createClass({

		getInitialState:function () {
			return {
				searchValue: ""
			}
		},
		setSearchValue: function (event) {
			this.setState({
				searchValue: event.target.value
			})
		},
		render: function (){
			return(
				<searchbox className="column-4 float-right">
					<input placeholder="Search ..." type="text" name="search" onChange={this.setSearchValue} />
					<input className="button blue" type="submit" onClick={this.props.getorders(this.state.searchValue)} />
				</searchbox>
			)
		}
	})
}