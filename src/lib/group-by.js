
/* groupBy takes an array and a property and returns an array within
 which elements are grouped together by the given property */
(function () {
	"use strict";
	function groupBy (arr, property) {

	    var newArr = [];
	    var count = [];
	    arr.map(function (elem) {
	        if (count.indexOf(elem[property]) === -1){
	            newArr.push([elem]);
	            count.push(elem[property]);
	            return;
	        } else {
	            newArr[count.indexOf(elem[property])].push(elem);
	            return;
	        }
	        
	    })
	    return newArr;
	}

	module.exports = groupBy;

})();
