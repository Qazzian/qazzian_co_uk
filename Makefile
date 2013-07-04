BOOTSTRAP = ./subModules/bootstrap/
BOOSTWATCH_DIR = ./subModules/bootswatch/
BOOSTWATCH_THEME = superhero
BW_DIR = ${BOOSTWATCH_DIR}/${BOOSTWATCH_THEME}/

BUILD_DIR = ./build

build: clean bootstrap html siteAssets

bootstrap: node_modules
	@echo "\nBuilding Assets..."
	@mkdir -p ./tmp/less
	@cp -r ${BOOTSTRAP} ./tmp/
	@cp ${BW_DIR}variables.less ./tmp/less/variables.less
	@cp ${BW_DIR}bootswatch.less ./tmp/less/bootswatch.less
	@echo "\n@import \"bootswatch.less\";" >> ./tmp/less/bootstrap.less 
	@cd ./tmp; ln -s ../node_modules; make bootstrap
	@mkdir -p ./build/assets
	@cp -R ./tmp/bootstrap/ ./build/assets

# TODO change so we're not running the tests anymore. But don't want to run index.js either as that will re-run make
html: node_modules
	@echo "\nBuild HTML..."
	@node ./lib/run.js

siteAssets: 
	@echo "\nCopy site specific assets..."
	@rsync -a templates/assets/ build/assets/

clean:
	@echo "\nDelete previous build"
	@rm -rf ./tmp/
	@rm -rf ./build/

node_modules:
	npm install


.PHONY: build


