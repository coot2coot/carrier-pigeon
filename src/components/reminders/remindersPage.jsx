/** @jsx React.DOM */

var React  			= require('react');
var Error 			= require("../error-message.jsx");
var Header 			= require("../header/header.jsx");

var remindersPage = React.createClass({
	getInitialState: function() {
      return {
        reminders: [
            {
            	contact : "birnard",
            }
        ],
        error: false,
        creatingReminder: false
      };
    },
	render: function() {
		return (

			<div >
				<Header/>
				<div className="column-14 push-1 model-generic">

					<div className="panel-header" >
						<h3>Reminders</h3>
						<button data-tooltip="Add reminder" className="button add blue" >+</button>
					</div>
					<div className="panel-body table-responsive scroll">
						<table className="table table-full">
							<th>
								<h5>Contact</h5>
							</th>
							<tbody>
								 <tr>
				            		<td >
				            			<a >
				            				<p></p>
				            			</a>
				            		</td>
				            	</tr>
							</tbody>
						</table>
					</div>
				</div>
                
			</div>
		);
	}
})

module.exports = remindersPage;