module.exports = function(React, Link) {
	return React.createClass({
		render: function () {
			return (
				<units>
				<input className="unit_id" name="unit_id" defaultValue= {this.props.unit.unit_id}/>
					<div className="row column-14 no-gutter">
						<div className="column-4">
							<p>Unit Type</p>
							<select className="view_input"  name="unit_type" defaultValue={this.props.unit.unit_type} disabled={this.props.editing ? true : false} required>
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
								<option>Other</option>
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
}