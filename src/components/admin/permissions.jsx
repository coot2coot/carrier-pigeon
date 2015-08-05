var React   = require('react');

var permissions = React.createClass({
    getInitialState: function() {
        return {
            admin: this.props.user.admin,
            permission_ledger: this.props.user.permission_ledger,
            permission_contact: this.props.user.permission_contact,
            permission_orders: this.props.user.permission_orders
        }
    },

    handleChange: function(e) {
        var data = {};
        data[e.target.name] = e.target.checked;

        this.setState(data);
    },

    render: function() {
        return (
            <div className="overlay">
                <div className="column-6 push-5 model-generic model-middle warning">
                    <div className="panel-header">
                        <h3>Set user permissions</h3>
                        <a className="close" onClick={this.props.closeView}>x</a>
                    </div>
                    <div className="panel-body">
                        <br/>                            
                        <form action="permissions/edit" method="POST">
                            <table className="table table-full">
                                <tr>
                                    <th>
                                        Admin
                                    </th>
                                    <th>
                                        Orders
                                    </th>
                                    <th>
                                        Contacts
                                    </th>
                                    <th>
                                        Ledger
                                    </th>
                                </tr>

                                <tr>
                                    <td>
                                        <input type="checkbox" name="admin" checked={this.state.admin} onChange={this.handleChange}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name="permission_orders" checked={this.state.permission_orders} onChange={this.handleChange}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name="permission_contact" checked={this.state.permission_contact} onChange={this.handleChange}/>
                                    </td>
                                    <td>
                                        <input type="checkbox" name="permission_ledger" checked={this.state.permission_ledger} onChange={this.handleChange}/>
                                    </td>
                                </tr>
                               
                            </table>
                            <input className="display-none" type="text" name="user" value={this.props.user.username}/>
                            <input className="charcoal button" type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = permissions;