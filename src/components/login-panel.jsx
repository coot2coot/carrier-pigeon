var React  = require('react');

var Header = require("./header/header.jsx");
var Error  = require("./error-message.jsx");

var loginPanel = React.createClass({
    render: function() {
        return (
            <div>
                <Header loggedOut="true" />
                <div className="column-4 push-6 model-generic model-middle">
                    <div className="panel-header">
                        <h2>Login</h2>
                    </div>
                    <div className="panel-body">
                         <div>
                            {(this.props.params.error
                                ? <Error message="Sorry, those logins are not correct" />
                                : <p className="display-none"></p>
                            )}
                        </div>
                        <form action="/login/user" method="post">
                            <p>Username</p>
                            <input type="text" name="username" requireed/>
                            <p>Password</p>
                            <input type="password" name="password" required/>
                            <input type="checkbox" name="remember" /><p className="small">Remember me</p>
                            <input className="button charcoal" type="submit" value="Login" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
})

module.exports = loginPanel;
