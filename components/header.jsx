/** @jsx React.DOM */

var React       = require('react');

var Navbar      = require("./nav.jsx");
var HeaderLinks = require("./header-links.jsx");

var header = React.createClass({
    getInitialState: function() {
        return {
            username: "",
            admin: false
        };
    },

    componentWillMount: function() {
        var url = "/login/verify";

        if (!this.props.loggedOut) {
            $.ajax({
                url: url,
                dataType: 'json',
                success: function(data) {

                    if (this.props.isAdmin) {
                        this.props.isAdmin(data.user);
                    }
                    
                    this.setState({
                        loggedIn: true,
                        user: data.user
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

                    {( this.state.loggedIn
                        ? <HeaderLinks user={this.state.user}/> 
                        : <p></p>
                    )}

                    </div>
                </div>
                <div className="row">
                    <div className="column-12 push-1">

                        {( this.state.loggedIn
                            ? <Navbar />
                            : <p></p>
                        )}
                        
                    </div>
                </div>
            </header>
        );
    }
})

module.exports = header;
