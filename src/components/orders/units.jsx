/** @jsx React.DOM */

var React = require('react');

var units = React.createClass({
	render: function () {
		var unit = !!this.props.unit ? this.props.unit[0] : this.props.unit;
		return (
			<units className="column-14 no-gutter">
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
						<input type="text" name="unit_number" defaultValue={!!unit ? unit.unit_number : ""}/>
					</div>
					<div className="column-3">
						<input type="text" name="unit_type" defaultValue={!!unit ? unit.unit_type : ""} required/>
					</div>
					<div className="column-4">
						<input type="text" name="unit_loading_reference" defaultValue={!!unit ? unit.unit_loading_reference : ""}/>
					</div>
					<div className="column-3">
						<input type="date" name="unit_loading_date" defaultValue={!!unit ? unit.unit_loading_date : ""}/>
					</div>
					<div className="column-3">
						<input type="time" name="unit_loading_time" defaultValue={!!unit ? unit.unit_loading_time : ""}/>
					</div>
				</div>

				<div className="row">
					<div className="column-2">
						<p>Weight</p>
					</div>
					<div className="column-2">
						<p>Net Weight</p>
					</div>
					<div className="column-2">
						<p>Gross Weight</p>
					</div>
					<div className="column-2">
						<p>Volume (m3)</p>
					</div>
					<div className="column-4">
						<p>Commodity Description</p>
					</div>
					<div className="column-2">
						<p>No of Packages</p>
					</div>
					<div className="column-2">
						<p>Kind of Packages</p>
					</div>
				</div>

				<div className="row">
					<div className="column-2">
						<select name="unit_weight" >
							<option value= "kg">kg</option>
							<option value= "tons">tons</option>
						</select>
					</div>
					<div className="column-2">
						<input type="number" name="unit_net_weight" defaultValue={!!unit ? unit.unit_net_weight : ""}/>
					</div>
					<div className="column-2">
						<input type="number" name="unit_gross_weight" defaultValue={!!unit ? unit.unit_gross_weight : ""}/>
					</div>
					<div className="column-2">
						<input type="number" name="unit_volume" defaultValue={!!unit ? unit.unit_volume : ""}/>
					</div>
					<div className="column-4">
						<input type="text" name="unit_commodity_description" defaultValue={!!unit ? unit.unit_commodity_description : ""}/>
					</div>
					<div className="column-2">
						<input type="number" name="unit_no_of_packages" defaultValue={!!unit ? unit.unit_no_of_packages : ""}/>
					</div>
					<div className="column-2">
						<input type="text" name="unit_kind_of_packages" defaultValue={!!unit ? unit.unit_kind_of_packages : ""}/>
					</div>
				</div>
			</units>
		);
	}
})

module.exports = units;
