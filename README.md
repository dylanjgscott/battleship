# Battleship

[https://battleship.core-web.presentation-layer.abc-dev.net.au](https://battleship.core-web.presentation-layer.abc-dev.net.au)

It's a [Battleship](<https://en.wikipedia.org/wiki/Battleship_(game)>) game
where the players are written in Javascript.

Yeah, it's ugly. Can you please help me make it look nice?

## Write Your Own Player

See [players/example.js](players/example.js) for an example player you can get
started with.

## Running your own server

You can run the server locally like so.

```
npm install
npm start
```

It should then listen on [http://localhost:8000](http://localhost:8000).

## Tests

There are some tests for the game logic.

```
npm install
npm test
```

## Cheating

Cheating is somewhat encouraged.

The players are sandboxed from each other and from the server.

If you're clever you might figure out how to escape the sandbox though. ;)

Then I'll have to fix it...
