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
		          		options : opts
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
					<div className="column-4">
						<p>Unit Type</p>
						<select name="unit_type"required>

							{ this.state.options.map(function (unit, i) {
						        return (
						        	<option>{unit.types}</option>
						        )
						    })}
						    
						</select>
					</div>
					<div className="column-4">
						<p>Unit Weight</p>
						<input type="number" defaultValue = "0" name="unit_weight"/>
					</div>
					<div className="column-8">
						<p>Unit Number</p>
						<input type="text" name="unit_number"required/>
					</div>
				</div>
			</units>
		);
	}
})

module.exports = units;
