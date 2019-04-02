# Battleship

[https://battleship.dylanscott.com.au/](https://battleship.dylanscott.com.au/)

It's a [Battleship](<https://en.wikipedia.org/wiki/Battleship_(game)>) game
where the players are written in Javascript.

Thanks to Tim H who made it beautiful.

## Write Your Own Player

See [players/Example.js](players/Example.js) for an example player you can get
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
