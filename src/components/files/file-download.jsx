var React 	= require('react');
var Upload 	= require("../files/file-upload.jsx");

var fileDownload = React.createClass({

	getInitialState : function () {

		return {
			fileName : this.props.file
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

	remove: function () {

		var fileName 	= this.props.file;
		var id 			= this.props.Id;
		var that 		= this;

		$.ajax({
			type: 'POST',
			url: '/file/delete/download',
			data: {
				file_name: fileName,
				id: id
			},
			success: function () {

				that.setState({
					fileName: null
				})
			},
			error: function (error) {
				
				console.log('error', error)
			}
		});
	},

	render : function () {

		var fileName 	= this.state.fileName;
		var disable		= this.props.disable;

		return (
			<div>
				
				<div className='row'>
			
					{
						fileName !== null && fileName !== ''
							? (<div>
									<div className='row'><p>File {fileName}</p></div>
									<button type='button'
										className='button blue ' 
										onClick={this.downLoad}
										>
										Download file
									</button>
									<button type='button'
										className='button red'
										onClick={this.remove}
										>
										Delete file
									</button>
								</div>
							)
							: <Upload disable={true}/>
					}
				</div>
			</div>
		);
	}
});

module.exports = fileDownload;