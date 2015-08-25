var React 	= require('react');
var Upload 	= require("../files/file-upload.jsx");

var fileDownload = React.createClass({

	getInitialState : function () {

		return {
			fileName : this.props.file,
			errorMessage: false
		};
	},

	downLoad: function () {

		var fileName = this.props.file;
		var getUrl = "http://carrier-pigeon-s3.s3.amazonaws.com/" + fileName;

		$.get(getUrl, function (result) {

			var a = document.createElement('a');
			a.download = fileName;
			a.href = result;
			a.textContent = "Download " +  fileName;
			a.click();
		})

	},

	newFilesString: function () {

		var fileName 	= this.props.file;
		var allFiles	= document.querySelectorAll('input[name=file_name]');
		var files 		= Object.keys(allFiles).slice(0,-1);
		files 			= files.filter(function (val) { return allFiles[val].value !== fileName });
		files 			= files.map(function (val, i ) { return allFiles[val].value });
		return files.join();
	},

	warning: function () {

		this.setState({
  			errorMessage: true
	  	});
	},

	closeWarning: function () {

  		this.setState({
  			errorMessage: false
	  	});
  	},

	remove: function () {

		var fileName 	= this.props.file;
		var id 			= this.props.Id;
		var that 		= this;
		var fileString  = this.newFilesString();

		$.ajax({
			type: 'POST',
			url: '/file/delete/download',
			data: {
				file_name: fileName,
				files: fileString,
				id: id
			},
			success: function () {

				that.setState({
					fileName: null
				})
				that.props.removeFile();
			},
			error: function (error) {
				
				console.log('error', error)
			}
		});
	},

	render : function () {

		var state 	= this.state;
		var props 	= this.props;

		return (
			<div>
				
				<div className='row'>
			
					{
						typeof state.fileName === 'string' && state.fileName !== ''
							? (<div>
									<div className='row file'><p>File {state.fileName}</p></div>
									<button type='button'
										className='button blue ' 
										onClick={this.downLoad}
										>
										Download file
									</button>
									<button type='button'
										className='button red'
										onClick={this.warning}
										>
										Delete file
									</button>
									<input name='file_name' defaultValue={state.fileName} className='display-none' />
								</div>
							)
					
							: (<Upload disable={false} 
									i = {props.i}
									addFile={props.addFile} 
									removeFile={props.removeFile} />)
					}

					{(state.errorMessage
						? (<Warning
								message='Are you sure that you would like do delete this file?'
								closeView={this.remove}
								closeWarning={this.closeWarning}/>)
	                    :<p></p>
	                )}
				</div>
			</div>
		);
	}
});

module.exports = fileDownload;