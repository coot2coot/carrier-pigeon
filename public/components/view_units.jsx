module.exports = function(React, Link) {
	return React.createClass({
		render: function () {
			return (
				<units>
					<div className="row">
						<div className="column-4">
							<p>Unit Type</p>
							<select className="view_input" name="unit_type" defaultValue={this.props.unit.unit_type} disabled required>
							  	<option>40dc</option>
								<option>40hc</option>
								<option>40pw</option>
								<option>40fr</option>
								<option>40rc</option>
								<option>40ot</option>
								<option>20dc</option>
								<option>20tc</option>
								<option>20fr</option>
								<option>20rc</option>
								<option>20ot</option>
								<option>45pwhc</option>
								<option>45hc</option>
								<option>45rc</option>
								<option>40 mafi</option>
								<option>20 mafi</option>
								<option>Box trailer</option>
								<option>Taut liner</option>
								<option>Flat bed</option>
								<option>Groupage</option>
								<option>Airfreight</option>
							</select>
						</div>
						<div className="column-4">
							<p>Unit Weight</p>
							<input className="view_input" type="text" min="1" defaultValue={this.props.unit.unit_weight} name="unit_weight" disabled/>
						</div>
						<div className="column-8">
							<p>Unit Number</p>
							<input className="view_input" type="text"  defaultValue= {this.props.unit.unit_number} name="unit_number"   disabled required/>
						</div>
					</div>
				</units>
			);
		}
	})
}