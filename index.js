'use strict'

var chalk = require('chalk')

module.exports = function (emitter, type) {
  var emit = emitter && emitter.emit
  if (typeof emit !== 'function') return

  var start = Date.now()

  emitter.emit = function (event) {
    var end = Date.now()
    var diff = end - start
    start = end

    console.log(
      chalk.yellow((type || emitter.constructor.name) + ':'),
      chalk.white(event),
      chalk.red('+' + diff + 'ms')
    )

    return emit.apply(this, arguments)
  }
}
