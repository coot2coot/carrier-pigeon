var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var getOrdersUrl = "http://localhost:8000/server/getorders";

var Login = require("./components/loginPage.jsx")(React, Link);
var Header = require("./components/header.jsx")(React, Link);
var Orders = require("./components/ordersPage.jsx")(React, Link, getOrdersUrl);


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
    <Route name= "orders" path="/orders" handler={Orders} />
    <Route name= "login" path="/login" handler={Login} />
    <Route name= "reports" path="/reports" handler={Test} />
    <Route name= "contacts" path="/contacts" handler={Test} />
    <DefaultRoute handler={Header}/>  
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});