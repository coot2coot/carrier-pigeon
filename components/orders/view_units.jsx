/** @jsx React.DOM */

var React = require('react');

var units = React.createClass({
	getInitialState: function() {
      return {
        options: [
        	{
        		types: ""
        	}
        ]
      };
    },

	componentDidMount: function() {
		var getOrderUrl = "/unit_types/get";

	    $.get(getOrderUrl, function(result) {
	    	if(result !== ""){
		    	var opts = JSON.parse(result);

		      	if (this.isMounted()) {
		        	this.setState({
		          		options: opts
		        	});
		      	}
		    }
	    }.bind(this))
	    .fail(function () {
	    	"get request failed"
	    });
	},

	render: function () {
		return (
			<units>
				<div className="row column-14">
					<div className="column-3">
						<p>Unit No.</p>
						<input className="view_input" type="text" name="unit_number" disabled={this.props.editing ? true : false} required/>
					</div>
					<div className="column-3">
						<p>Unit Type</p>
						<input className="view_input" type="text" name="unit_type" disabled={this.props.editing ? true : false} required/>
					</div>
					<div className="column-4">
						<p>Loading Reference</p>
						<input className="view_input" type="text" name="unit_loading_reference" disabled={this.props.editing ? true : false}/>
					</div>
					<div className="column-3">
						<p>loading Date</p>
						<input className="view_input" type="date" name="lunit_oading_date" disabled={this.props.editing ? true : false}/>
					</div>
					<div className="column-3">
						<p>loading Time</p>
						<input className="view_input" type="time" name="unit_loading_time" disabled={this.props.editing ? true : false}/>
					</div>
				</div>

				<div className="row column-14 no-gutter">
					<div className="column-2">
						<p>Nett Weight</p>
						<input className="view_input" type="number" name="unit_nett_weight" disabled={this.props.editing ? true : false}/>
					</div>
					<div className="column-2">
						<p>Gross Weight</p>
						<input className="view_input" type="number" name="unit_gross_weight" disabled={this.props.editing ? true : false}/>
					</div>
					<div className="column-2">
						<br/>
						<p>Cube m3</p>
						<input className="view_input" type="number" name="unit_volume" disabled={this.props.editing ? true : false}/>
					</div>
					<div className="column-6">
						<br/>
						<p>Commodity Description</p>
						<input className="view_input" type="text" name="unit_commodity_description" disabled={this.props.editing ? true : false}/>
					</div>
					<div className="column-2">
						<p>No of Packages</p>
						<input className="view_input" type="number" name="unit_no_of_packages" disabled={this.props.editing ? true : false}/>
					</div>
					<div className="column-2">
						<p>Kind of Packages</p>
						<input className="view_input" type="text" name="unit_kind_of_packages" disabled={this.props.editing ? true : false}/>
					</div>
				</div>
			</units>
		);
	}
})

module.exports = units;
