function removeCommas (val) {
	
	var reg = /,/gi
	val = val.replace(reg,"")
	return object;
}

module.exports = removeCommas;