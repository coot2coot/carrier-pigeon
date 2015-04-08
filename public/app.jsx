var React = require('react');
var Router = require('react-router');

var Login = require("./components/loginPage.jsx");

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
    render: function () {
        return (
            <p>Hi! Put this in the navbar please</p>
        );
    }
});

var routes = (
    <Route handler={App} path="/">
        <Route name="login" path="/login" handler={Login}/>
        <Route name="orders" path="/orders" handler={Login}/>
        <DefaultRoute handler={App}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});