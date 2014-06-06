# Site Builder

First define your site content by adding musteache html templates to the templates/pages directory

setup your layout by defineing templates/layout.mustache
you will need a {{>page}} declaration in order to include the page contents

create any reuseable components in the templates/includes dir
These can be used in the layout, page content or other includes by the {{>FILENAME}} declaration.
note that you do not need to include the .mustach file extenstion

For details of creating mustache templates see the mustache website
This uses bootstrap for predefined styles so look at the bootstrap website for details of the classes available

You will need to setup your site config.
To do this edit config.json
Look at config.json.example for more details of what each variable means.
To access the variable from the templates use {{config.VAR_NAME}}

Once these have been setup run node index.js to build the site
The compiled site will be saved in the build/ dir

# TODO

For my site
Fill in personal bio data
Set up links to external sites
	github, linkedin, blog, etc

Fill in current and past jobs
	loveholidays, Grapple, Photobox, council
	start & end dates, position, brief description of the roll

Setup a sitemap file & add it to robots.txt
Setup a way of moving 'other' assets into various directories like robots.txt, fav.ico etc
