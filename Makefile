all: lambda.zip
	aws lambda update-function-code --function-name battleship --zip-file fileb://lambda.zip
build: node_modules
	npm run build
	rm -rf node_modules
	npm install --production
lambda.zip: build
	zip -r lambda.zip node_modules components static Coordinate.js Game.js Match.js Player.js Ship.js lambda.js
node_modules: package.json
	npm install
clean:
	rm lambda.zip
