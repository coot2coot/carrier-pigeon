var React 		= require('react');
var LoadingGiff = require("../loadingGiff.jsx");
var Warning 	= require("../close-warning.jsx");

var accessKey	= require("../../../credentials.json").awsAccessKey;

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

  		var file 			= document.querySelector('input[type=file]');

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

			  		that.getPolicy();
					that.setState({
						errorMessage: ''
				  	});
				  	
				}
			);
		};
	},

	getPolicy: function () {

  		var isFileSending 	= this.isFileSending;
  		var upLoadFile		= this.upLoadFile;
  		var checkFile		= this.checkFile;
  		var getUrl 			= "/file/policy";
  		this.props.ifEdited();	
  		isFileSending();

  		$.get(getUrl, function (result) {

  			
  			upLoadFile(result);
  		}).fail(function () {

  			isFileSending();
			console.log("get s3 policy did not work")
		});
  	},

  	upLoadFile: function (result) {

  		var data 	= JSON.parse(result);
  		var fileElem= document.querySelector('input[type=file]');
  		var that	= this;
  		var fileName= document.querySelector('input[name=file_name]');
  		var reader  = new FileReader();
  		this.closeWarning();

  		reader.onload = function (e) {

  			var file 	= document.querySelector('input[type=file]').files[0];
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

  	closeWarning: function () {

  		this.setState({
  			errorMessage: ''
	  	});
  	},

  	render: function () {

  		return (
  			
  			<div className="row">

				{this.state.sendingFile
					?<LoadingGiff/>	
					:<div className='row'><p>File Upload</p></div>
				}
			   	<input type='file' disabled={this.state.disable} onChange={this.checkFile} className={this.state.sendingFile ? 'display-none' : ''}/>

				<input name='file_name' className='display-none' />
			
				{(this.state.errorMessage !== ''
                    ? <Warning message={this.state.errorMessage} closeView={this.getPolicy} closeWarning={this.closeWarning}/>
                    :<p></p>
                )}
            </div>
  		)
  	}
})

module.exports = fileUpload;