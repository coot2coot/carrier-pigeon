/** @jsx React.DOM */

module.exports = function(React, Link, admin) {

    var AdminLink = React.createClass({
        render: function() {
            return (
                <Link to = "login">
                    <p>Admin Panel</p>
                </Link>
            )
        }
    });

    return  React.createClass({

        render: function() {
            return (
                <div>
                    <a href="/logout">
                        <p>Logout</p>
                    </a>
                    <div>
                        {(admin
                            ? <AdminLink /> 
                            : <p></p>
                        )}
                    </div>
                    <p className="hide-extra-small">Welcome {this.props.name}</p>
                </div>
            )
        }
    });
}