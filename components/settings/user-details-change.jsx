/** @jsx React.DOM */

var React  = require('react');

var detailsChange = React.createClass({
    render: function() {
        console.log(this.props.user);
        return (
            <div>
                <form className="account" action={"/user/update/" + this.props.user.username} method="POST">
                    <div>
                        {( this.props.params && this.props.params.error
                            ? <Error message="Sorry, your password isn't correct. Please try again." />
                            : <p className="display-none"></p>
                        )}
                    </div>
                    <p className="name">First name</p><p className="name">Last name</p>
                    <input type="text" name="first_name" value={this.props.user.first_name} required />
                    <input type="text" name="last_name" value={this.props.user.last_name} required />
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