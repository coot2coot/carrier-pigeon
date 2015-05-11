module.exports = function(React, Link) {
	return React.createClass({
		render: function () {
			return (
				<units>
					<div className="row column-14">
						<div className="column-4">
							<p>Unit Type</p>
							<select name="unit_type"required>
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
							<input type="number" name="unit_weight"/>
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
}