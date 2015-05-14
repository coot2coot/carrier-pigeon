/** @jsx React.DOM */

var React  	= require('react');

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
			<input className="unit_id" name="unit_id" defaultValue= {this.props.unit.unit_id}/>
				<div className="row column-14 no-gutter">
					<div className="column-4">
						<p>Unit Type</p>
						<select className="view_input"  name="unit_type" defaultValue={this.props.unit.unit_type} disabled={this.props.editing ? true : false} required>
							{ this.state.options.map(function (unit, i) {
						        return (
						        	<option>{unit.types}</option>
						        )
						    })}
						</select>
					</div>
					<div className="column-4">
						<p>Unit Weight</p>
						<input className="view_input"  type="number" min="0" defaultValue={this.props.unit.unit_weight ? this.props.unit.unit_weight : 0} name="unit_weight" disabled={this.props.editing ? true : false}/>
					</div>
					<div className="column-8">
						<p>Unit Number</p>
						<input className="view_input"  type="text"  defaultValue= {this.props.unit.unit_number} name="unit_number"  disabled={this.props.editing ? true : false} required/>
					</div>
				</div>
			</units>
		);
	}
})

module.exports = units;
