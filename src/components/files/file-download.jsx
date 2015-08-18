var React = require('react');

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
			url: '/file/delete',
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

		var fileName = this.state.fileName;

		return (

			<div className='row'>

				<button type='button' className={fileName === null ? 'display-none' : 'button blue'} onClick={this.downLoad}>file</button>
				<button type='button' className={fileName === null ? 'display-none' : 'button red'} onClick={this.remove}>Delete file</button>
			</div>
		);
	}
});

module.exports = fileDownload;