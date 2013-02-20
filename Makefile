BOOTSTRAP = ./subModules/bootstrap/
BOOSTWATCH_DIR = ./subModules/bootswatch/
BOOSTWATCH_THEME = superhero
BW_DIR = ${BOOSTWATCH_DIR}/${BOOSTWATCH_THEME}/

BUILD_DIR = ./build

build: clean bootstrap

bootstrap:
	@echo "\nBuilding website..."
	@mkdir ./tmp
	@cp -r ${BOOTSTRAP} ./tmp/
	@cp ${BW_DIR}variables.less ./tmp/less/variables.less
	@cp ${BW_DIR}bootswatch.less ./tmp/less/bootswatch.less
	@echo "\n@import \"bootswatch.less\";" >> ./tmp/less/bootstrap.less 
	cd ./tmp; npm install
	cd ./tmp; make bootstrap
	mv ./tmp/bootstrap ./build/assets
	#rm -rf ./tmp

clean:
	rm -rf ./tmp/
	rm -rf ./build/assets



.PHONY: build


