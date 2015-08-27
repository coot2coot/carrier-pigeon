function removeCommas (val) {
	
	var reg = /,/gi
	val = val.replace(reg,"")
	return val;
}

module.exports = removeCommas;