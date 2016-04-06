var React = require('react');

var loadingDate = {
	fontSize: "0.8em"
};

var units = React.createClass({

	render: function () {

		var unit = this.props.unit;
		var addUnit = this.props.addUnit;
		var removeUnit = this.props.removeUnit;

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
							<input className="view_input" type="text" name="unit_number" defaultValue={unit.unit_number} disabled={this.props.viewing ? true : false} onChange={this.props.handleChange.bind(null, this.props.keys)}/>
							<input className="display-none" type="text" name="unit_id" defaultValue={unit.unit_id ? unit.unit_id : ""} disabled={this.props.viewing ? true : false} onChange={this.props.handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-2">
							<input className="view_input" type="text" name="unit_seal" defaultValue={unit.unit_seal} disabled={this.props.viewing ? true : false} onChange={this.props.handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-2">
							<input className="view_input" type="text" name="unit_type" defaultValue={unit.unit_type} disabled={this.props.viewing ? true : false} required onChange={this.props.handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-3">
							<input className="view_input" type="text" name="unit_loading_reference" defaultValue={unit.unit_loading_reference} disabled={this.props.viewing ? true : false} onChange={this.props.handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-3">
							<input style={loadingDate} className="view_input" type="date" name="unit_loading_date" defaultValue={unit.unit_loading_date ? unit.unit_loading_date.substring(0, 10): ""} disabled={this.props.viewing ? true : false} onChange={this.props.handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-3">
							<input className="view_input" type="time" name="unit_loading_time" defaultValue={unit.unit_loading_time} disabled={this.props.viewing ? true : false} onChange={this.props.handleChange.bind(null, this.props.keys)}/>
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
							<input className="view_input" type="number" name="unit_net_weight" step="any" defaultValue={unit.unit_net_weight} disabled={this.props.viewing ? true : false} onChange={this.props.handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-2">
							<input className="view_input" type="number" name="unit_gross_weight" step="any" defaultValue={unit.unit_gross_weight} disabled={this.props.viewing ? true : false} onChange={this.props.handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-2" >
							<select className="view_input" name="unit_weight" defaultValue={unit.unit_weight} disabled={this.props.viewing ? true : false} onChange={this.props.handleChange.bind(null, this.props.keys)}>
								<option value= "kg">kg</option>
								<option value= "tons">t</option>
							</select>
						</div>
						<div className="column-2">
							<input className="view_input" type="number" name="unit_volume" step="any" defaultValue={unit.unit_volume} disabled={this.props.viewing ? true : false} onChange={this.props.handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-4">
							<textarea className="view_input small" type="text" name="unit_commodity_description" defaultValue={unit.unit_commodity_description} disabled={this.props.viewing ? true : false} onChange={this.props.handleChange.bind(null, this.props.keys)} max="500"/>
						</div>
						<div className="column-2">
							<input className="view_input" type="number" name="unit_no_of_packages" defaultValue={unit.unit_no_of_packages} disabled={this.props.viewing ? true : false} onChange={this.props.handleChange.bind(null, this.props.keys)}/>
						</div>
						<div className="column-2">
							<input className="view_input" type="text" name="unit_kind_of_packages" defaultValue={unit.unit_kind_of_packages} disabled={this.props.viewing ? true : false} onChange={this.props.handleChange.bind(null, this.props.keys)}/>
						</div>
					</div>
				</div>
				<div className="column-2 push-1">
					<button type="button" onClick = {addUnit.bind(null, this.props.keys)} disabled= {this.props.viewing ? true : false} className="view_input button blue	units add-row">+</button>
					<button type="button" onClick = {removeUnit.bind(null, this.props.keys)} disabled= {this.props.viewing ? true : false} className="view_input button blue	units add-row">-</button>
				</div>
			</units>
		);
	}
})

module.exports = units;
