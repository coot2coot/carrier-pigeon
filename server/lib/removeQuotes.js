function remove (object){
	for( var prop in object){
		var reg = /'/gi
		object[prop] = object[prop].replace(reg,"''")
	}
	return object;
}

module.exports = remove;