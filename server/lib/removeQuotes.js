function remove (object){
	for( var prop in object){
		if(typeof object[prop] === 'string' ){
			var reg = /'/gi
			object[prop] = object[prop].replace(reg,"''")
		}
	}
	return object;
}

module.exports = remove;