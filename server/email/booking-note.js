var url = "http://carrierpigeonfac-se-env.elasticbeanstalk.com/";

function invitationString (logins) {
	var string = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
	'<html xmlns="http://www.w3.org/1999/xhtml">' +
	 	'<head>' +
	  		'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
	  		'<title>Demystifying Email Design</title>' +
	  		'<meta name="viewport" content="width=device-width, initial-scale=1.0"/>' +
	  		'<style type="text/css">' +
	  			'body {' +
	  				'height: 500px;' +
				  	'width: 800px;' +
				  	'font-family: arial, sans-serif;' +
				  	'background-color: #FAFAFA;' +
				  	'margin: 0;' +
  					'padding: 0;' +
	  			'}' +
	  			'header {' +
	  				'background: url("'+ url +'/img/email-header.png") top center no-repeat;' +
	  			'}' +
	  			'img {' +
	  				'text-align: left;' +
	  				'padding: 19px;' +
	  			'}' +
	  			'table {' +
	  				'width: 400px;' +
	  				'border-spacing: 0;' +
	  				'margin: 0 200px;' +
	  			'}' +
	  			'td {' +
					'border: 0.1em #D8D8D8 solid;' +
					'background: white;' +
					'color: #434343;' +
					'padding: 5px;' +
				'}' +
				'h2, p {' +
					'text-align: center;' +
					'color: black;' +
				'}' +
	  		'</style>' +
		'</head>' +
		'<body>' +
			'<header>' +
				'<img src="' + url + '/img/logo-full.png">' +
			'</header>' +
			'<div>' +
				'<h2>Hello!</h2>' +
				'<p>Attached is your booking note from Coot Freight</p>' +
			'</div>' +
		'</body>' +
	'</html>';
	return string;
}

module.exports = invitationString;