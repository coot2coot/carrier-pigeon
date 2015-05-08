/** @jsx React.DOM */

module.exports = function(React, Link) {

    var AdminLink = React.createClass({
        render: function() {
            return (
                <Link to="admin">
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
                    <Link to="settings" params={{username: this.props.user.username}}>
                        <p>Settings</p>
                    </Link>
                    <div>
                        {(this.props.user.admin
                            ? <AdminLink /> 
                            : <p></p>
                        )}
                    </div>
                    <p className="hide-extra-small">Welcome {this.props.user.username}</p>
                </div>
            )
        }
    });
}