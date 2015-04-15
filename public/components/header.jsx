/** @jsx React.DOM */

//TODO: 
var isAdmin = false;

module.exports = function(React, Link) {

    var Navbar = require("./nav.jsx")(React, Link);
    var HeaderLinks = require("./header-links.jsx")(React, Link, isAdmin);

    return React.createClass({
        getInitialState: function() {
            return {username: 'test'};
        },
        componentWillMount: function() {
            var url = "/login/verify";

            if (!this.props.loggedOut) {
                $.ajax({
                    url: url,
                    dataType: 'json',
                    success: function(data) {
                        this.setState({
                            loggedIn: true,
                            username: data.username
                        });
                    }.bind(this),
                    error: function(xhr, status, err){
                        console.log(xhr, status, err);
                    }.bind(this)
                });
            }
        },
        render: function() {
            return (
                <header className="container-fluid">
                    <div className="row">
                        <div className="column-6 push-1">
                            <h1>Coot Freight Ltd</h1>
                        </div>
                        <div>
                        {(this.state.loggedIn
                            ? <HeaderLinks name={this.state.username} /> 
                            : <p></p>
                        )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="column-12 push-1">
                            {(this.state.loggedIn
                                ? <Navbar />
                                : <p></p>
                            )}
                        </div>
                    </div>
                </header>
            );
        }
    })
}
