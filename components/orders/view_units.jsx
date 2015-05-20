/** @jsx React.DOM */

var React = require('react');

var units = React.createClass({
	render: function () {
		var unit = this.props.unit;
		return (
			<units>
				<div className="row column-14">
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
						<p>loading Date</p>
					</div>
					<div className="column-3">
						<p>loading Time</p>
					</div>
				</div>

				<div className="row column-14">
					<div className="column-3">
						<input className="view_input" type="text" name="unit_number" defaultValue={unit.unit_number} disabled={this.props.editing ? true : false} required/>
						{( unit.unit_id
							? <input className="display-none" type="text" name="unit_id" defaultValue={unit.unit_id} disabled={this.props.editing ? true : false} required/>
							: <p className="display-none"></p>
						)}
					</div>
					<div className="column-3">
						<input className="view_input" type="text" name="unit_type" defaultValue={unit.unit_type} disabled={this.props.editing ? true : false} required/>
					</div>
					<div className="column-4">
						<input className="view_input" type="text" name="unit_loading_reference" defaultValue={unit.unit_loading_reference} disabled={this.props.editing ? true : false}/>
					</div>
					<div className="column-3">
						<input className="view_input" type="date" name="unit_loading_date" defaultValue={unit.unit_loading_date} disabled={this.props.editing ? true : false}/>
					</div>
					<div className="column-3">
						<input className="view_input" type="time" name="unit_loading_time" defaultValue={unit.unit_loading_time} disabled={this.props.editing ? true : false}/>
					</div>
				</div>

				<div className="row column-14 no-gutter">
					<div className="column-2">
						<p>Net Weight</p>
					</div>
					<div className="column-2">
						<p>Gross Weight</p>
					</div>
					<div className="column-2">
						<p>Cube m3</p>
					</div>
					<div className="column-6">
						<p>Commodity Description</p>
					</div>
					<div className="column-2">
						<p>No of Packages</p>
					</div>
					<div className="column-2">
						<p>Kind of Packages</p>
					</div>
				</div>

				<div className="row column-14 no-gutter">
					<div className="column-2">
						<input className="view_input" type="number" name="unit_net_weight" defaultValue={unit.unit_nett_weight} disabled={this.props.editing ? true : false}/>
					</div>
					<div className="column-2">
						<input className="view_input" type="number" name="unit_gross_weight" defaultValue={unit.unit_gross_weight} disabled={this.props.editing ? true : false}/>
					</div>
					<div className="column-2">
						<input className="view_input" type="number" name="unit_volume" defaultValue={unit.unit_volume} disabled={this.props.editing ? true : false}/>
					</div>
					<div className="column-6">
						<input className="view_input" type="text" name="unit_commodity_description" defaultValue={unit.unit_commodity_description} disabled={this.props.editing ? true : false}/>
					</div>
					<div className="column-2">
						<input className="view_input" type="number" name="unit_no_of_packages" defaultValue={unit.unit_no_of_packages} disabled={this.props.editing ? true : false}/>
					</div>
					<div className="column-2">
						<input className="view_input" type="text" name="unit_kind_of_packages" defaultValue={unit.unit_kind_of_packages} disabled={this.props.editing ? true : false}/>
					</div>
				</div>
			</units>
		);
	}
})

module.exports = units;
