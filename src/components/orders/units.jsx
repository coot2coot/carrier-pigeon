/** @jsx React.DOM */

var React = require('react');

var units = React.createClass({
	render: function () {
		var unit = !!this.props.unit ? this.props.unit[0] : this.props.unit;
		return (
			<div>
				<div className="column-14 no-gutter">
					<div className="row">
						<div className="column-3">
							<p>Unit No.</p>
						</div>
						<div className="column-3">
							<p>Unit Type</p>
						</div>
						<div className="column-4">
							<p>Loading Reference</p>
						</div>
						<div className="column-3">
							<p>Loading Date</p>
						</div>
						<div className="column-3">
							<p>Loading Time</p>
						</div>
					</div>
					<div className="row">
						<div className="column-3">
							<input type="text" name="unit_number" onChange={this.props.handleChange}/>
						</div>
						<div className="column-3">
							<input type="text" name="unit_type" defaultValue={unit && unit.unit_type ? unit.unit_type : ""} onChange={this.props.handleChange} required/>
						</div>
						<div className="column-4">
							<input type="text" name="unit_loading_reference" onChange={this.props.handleChange}/>
						</div>
						<div className="column-3">
							<input type="date" name="unit_loading_date" onChange={this.props.handleChange}/>
						</div>
						<div className="column-3">
							<input type="time" name="unit_loading_time" onChange={this.props.handleChange}/>
						</div>
					</div>

					<div className="row">
						<div className="column-2">
							<p>Net Weight</p>
						</div>
						<div className="column-2">
							<p>Gross Weight</p>
						</div>
						<div className="column-2 push-2 push-right">
							<p>Volume (m3)</p>
						</div>
						<div className="column-4 push-2 push-right">
							<p>Commodity Description</p>
						</div>
						<div className="column-2 push-2 push-right">
							<p>No of Packages</p>
						</div>
						<div className="column-2 push-2 push-right">
							<p>Kind of Packages</p>
						</div>
					</div>

					<div className="row">
						
						<div className="column-2">
							<input type="number" name="unit_net_weight" step="any" defaultValue={unit && unit.unit_net_weight ? unit.unit_net_weight : ""} onChange={this.props.handleChange}/>
						</div>
						<div className="column-2">
							<input type="number" name="unit_gross_weight" step="any" defaultValue={unit && unit.unit_gross_weight ? unit.unit_gross_weight : ""} onChange={this.props.handleChange}/>
						</div>
						<div className="column-2">
							<select name="unit_weight" >
								<option value= "kg">kg</option>
								<option value= "T">tons</option>
							</select>
						</div>
						<div className="column-2">
							<input type="number" name="unit_volume" step="any" defaultValue={unit && unit.unit_volume ? unit.unit_volume : ""} onChange={this.props.handleChange}/>
						</div>
						<div className="column-4">
							<textarea type="text" className="small" name="unit_commodity_description" defaultValue={unit && unit.unit_commodity_description ? unit.unit_commodity_description : ""} onChange={this.props.handleChange} max="500"/>
						</div>
						<div className="column-2">
							<input type="number" name="unit_no_of_packages" defaultValue={unit && unit.unit_no_of_packages ? unit.unit_no_of_packages : ""} onChange={this.props.handleChange}/>
						</div>
						<div className="column-2">
							<input type="text" name="unit_kind_of_packages" defaultValue={unit && unit.unit_kind_of_packages ? unit.unit_kind_of_packages : ""} onChange={this.props.handleChange}/>
						</div>
					</div>
				</div>
				<div className="column-2">
					<button type="button" className="view_input button blue	units add-row" >+</button>
					<button type="button" className="view_input button blue	units add-row" >-</button>
				</div>
			</div>
		);
	}
})

module.exports = units;
