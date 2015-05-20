var commands ={
	string : "",
	select : function (column) {
		this.string += " SELECT " + column
		return this
	},
	from : function (table) {
		this.string += " FROM " + table
		return this
	},
	deletes : function (table) {
		this.string += " DELETE " 
		return this
	},
	where : function (string) {
		this.string += " WHERE " + string
		return this
	},
	update : function (table) {
		this.string += " UPDATE " + table
		return this
	},
	set : function (string) {
		this.string += " SET " + string
		return	this
	},
	columns: function (columns) {
		this.string += " (" + columns +")"
		return this
	},
	values: function (values) {
		this.string += " VALUES (" + values +")"
		return this
	},

	insertInto : function (table){
		this.string += " INSERT into " + table
		return	this
	},
	next : function () {
		this.string += ";"
		return	this
	},
	query : function (query){
		this.string += query
		return	this
	},
	truncate: function (table){
		this.string += "TRUNCATE "+ table +" CASCADE";
		return this
	},
	end : function () {
		this.string += ";"
		return this.string
	}
}

module.exports = function () {
	commands.string = "";
	return commands
};