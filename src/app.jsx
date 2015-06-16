/** @jsx React.DOM */

var React       = require('react');
var Router      = require('react-router');

var DefaultRoute= Router.DefaultRoute;
var Route       = Router.Route;
var RouteHandler= Router.RouteHandler;

var Header      = require("./components/header/header.jsx");
var Login       = require("./components/login-panel.jsx");
var Orders      = require("./components/orders/ordersPage.jsx");
var Contacts    = require("./components/contacts/contactsPage.jsx");
var Reminders   = require("./components/reminders/remindersPage.jsx");
var AdminPanel  = require("./components/admin-panel.jsx");
var Settings    = require("./components/settings/settings.jsx");
var BookingNote = require("./components/booking-note/booking-note.jsx");


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
            <Route name="orderUpdate" path=":update" handler={Orders}>
                <Route name="orderJobNumber" path=":job_no" handler={Orders}/>
            </Route>
        </Route>
         <Route name="contacts" path="/contacts" handler={Contacts}>
            <Route name="contactUpdate" path=":update" handler={Contacts} />
        </Route>

        <Route name="reminders" path="/reminders" handler={Reminders}>
            <Route name="reminderUpdate" path=":update" handler={Reminders} />
        </Route>

        <Route name="login" path="/login" handler={Login}>
            <Route name="errorLogin" path=":error" handler={Login} />
        </Route>

        <Route name="reports" path="/reports" handler={Test} />

        <Route name="booking-note" path="/booking-note/:job_no" handler={BookingNote} />

        <Route name="admin" path="/users" handler={AdminPanel}>
            <Route name="userUpdate" path=":update" handler={AdminPanel} />
            <Route name="errorAdmin" path="show/:error" handler={AdminPanel} />
        </Route>

         <Route name="settings" path="/settings" props="settings" handler={Settings}>
            <Route name="errorSettings" path="show/:error" handler={Settings} />
            <Route name="AddUnitType" path="units" props="units" handler={Settings} />
        </Route>

        <DefaultRoute handler={Header}/>  
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
});