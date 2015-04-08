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
         <p>My About</p>
      </div>
    );
  }
});

var Orders = React.createClass({
  render: function() {
    return (
      <div >
         <p>Orders!</p>
      </div>
    );
  }
});


var routes = (
    <Route>  
    <Route name= "orders" path="/orders" handler={Orders} />
    <Route name= "login" path="/login" handler={Login} />
    <Route name="MyAboutView" path="/view" handler={MyAboutView}/>
    <DefaultRoute handler={Header}/>  
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});