# event-debug

Log all events emitted by a Node.js EventEmitter object.

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
following output will be written to STDOUT:

```
MyServer: listening
-- Server is running on port 3000
MyServer: connection
MyServer: request
-- Received request
ServerResponse: prefinish
ServerResponse: finish
IncomingMessage: readable
IncomingMessage: resume
IncomingMessage: end
```

## License

MIT 
