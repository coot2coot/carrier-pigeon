/** @jsx React.DOM */

var React   = require('react');

var warning = React.createClass({
    
    render: function() {
        return (
            <div className="overlay">
                <div className="column-6 push-5 model-generic model-middle warning">
                    <div className="panel-header ">  
                     <h3>{this.props.message}</h3>                    
                    </div>
                    
                     <div className="panel-body ">
                     <a className=" column-3 push-6" onClick={this.props.closeView}>YES</a>
                     <a className=" column-3 push-6" onClick={this.props.closeWarning}>NO</a>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = warning;