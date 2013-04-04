
/**
 * Definition for the page data
 */
var Page = function(data){
	for (var k in data) {
		if (data.hasOwnProperty(k)) {	
			this[k] = data[k];
		}
	}
	this.id = nextPageId;
	nextPageId++;
};

var nextPageId = 0;

Page.prototype = {
	id: null,
	title: '',
	path: '',
	filename: '',
	children: [],
	css: [],
	js: [],
};

module.exports = Page;