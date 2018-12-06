'use strict'

var assert = require('assert')
var util = require('util')
var EventEmitter = require('events').EventEmitter
var strip = require('strip-color')
var eventDebug = require('./')

var stderrWrite = process.stderr.write
var emitter

// *****

process.stderr.write = function (chunk) {
  var line = strip(chunk.toString().trim())
  var r = /EventEmitter: foo \+\d+ms/
  assert.ok(r.test(line), line + ' !== ' + r.source)
  process.stderr.write = stderrWrite
  stderrWrite.apply(this, arguments)
}

emitter = new EventEmitter()
eventDebug(emitter)
emitter.emit('foo')

// *****

process.stderr.write = function (chunk) {
  var line = strip(chunk.toString().trim())
  var r = /EventEmitter: test \(hello, 42, \[object Object\], Error: test error\) \+\d+ms/
  assert.ok(r.test(line), line + ' !== ' + r.source)
  process.stderr.write = stderrWrite
  stderrWrite.apply(this, arguments)
}

emitter = new EventEmitter()
eventDebug(emitter)
emitter.emit('test', 'hello', 42, { object: true }, new Error('test error'))

// *****

process.stderr.write = function (chunk) {
  var line = strip(chunk.toString().trim())
  var r = /MyEmitter: bar \+\d+ms/
  assert.ok(r.test(line), line + ' !== ' + r.source)
  process.stderr.write = stderrWrite
  stderrWrite.apply(this, arguments)
}

function MyEmitter () { EventEmitter.call(this) }
util.inherits(MyEmitter, EventEmitter)
emitter = new MyEmitter()
eventDebug(emitter)
emitter.emit('bar')

// *****

process.stderr.write = function (chunk) {
  var line = strip(chunk.toString().trim())
  var r = /Object: baz \+\d+ms/
  assert.ok(r.test(line), line + ' !== ' + r.source)
  process.stderr.write = stderrWrite
  stderrWrite.apply(this, arguments)
}

emitter = { emit: function () { } }
eventDebug(emitter)
emitter.emit('baz')

// *****

process.stderr.write = function () {
  assert(false)
  process.stderr.write = stderrWrite
  stderrWrite.apply(this, arguments)
}

eventDebug({})
eventDebug({ emit: 'foo' })
eventDebug(null)
eventDebug(undefined)
eventDebug(1)
eventDebug(NaN)
eventDebug(true)
eventDebug('foo')
eventDebug()
