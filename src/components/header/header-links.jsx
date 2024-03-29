var React  = require('react');
var Router = require('react-router');
var Link   = Router.Link;

var AdminLink = React.createClass({
    render: function() {
        return (
            <Link to="admin">
                <p>Admin Panel</p>
            </Link>
        )
    }
});

var headerLinks = React.createClass({
    render: function() {
        return (
            <div>
                <a href="/logout">
                    <p>Logout</p>
                </a>
                <Link to="settings" query={{}}>
                    <p>Settings</p>
                </Link>
                <div>
                    {(this.props.user.admin
                        ? <AdminLink /> 
                        : <p className="display-none"></p>
                    )}
                </div>
                <p className="hide-extra-small">Welcome {this.props.user.username}</p>
            </div>
        )
    }
});

module.exports = headerLinks;