all: lambda.zip
	aws lambda update-function-code --function-name battleship --zip-file fileb://lambda.zip
build: node_modules
	npm run build
lambda.zip: build
	zip -r lambda.zip node_modules components Coordinate.js Game.js Match.js Player.js Ship.js lambda.js
node_modules: package.json
	npm install
clean:
	rm lambda.zip
