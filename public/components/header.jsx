/** @jsx React.DOM */

//TODO: Make this dependent on real authentication
var isAuthenticated = true;
var isAdmin = true;

// {(isAdmin
//     ? <AdminLink />     
//     : <div>Never showing false item</div>
// )}


module.exports = function(React, Link) {
    var Navbar = require("./nav.jsx")(React, Link);
    
    var AdminLink = React.createClass({
        render: function() {
            return (
                <Link to = "login">
                    <p>Admin Panel</p>
                </Link>
            )
        }
    });

    var Buttons = React.createClass({
        render: function() {
            return (
                <div>
                    <Link to = "login">
                        <p>Logout</p>
                    </Link>
                    <p className="hide-extra-small">Welcome username</p>
                </div>
            )
        }
    });
    return React.createClass({
        login: function(e) {
            alert("hello there");
        },
        render: function() {
            return (
                <header className="container-fluid">
                    <div className="row">
                        <div className="column-6 push-1">
                            <h1>Coot Freight Ltd</h1>
                        </div>
                        <div>
                        {(isAuthenticated
                            ? <Buttons />     
                            : <div>Never showing false item</div>
                        )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="column-12 push-1">
                            {(isAuthenticated
                                ? <Navbar />     
                                : <div>Never showing false item</div>
                            )}
                        </div>
                    </div>
                </header>
            );
        }
    })
}