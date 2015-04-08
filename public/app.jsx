var React = require('react');
var Router = require('react-router');

var Login = require("./components/loginPage.jsx");
var Header = require("./components/header.jsx");

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var MyAboutView = React.createClass({
  render: function() {
    return (
      <div >
         My About
      </div>
    );
  }
});


var routes = (
    <Route handler={Header} path="/">
        <Route name="login" path="/login" handler={Login}/>
        <Route name="orders" path="/orders" handler={Login}/>
        <Route name="MyAboutView" path="/view" handler={MyAboutView}/>
    </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
    console.log(Handler);
    React.render(
        <Handler/>, 
        document.body
    );
});