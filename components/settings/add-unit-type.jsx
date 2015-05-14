/** @jsx React.DOM */

var React  = require('react');

var detailsChange = React.createClass({
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

    render: function() {
        return (
            <div className="settings">
                <p>Current unit types:</p>
                <select>
                    { this.state.options.map(function (unit, i) {
                        return (
                            <option>{unit.types}</option>
                        )
                    })}
                </select>

                <form action="/unit/create" method="POST">
                    <p>Add new unit type</p>
                    <input type="text" name="new_unit" required/>
                    <input type="submit" className="button charcoal" />
                </form>
            </div>
        )
    }
});


module.exports = detailsChange;