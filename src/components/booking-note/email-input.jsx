var React  = require('react');
var ContactList = require('../orders/contact-list.jsx')

var EmailInput = React.createClass({

    render: function() {
        return (
            <div className="overlay">
		        <div className="column-6 push-5 model-generic model-middle email">
                    <div className="panel-header">
                        <h3>Enter an email</h3>
                        <a className="close" onClick={this.props.closeView}>x</a>
                    </div>
                    <div className="panel-body">
                        <br/>
                        <form onSubmit={this.props.sendEmail}>
                            <div className="row">
                                <div className="column-3">
                                    <p>To:</p>
                                </div>
                                <div className="column-13">
                                    <ContactList property="email" placeholder="email@example.com" contactType="toemail" email={true} autoFocus={true}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="column-3">
                                    <p>Cc:</p>
                                </div>
                                <div className="column-13">
                                    <ContactList property="email" placeholder="email@example.com, another@example.com" contactType="ccemail" email={true} />
                                </div>
                            </div>
                            <input type="submit" className="button charcoal" value="Submit"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});


module.exports = EmailInput;