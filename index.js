'use strict'

var chalk = require('chalk')
var start = null

module.exports = function (emitter, type) {
  var emit = emitter && emitter.emit
  if (typeof emit !== 'function') return

  emitter.emit = function (event, ...args) {
    var end = Date.now()
    var diff = start === null ? 0 : end - start
    start = end

    if (args.length > 0) {
      console.error(
        chalk.yellow((type || emitter.constructor.name) + ':'),
        chalk.white(event),
        chalk.gray('(' + args.join(', ') + ')'),
        chalk.red('+' + diff + 'ms')
      )
    } else {
      console.error(
        chalk.yellow((type || emitter.constructor.name) + ':'),
        chalk.white(event),
        chalk.red('+' + diff + 'ms')
      )
    }

    return emit.apply(this, arguments)
  }
}
