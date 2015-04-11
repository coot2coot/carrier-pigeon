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
                    <Link to = "login">
                        <p>Logout</p>
                    </Link>
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