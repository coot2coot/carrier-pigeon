(function (){
	Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
	}

	String.prototype.toDate = function (){
		Date.parse(this.replace(/-/g,"/"))
		return this;
	}

	var inRange = function (array){
		var today = new Date();
		array.map(function (reminder) {
			if (reminder.date){
				var date = new Date(reminder.date)
				date.getWeek() === today.getWeek()

					? reminder.week = 1
					: date.getWeek() < today.getWeek()
					? reminder.week = 2
					: reminder.week = 0
			} else {
				reminder.week =""
			}
		})
		return array
	};
	module.exports = inRange
})();

