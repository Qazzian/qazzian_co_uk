
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
	/* Arbertery number assigned by the constructor */
	id: null,
	/* Public facing name of the page */
	title: '',
	/* The base name of the file 
		e.g. for index.html this would jsut be index 
	*/
	filename: '',
	/* The fully qualified path of the json file on the local filesystem */
	path: '',
	/* The fully qualified path of the mustache file on the local filesystem */
	templatePath: '',
	/* the local url of the page starting at root ('/') 
		e.g. "example.com/children/child.html" would be "/children/child.html" */ 
	url: '',
	/* Array of child pages.
		if there is a directory with the same name as the page then it will be parsed and the pages added to this array */
	children: [],
	/* Array of specific css files to add to this page. These should be added to the assets folder */
	css: [],
	/* Array of specific javascript files to add to this page. These should be added to the assets folder */
	js: [],
	/*  */
	_pageConfig: {}
};

module.exports = Page;