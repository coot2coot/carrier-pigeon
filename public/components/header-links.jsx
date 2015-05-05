/** @jsx React.DOM */

module.exports = function(React, Link) {

    var AdminLink = React.createClass({
        render: function() {
            return (
                <Link to = "admin">
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
                        {(this.props.admin
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