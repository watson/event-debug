# event-debug

Log all events emitted by a Node.js EventEmitter object.

[![npm](https://img.shields.io/npm/v/event-debug.svg)](https://www.npmjs.com/package/event-debug)
[![Build status](https://travis-ci.org/watson/event-debug.svg?branch=master)](https://travis-ci.org/watson/event-debug)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install event-debug
```

## Usage

Example HTTP server where we log all event emitted by the server:

```js
var http = require('http')
var eventDebug = require('event-debug')

var server = http.createServer(function (req, res) {
  console.log('-- Received request')

  eventDebug(req) // 1st argument should behave like an EventEmitter
  eventDebug(res)

  res.end('Hello World')
})

eventDebug(server, 'MyServer') // use custom logging prefix 'MyServer'

server.listen(3000, function () {
  console.log('-- Server is running on port 3000')
})
```

When running this server and sending an HTTP request to it, the
following output will be produced (the lines written by event-debug are
all written to STDERR):

<img width="455" alt="screen shot 2017-03-27 at 23 36 03" src="https://cloud.githubusercontent.com/assets/10602/24379216/586a4b8c-1346-11e7-831e-bf3d79639e58.png">

## License

[MIT](LICENSE)
