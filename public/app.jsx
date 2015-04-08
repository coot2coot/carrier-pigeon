var React = require('react');
var Router = require('react-router');

var Login = require("./components/loginPage.jsx");

var Orders = require("./components/ordersPage.jsx")

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
    <Route>  
    <Route name= "orders" handler={Orders} /> 
    <DefaultRoute handler={Login}/>  
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});