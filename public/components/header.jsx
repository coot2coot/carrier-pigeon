/** @jsx React.DOM */

// TODO: make sure there is validation on every page. And redirection if not validated.


var token = sessionStorage.getItem('token') || localStorage.getItem('token');

var auth = {
    loggedIn: function () {
        return !!token;
    }
};

//TODO: 
var isAdmin = true;

module.exports = function(React, Link) {

    var Navbar = require("./nav.jsx")(React, Link);
    var HeaderLinks = require("./header-links.jsx")(React, Link, isAdmin);

    return React.createClass({
        getInitialState: function(){
            return null
        },
        componentWillMount: function() {
            this.setState({
                loggedIn: auth.loggedIn()
            });
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
                            ? <HeaderLinks /> 
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