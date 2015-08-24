var React 		= require('react');
var LoadingGiff = require("../loadingGiff.jsx");
var Warning 	= require("../close-warning.jsx");

var accessKey	= "AKIAIP2WE7XK6HTLZFBA";

var fileUpload = React.createClass({

	getInitialState: function () {

		return {
			errorMessage: '',
	    	sendingFile: false,
	    	disable: false
		};
	},

	isFileSending: function () {

  	var sendingFile = this.state.sendingFile;
		this.setState({
  			sendingFile: !sendingFile
  		});
  	},

  	checkFile: function (result) {

  		var index 	= this.props.i;
  		var file = document.querySelectorAll('input[type=file]')[index];

  		if (file.files && file.files[0]) {

	  		var upLoadFile 		= this.upLoadFile;
	  		var fileName 		= file.files[0].name;
	  		var that 			= this;

	  		$.ajax({
				url: "http://carrier-pigeon-s3.s3.amazonaws.com/" + fileName,
				type: "HEAD"
			}).then(

			  	function () {

			  		that.setState({
			  			errorMessage: fileName + ' already exists do you want to overwrite it?'
				  	})
			  	},
			  	function () {

					that.setState({
						errorMessage: 'Are you sure that you would like to upload ' + fileName + '?'
				  	});

				}
			);
		};
	},

	getPolicy: function () {

  		var isFileSending 	= this.isFileSending;
  		var upLoadFile		= this.upLoadFile;
  		var checkFile		= this.checkFile;
  		var ifEdited		= this.props.ifEdited;
  		var getUrl 			= "/file/policy";

  		ifEdited ? ifEdited() : '' ;

  		isFileSending();

  		$.get(getUrl, function (result) {

  			upLoadFile(result);
  		}).fail(function () {

  			isFileSending();
			console.log("get s3 policy did not work")
		});
  	},

  	upLoadFile: function (result) {

  		var index 	= this.props.i;
  		var data 	= JSON.parse(result);
  		var fileElem= document.querySelectorAll('input[type=file]')[index];
  		var that	= this;
  		var fileName= document.querySelectorAll('input[name=file_name]')[index];
  		var reader  = new FileReader();
  		this.closeWarning();

  		reader.onload = function (e) {

  			var file 	= fileElem.files[0];
		  	var dataURL = reader.result;

			var fd = new FormData();
				fd.append('key', file.name);
				fd.append('acl', 'public-read');
				fd.append('Content-Type', file.type);
				fd.append('Content-Length', file.size);
				fd.append('AWSAccessKeyId',  accessKey);
				fd.append('policy', data.policy);
				fd.append('signature', data.signature);
				fd.append("file", dataURL);

				$.ajax({
					type: 'POST',
					url: "http://carrier-pigeon-s3.s3.amazonaws.com",
					processData: false,
					contentType: false,
					data: fd,
					success: function (data) {

						that.isFileSending();
						fileName.value = file.name;
						that.props.addFile();
						console.log(document.querySelectorAll('div.row.file p')[0])
						// document.querySelectorAll('div.row.file p')[0].innerHTML = file.name;
						that.setState({
							disable: true
						})
					},
					error: function (error) {

						that.isFileSending();
						console.log(error)
					}
				});
		}
		if (fileElem && fileElem.files[0]) {

  			reader.readAsDataURL(fileElem.files[0]);
  		}
  	},

  	remove: function () {

  		var index	= this.props.i;
  		var file 	= document.querySelectorAll('input[name=file_name]')[index];
  		var fileElem= document.querySelectorAll('input[type=file]')[index];
  		var that 	= this;
  		this.isFileSending();

		$.ajax({
			type: 'POST',
			url: '/file/delete/upload',
			data: {
				file_name: file.value
			},
			success: function () {

				that.isFileSending();
				that.setState({
					disable: false
				});
				file.value = null;
				fileElem.value = '';
				that.props.removeFile();
			},
			error: function (error) {

				that.isFileSending();
				console.log('error', error)
			}
		});
	},

  	closeWarning: function () {

  		this.setState({
  			errorMessage: ''
	  	});
  	},

  	render: function () {

  		var state 		= this.state;
  		var disable 	= this.props.disable;

  		return (

  			<div className="row">

				{
					state.sendingFile
						?<LoadingGiff/>
						:<div className='row file'><p>File Upload</p></div>
				}

				<input type='file'
					onChange={this.checkFile}
					className= {state.disable || state.sendingFile
									? 'display-none'
									: 'view_input'} disabled={disable}/>

				<button type='button'
					className= {state.disable && !state.sendingFile
									? 'button red float-left'
									: 'display-none'}
					onClick= {this.remove} disabled={disable}>
					Remove File
				</button>

				<input name='file_name' className='display-none' />

				{(state.errorMessage !== ''
                    ? (<Warning
                    		message={state.errorMessage}
                     		closeView={this.getPolicy}
                     		closeWarning={this.closeWarning}/>)
                    :<p></p>
                )}
            </div>
  		)
  	}
})

className="view_input"

module.exports = fileUpload;
