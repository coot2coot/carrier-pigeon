/** @jsx React.DOM */

var React  = require('react');

var detailsChange = React.createClass({
    getInitialState: function() {
        return {
            first_name: "",
            last_name: ""
        };
    },

    componentWillReceiveProps: function(props) {
        this.setState({
            first_name: props.user.first_name,
            last_name: props.user.last_name
        });
    },

    onFirstNameChange: function(event) {
        this.setState({
            first_name: event.target.value
        });
    },

    onLastNameChange: function(event) {
        this.setState({
            last_name: event.target.value
        });
    },

    render: function() {
        return (
            <div>
                <form className="settings" action={"/user/update/" + this.props.user.username} method="POST">
                    <div>
                        {( this.props.params && this.props.params.error
                            ? <Error message="Sorry, your password isn't correct. Please try again." />
                            : <p className="display-none"></p>
                        )}
                    </div>
                    <p className="name">First name</p><p className="name">Last name</p>
                    <input type="text" name="first_name" value={this.state.first_name} onChange={this.onFirstNameChange} required />
                    <input type="text" name="last_name" value={this.state.last_name} onChange={this.onLastNameChange} required />
                    <br/>
                    <p>Enter your current password</p><input type="password" name="current_password" required/>
                    <p>Enter your new password</p><input type="password" name="new_password" required/>
                    <p>Confirm your new password</p><input type="password" name="confirm_password" required/>
                    <input type="submit" className="button charcoal" />
                </form>
            </div>
        )
    }
});

module.exports = detailsChange;
