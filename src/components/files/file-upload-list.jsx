var React = require('react');
var Upload= require('./file-upload.jsx');

var fileUploadList = React.createClass({

	getInitialState: function () {

	    return {
	          files: [{}]
	    };
	},

	removeFile: function (i) {


  		if (this.state.files.length > 1) {

			this.state.files.splice(i, 1);

			var files = this.state.files;

	  		this.setState({
	    		files: files
	    	});
	    }
	},

	addFile: function (i) {

		this.state.files.splice(i + 1, 0, {});;
		var files = this.state.files

		this.setState({
			files: files
		})
	},

	render: function () {

		var props 		= this.props;
		var addFile 	= this.addFile;
		var removeFile 	= this.removeFile;

		return (
			<div>
				{
					this.state.files.map( function (val, i) {
						return <Upload i={i} addFile={addFile.bind(null, i)} removeFile={removeFile.bind(null, i)} ifEdited={props.ifEdited} disable={false}/>
					})
				}
			</div>

		);
	}
});

module.exports = fileUploadList;
								