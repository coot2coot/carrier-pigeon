/** @jsx React.DOM */

var React       = require('react');
var Router      = require('react-router');

var DefaultRoute= Router.DefaultRoute;
var Link        = Router.Link;
var Route       = Router.Route;
var RouteHandler= Router.RouteHandler;

var Login       = require("./components/login-panel.jsx");
var Orders      = require("./components/ordersPage.jsx");
var AdminPanel  = require("./components/admin-panel.jsx");
var Settings    = require("./components/settings.jsx");


var Test = React.createClass({
    render: function() {
        return (
            <div>
                <h4>Just Testing!!</h4>
            </div>
        );
    }
})


var routes = (
    <Route>  
        <Route name="orders" path="/orders" handler={Orders}>
            <Route name="orderUpdate" path=":update" handler={Orders} />
        </Route>
        <Route name="login" path="/login" handler={Login}>
            <Route name="errorLogin" path=":error" handler={Login} />
        </Route>
        <Route name="reports" path="/reports" handler={Test} />
        <Route name="contacts" path="/contacts" handler={Test} />

        <Route name="admin" path="/users" handler={AdminPanel}>
            <Route name="userUpdate" path=":update" handler={AdminPanel} />
            <Route name="errorAdmin" path="show/:error" handler={AdminPanel} />
        </Route>

         <Route name="settings" path="/settings/:username" handler={Settings}>
            <Route name="errorSettings" path=":error" handler={Settings} />
        </Route>

        <DefaultRoute handler={Login}/>  
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});