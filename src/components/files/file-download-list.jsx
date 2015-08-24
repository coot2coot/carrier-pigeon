var React 		= require('react');
var FileDownload= require("../files/file-download.jsx");

var fileDownloadList = React.createClass({

	getIntialState: function () {

		return {
			files: [{}]
		}
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

	componentWillMount: function () {

		var filesArr = this.props.file.split(',');

		this.setState({
			files: filesArr
		});

	},

	render: function () {

		var props = this.props;
		var state = this.state;

		return (
			<div>
				{
					state.files.map(function (file) {

						return <FileDownload Id={props.Id} disable={true} file={file}/>
					})
				}
			</div>
		)
	}
})

module.exports = fileDownloadList;