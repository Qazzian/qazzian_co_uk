var assert = require('assert'),
	CHECK="\x1b[32m✔\x1b[39m",
	CROSS="\x1b[31m✗\x1b[39m";






function runTests(){
	var passed = true,
		testCount = 0,
		passedCount = 0,
		failedCount = 0;

	for (var t in tests) {
		if (tests.hasOwnProperty(t) && typeof tests[t] === 'function') {
			try {
				testCount++;
				tests[t]();
				passedCount++
			}
			catch (error){
				passed = false;
				console.log('\n Test '+testCount+' failed: \n', error.stack);
				failedCount++
			}
		}
	}


	if (passed) {
	console.log(CHECK + " All tests passed");
	}
	else {
		console.log(CROSS + " Some tests failed");	
	}
}

var tests = {
	testConfig: function (){
		var siteConfig = require('./siteConfig.js');

		assert.ok(siteConfig, 'siteConfig Object available');
		assert.ok(siteConfig.get, 'check the getter method is there');
		assert.equal(siteConfig.get('siteName'), 'Qazzian.co.uk', 'Test the getter method works');

	},

	testPageParser: function (){
		var PageParser = require('./PageParser.js'),
			parser = new PageParser(),
			pageData = parser.parsePages(),
			includeData;


		assert(PageParser, "Have PageParser Object");
		assert(pageData, "Have page data");

		includeData = parser.getIncludes();
		assert(includeData, "Have includes.");
		assert.ok(includeData.MainMenu, "We have the main menu at least.");
	},

	testMenuBuilder: function(){
		var MenuBuilder = require('./MenuBuilder.js'),
			pageData = getPageData(),
			menuBuilder = new MenuBuilder(pageData);
			
		assert(menuBuilder, "Have got the Menu builder instance");
		// console.log(menuBuilder);


	},

	testSiteBuilder: function(){
		var SiteBuilder = require('./sitebuilder.js'),
			builder = new SiteBuilder();

		assert(SiteBuilder, "SiteBuilder object");
		assert(builder.getConfig(), "Get site config from the siteBuilder");
		assert(builder.getPageData(), "Get all the page data");
		assert(builder.build(), "Build the site");
	}
}

function getPageData(){
	var PageParser = require('./PageParser.js'),
		parser = new PageParser(),
		pageData = parser.parsePages();
		return pageData;
}




runTests();

