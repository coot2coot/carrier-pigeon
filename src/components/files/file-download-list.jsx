var React 		= require('react');
var FileDownload= require("../files/file-download.jsx");

var fileDownloadList = React.createClass({

	getInitialState: function () {

		return {
			files: [{}]
		};
	},


	removeFile: function (i) {

		var files = this.state.files;

  		if (this.state.files && this.state.files.length > 1) {

			this.state.files.splice(i, 1);

	  		this.setState({
	    		files: files
	    	});
	    }
	},

	addFile: function (i) {

		var files = this.state.files;
		if (files) {
			this.state.files.splice(i + 1, 0, {});;
		
			this.setState({
				files: files
			})
		}
	},

	componentWillMount: function () {

		if (this.props.file) {
			var filesArr = this.props.file.split(',');
			this.setState({
				files: filesArr
			});
		}
	},

	render: function () {

		var props 		= this.props;
		var state 		= this.state;
		var addFile 	= this.addFile;
		var removeFile 	= this.removeFile;

		return (
			<div>
				{
					state.files.map( function (file, i) {

						console.log('i', file)

						return (
								<FileDownload Id={props.Id}
									i= {i} 
									addFile={addFile.bind(null, i)} 
									removeFile={removeFile.bind(null, i)} 
									disable={true} 
									file={file}/>
								);
					})
				}
			</div>
		);
	}
})

module.exports = fileDownloadList;