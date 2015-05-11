/** @jsx React.DOM */

module.exports = function(React, Link) {

    return  React.createClass({
        deleteUser: function (item) {
            this.setState({
                removeUser: item
            })
        },
        render: function() {
            return (
                <div className="overlay">
                    <div className="column-6 push-5 model-generic model-middle warning">
                        <div className="panel-header">
                            <h3>{this.props.message}</h3>
                            <a className="close" onClick={this.props.closeView}>x</a>
                        </div>
                        <div className="panel-body">
                            <p>Please note that this action cannot be undone</p>
                            <table className="table table-full">
                                
                                    {(this.props.user
                                        ?   <tr><td><p>username:</p></td><td><p>{this.props.user.username}</p></td> </tr>
                                        :   <tr><td><p>Job No:</p></td><td><p>{this.props.order.job_number}</p></td> </tr>
                                    )}
                               
                            </table>
                            <a className="button charcoal" href={this.props.url}>Delete</a>
                        </div>
                    </div>
                </div>
            )
        }
    })
}