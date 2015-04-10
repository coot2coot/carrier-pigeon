/** @jsx React.DOM */

module.exports = function (React, Link) {
    var Header = require("./header.jsx")(React, Link);

    return React.createClass({
        login: function(e) {
            alert("hello there");
        },
        render: function() {
            return (
                <div>
                    <Header />
                    <div className="column-6 push-5 model-generic model-middle">
                        <div className="panel-header">
                            <h2>Login</h2>
                        </div>
                        <div className="panel-body">
                                <p>Username</p>
                                <input type="text" name="username" />
                                <p>Password</p>
                                <input type="text" name="password" />
                                <input type="checkbox" name="remember" /><p className="small">Remember me</p>
                                <Link to = "orders">
                                    sign in
                                </Link>
                        </div>
                    </div>
                </div>
            );
        }
    })
}