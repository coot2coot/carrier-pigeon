/** @jsx React.DOM */

var React   = require('react');

var warning = React.createClass({
    
    render: function() {
        return (
            <div className="overlay">
                <div className="column-6 push-5 model-generic model-middle warning">
                    <div className="panel-header">  
                     <h3>{this.props.message}</h3>                    
                    </div>
                    
                    <div className="panel-body">
                        <div className="row close-warning">
                            <button className="button charcoal center" onClick={this.props.closeView}>YES</button>
                            <button className="button charcoal center" onClick={this.props.closeWarning}>NO</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = warning;