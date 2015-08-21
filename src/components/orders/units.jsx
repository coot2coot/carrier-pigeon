/** @jsx React.DOM */

var React = require('react');

var units = React.createClass({
	render: function () {
		var unit = this.props.unit;
		var addUnit = this.props.addUnit;
		var removeUnit = this.props.removeUnit;
		var handleChange = this.props.handleChange;

		return (
			<units className='row no-gutter'>
				<div className="column-13 push-1 border ">

					<div className="row">
						<div className="column-3">
							<p>Unit No.</p>
						</div>
						<div className="column-2">
							<p>Seal</p>
						</div>
						<div className="column-2">
							<p>Unit Type</p>
						</div>
						<div className="column-3">
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
							<input type="text" name="unit_number"  onChange={handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-2">
							<input type="text" name="unit_seal"  onChange={handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-2">
							<input type="text" name="unit_type" defaultValue={unit.unit_type ? unit.unit_type : ""} onChange={handleChange.bind(null, this.props.keys)} required/>
						</div>
						<div className="column-3">
							<input type="text" name="unit_loading_reference"  onChange={handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-3">
							<input type="date" name="unit_loading_date"  onChange={handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-3">
							<input type="time" name="unit_loading_time"  onChange={handleChange.bind(null, this.props.keys)}/>
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
							<input type="number" name="unit_net_weight" step="any" defaultValue={unit.unit_net_weight ? unit.unit_net_weight : ""} onChange={handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-2">
							<input type="number" name="unit_gross_weight" step="any" defaultValue={unit.unit_gross_weight ? unit.unit_gross_weight : ""} onChange={handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-2">
							<p>{unit.unit_weight ? unit.unit_weight : ""}</p>
							<select name="unit_weight" defaultValue={unit.unit_weight ? unit.unit_weight : ""} onChange={handleChange.bind(null, this.props.keys)} >
								<option value= "kg">kg</option>
								<option value= "tons">t</option>
							</select>
						</div>
						<div className="column-2">
							<input type="number" name="unit_volume" step="any" defaultValue={unit.unit_volume ? unit.unit_volume : ""} onChange={handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-4">
							<textarea type="text" className="small" name="unit_commodity_description" defaultValue={unit.unit_commodity_description ? unit.unit_commodity_description : ""} onChange={handleChange.bind(null, this.props.keys)} max="500"/>
						</div>
						<div className="column-2">
							<input type="number" name="unit_no_of_packages" defaultValue={unit.unit_no_of_packages ? unit.unit_no_of_packages : ""} onChange={handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-2">
							<input type="text" name="unit_kind_of_packages" defaultValue={unit.unit_kind_of_packages ? unit.unit_kind_of_packages : ""} onChange={handleChange.bind(null, this.props.keys)}/>
						</div>
					</div>
				</div>
				<div className="column-2 push-1">
					<button type="button" onClick = {addUnit.bind(null, this.props.keys)} className="view_input button blue units add-row">+</button>
					<button type="button" onClick = {removeUnit.bind(null, this.props.keys)} className="view_input button blue units add-row">-</button>
				</div>
			</units>
		);
	}
})

module.exports = units;
