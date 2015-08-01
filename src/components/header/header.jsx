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

        $.ajax({
            url: url,
            dataType: 'json',
            success: function (data) {
                var router          = this._reactInternalInstance._context.router;
                var loginRoute      = router.getCurrentRoutes()[1].name;
                var defaultRoute    = router.getCurrentRoutes()[1].path;

                if (defaultRoute === "/" || loginRoute === "login") {

                    if (data.user.permission_orders) {
                        this._reactInternalInstance._context.router.transitionTo("orders");
                    
                    } else if (data.user.permissions_contact) {
                        this._reactInternalInstance._context.router.transitionTo("contacts");
                    } else {
                        document.location.href = '/logout'
                    }
                }

                if (this.props.isAdmin) {

                    this.props.isAdmin(data.user);
                }

                this.props.setUser(data.user);
                
                this.setState({
                    loggedIn: true,
                    user: data.user
                });

            }.bind(this),

            error: function (xhr, status, err) {
                var router = this._reactInternalInstance._context.router;
                var routes = router.getCurrentRoutes();
                
                if (routes.length === 2) {
                    this._reactInternalInstance._context.router.transitionTo("login");
                }

            }.bind(this)
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

                    {( this.state.loggedIn
                        ? <HeaderLinks user={this.state.user}/> 
                        : <p></p>
                    )}

                    </div>
                </div>
                <div className="row">
                    <div className="column-12 push-1">

                        {( this.state.loggedIn
                            ? <Navbar user={this.state.user}/>
                            : <p></p>
                        )}
                        
                    </div>
                </div>
            </header>
        );
    }
})

module.exports = header;
